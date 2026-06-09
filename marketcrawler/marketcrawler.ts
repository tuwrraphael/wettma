import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const CountryToPolymarketCode = {
    "Mexiko": "mex",
    "Südkorea": "kr",              // note: KR, not KOR
    "Tschechien": "cze",
    "Kanada": "can",
    "Bosnien und Herzegowina": "bih",
    "USA": "usa",
    "Paraguay": "par",
    "Katar": "qat",
    "Schweiz": "che",             // FIFA uses CHE
    "Brasilien": "bra",
    "Marokko": "mar",
    "Haiti": "hai",
    "Schottland": "sco",
    "Australien": "aus",
    "Türkei": "tur",
    "Deutschland": "ger",
    "Niederlande": "nld",
    "Japan": "jpn",
    "Elfenbeinküste": "civ",
    "Ecuador": "ecu",
    "Schweden": "swe",
    "Tunesien": "tun",
    "Spanien": "esp",
    "Kap Verde": "cvi",
    "Belgien": "bel",
    "Ägypten": "egy",
    "Saudi Arabien": "ksa",
    "Uruguay": "ury",
    "Iran": "irn",
    "Neuseeland": "nzl",
    "Frankreich": "fra",
    "Senegal": "sen",
    "Irak": "irq",
    "Norwegen": "nor",
    "Argentinien": "arg",
    "Algerien": "alg",
    "Österreich": "aut",
    "Jordanien": "jor",
    "Portugal": "prt",
    "DR Kongo": "cdr",
    "England": "eng",
    "Kroatien": "hrv",
    "Ghana": "gha",
    "Panama": "pan",
    "Usbekistan": "uzb",
    "Kolumbien": "col",
    "Südafrika": "rsa",
    "Curacao": "kor"
};

// Wettma base URL — when running in Docker, set via env var `WETTMA_URL`,
// e.g. http://wettma:8080 when both containers share a Docker network.
const WETTMA_URL = typeof Deno !== "undefined" ? (Deno.env.get?.("WETTMA_URL") ?? "http://wettma:8080") : "http://wettma:8080";

async function predictionmarkets(request: Request) {
  let url = new URL(request.url);
  let inputSearch = new URLSearchParams(url.search);
  let requestedContest = inputSearch.get("contest") || "";
  let matchesDoc = await fetch(`${WETTMA_URL}/games?contestId=${encodeURIComponent(requestedContest)}`);
    
    
    // let oddsDoc = await fetchWithRetry(`https://stats.fn.sportradar.com/tipp3/de/Europe:Berlin/gismo/season_markets/${contestId}`);
    //let oddsDoc2 = await fetchWithRetry(`https://stats.fn.sportradar.com/tipp3/de/Europe:Berlin/gismo/match_markets/66456904`);
    
    let matches = await matchesDoc.json();

    // console.log(matches);

    let slugs = [];

    let output = [];

    // Lazy keyset pagination: fetch pages only when a match has no candidates
    async function fetchEventsPage(seriesId: string, tagId: string, afterCursor?: string) {
      const cursorPart = afterCursor ? `&after_cursor=${encodeURIComponent(afterCursor)}` : "";
      const keysetUrl = `https://gamma-api.polymarket.com/events/keyset?series_id=${encodeURIComponent(seriesId)}&limit=100&tag_id=${encodeURIComponent(tagId)}${cursorPart}`;
      const res = await fetch(keysetUrl);
      if (!res.ok) {
        throw new Error(`keyset fetch failed ${res.status}: ${await res.text()}`);
      }
      const js = await res.json();
      let items = js.events;
      if (!Array.isArray(items)) items = Object.values(js).find(v => Array.isArray(v)) || [];
      const nextCursor = js.next_cursor || js.nextCursor || js.cursor || (js.meta && (js.meta.next_cursor || js.meta.nextCursor || js.meta.cursor)) || null;
      return { items, nextCursor };
    }

    // Use the series/tag from the keyset URL requested by the user
    const SERIES_ID = "11433";
    const TAG_ID = "100639";
    const allEvents: any[] = [];
    let cursor: string | null | undefined = undefined;

    for (let m of matches) {
      if (!CountryToPolymarketCode[m.team1] || !CountryToPolymarketCode[m.team2]) {
        console.log(`No polymarket code for ${m.team1} or ${m.team2}`);
        continue;
      }
      const code1 = CountryToPolymarketCode[m.team1];
      const code2 = CountryToPolymarketCode[m.team2];
      const slugPrefix = `fifwc-${code1}-${code2}-`;

      // compute match time once
      const matchTime = new Date(m.time).getTime();
      const MAX_DEVIATION_MS = 60 * 60 * 1000; // 1 hour

      // find candidates whose slug starts with the prefix (ignore date in slug)
      let candidates = allEvents.filter(e => typeof e.slug === 'string' && e.slug.startsWith(slugPrefix));

      // If no candidates yet, fetch pages (lazily) until we find matches or run out
      while (candidates.length === 0) {
        // if we've exhausted pages, break
        if (cursor === null) break;
        try {
          const page = await fetchEventsPage(SERIES_ID, TAG_ID, cursor);
          if (!page.items || page.items.length === 0) {
            cursor = null;
            break;
          }

          // check page items immediately for matching slug and usable startTime
          const pageCandidates = page.items.filter(e => typeof e.slug === 'string' && e.slug.startsWith(slugPrefix));
          // append page items to global store
          allEvents.push(...page.items);
          cursor = page.nextCursor;

          if (pageCandidates.length > 0) {
            // compute startTime diffs for page candidates and check if any within allowed deviation
            const withTimes = pageCandidates
              .map(c => ({ c, start: c.startTime || c.start_time || c.starts_at || c.start || null }))
              .filter(x => x.start)
              .map(x => ({ event: x.c, diff: Math.abs(new Date(x.start).getTime() - matchTime) }));

            const close = withTimes.filter(x => x.diff <= MAX_DEVIATION_MS);
            // append page items to global store regardless
            // if any candidates on this page are within the allowed deviation, stop fetching further
            candidates = allEvents.filter(e => typeof e.slug === 'string' && e.slug.startsWith(slugPrefix));
            if (close.length > 0) break;
          }

          // no useful candidates on this page, continue to next page
        } catch (e) {
          console.error('error fetching events page', e);
          cursor = null;
          break;
        }
      }

      if (candidates.length === 0) {
        console.log(`No candidates for ${slugPrefix}`);
        continue;
      }

      // choose the candidate by startTime, but require exact match within MAX_DEVIATION_MS
      const within = candidates
        .map(c => ({ c, start: c.startTime || c.start_time || c.starts_at || c.start || null }))
        .filter(x => x.start)
        .map(x => ({ event: x.c, diff: Math.abs(new Date(x.start).getTime() - matchTime) }))
        .filter(x => x.diff <= MAX_DEVIATION_MS);

      if (within.length === 0) {
        console.log(`No time-close candidate (within 1h) for ${slugPrefix}`);
        continue;
      }

      // pick the closest among the within-window candidates
      within.sort((a, b) => a.diff - b.diff);
      const chosen = within[0].event;
      const eventSlug = chosen.slug;
      if (!eventSlug) {
        console.log(`Chosen event has no slug for ${slugPrefix}`);
        continue;
      }

      // fetch full event details (markets) by slug
      let oddsDocRes = await fetch(`https://gamma-api.polymarket.com/events/slug/${eventSlug}`);
      if (!oddsDocRes.ok) {
        console.log(`Could not fetch event details for ${eventSlug}`);
        continue;
      }
      let json = await oddsDocRes.json();
      let team1Market = json.markets.find(market => market.slug == `${eventSlug}-${code1}`);
      let team2Market = json.markets.find(market => market.slug == `${eventSlug}-${code2}`);
      let drawMarket = json.markets.find(market => market.slug == `${eventSlug}-draw`);
      if (null == team1Market || null == team2Market || null == drawMarket) {
        console.log(`Could not find markets for ${eventSlug}`);
        continue;
      }
      try {
        const team1Odds = Number((1/parseFloat(JSON.parse(team1Market.outcomePrices)[JSON.parse(team1Market.outcomes).findIndex(o => o == "Yes")])).toFixed(2));
        const team2Odds = Number((1/parseFloat(JSON.parse(team2Market.outcomePrices)[JSON.parse(team2Market.outcomes).findIndex(o => o == "Yes")])).toFixed(2));
        const drawOdds = Number((1/parseFloat(JSON.parse(drawMarket.outcomePrices)[JSON.parse(drawMarket.outcomes).findIndex(o => o == "Yes")])).toFixed(2));

        output.push({
          result: null, time: new Date(m.time), team1: m.team1, team2: m.team2,
          odds: { team1: team1Odds, team2: team2Odds, draw: drawOdds }
        });
      } catch (e) {
        console.error("error parsing market odds", e);
        continue;
      }
    }

    return new Response(JSON.stringify(output), {
      headers: { "Content-Type": "application/json" },
    });
}

async function handler(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    if (url.pathname === "/predictionmarkets") return await predictionmarkets(request);
    return new Response("Not Found " + url.pathname, { status: 404 });
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}

const port = Number(8000);
console.log(`Listening on http://0.0.0.0:${port}`);
serve(handler, { hostname: "0.0.0.0", port });
