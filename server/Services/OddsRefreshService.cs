using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Wettma.Services
{
    public class OddsRefreshService : IOddsRefreshService
    {
        private const int ValidMinutes = 15;
        private readonly WettmaContext _wettmaContext;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly CrawlingSettings _crawlingSettings;
        private static readonly SemaphoreSlim _semaphoreSlim = new(1);
        private static DateTimeOffset _lastCrawlTime = DateTimeOffset.MinValue;

        public OddsRefreshService(WettmaContext wettmaContext, IHttpClientFactory httpClientFactory,
            IOptions<CrawlingSettings> crawlingSettings)
        {
            _wettmaContext = wettmaContext;
            _httpClientFactory = httpClientFactory;
            _crawlingSettings = crawlingSettings.Value;
        }

        private async Task<MatchDescription[]> Crawl(int contestId)
        {
            var client = _httpClientFactory.CreateClient();
            var query = System.Web.HttpUtility.ParseQueryString("");
            query["contest"] = contestId.ToString();
            var res = await client.GetAsync($"{_crawlingSettings.CrawlUrl}?{query}");
            if (!res.IsSuccessStatusCode)
            {
                throw new Exception("Crawling failed");
            }
            return await JsonSerializer.DeserializeAsync<MatchDescription[]>(await res.Content.ReadAsStreamAsync(), new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
        }

        private bool OddsEqual(MatchOdds matchOdds, DbModels.Odds odds, bool switchTeams)
        {
            if (Math.Abs(matchOdds.Team1 - (switchTeams ? odds.Team2Odds : odds.Team1Odds)) > 0.1)
            {
                return false;
            }
            if (Math.Abs(matchOdds.Team2 - (switchTeams ? odds.Team1Odds : odds.Team2Odds)) > 0.1)
            {
                return false;
            }
            if (odds.DrawOdds.HasValue && Math.Abs(matchOdds.Draw - odds.DrawOdds.Value) > 0.1)
            {
                return false;
            }
            return true;
        }

        public async Task RefreshOdds(int contestId)
        {
            await _semaphoreSlim.WaitAsync();
            try
            {
                var now = DateTimeOffset.Now;
                if (now - _lastCrawlTime < TimeSpan.FromMinutes(ValidMinutes - 1))
                {
                    return;
                }
                _lastCrawlTime = now;
                var webodds = await Crawl(contestId);
                await foreach (var openGame in _wettmaContext.Games.Where(g => g.ContestId == contestId && null == g.Result).AsAsyncEnumerable())
                {
                    var matchDescription = webodds.Where(m => ((m.Team1 == openGame.Team1 && m.Team2 == openGame.Team2) ||
                        (m.Team2 == openGame.Team1 && m.Team1 == openGame.Team2)) && Math.Abs((m.Time.UtcDateTime - openGame.Time).TotalSeconds) < 1).SingleOrDefault();
                    if (null != matchDescription)
                    {
                        var switchTeams = matchDescription.Team2 == openGame.Team1;
                        var lastOdds = await _wettmaContext.Odds.Where(o => o.GameId == openGame.Id).OrderByDescending(o => o.ValidUntil).FirstOrDefaultAsync();
                        if (null != lastOdds)
                        {
                            if (OddsEqual(matchDescription.Odds, lastOdds, switchTeams))
                            {
                                lastOdds.ValidUntil = now.AddMinutes(ValidMinutes).UtcDateTime;
                                continue;
                            }
                        }

                        var dbOdds = new DbModels.Odds()
                        {
                            GameId = openGame.Id,
                            Team1Odds = switchTeams ? matchDescription.Odds.Team2 : matchDescription.Odds.Team1,
                            Team2Odds = switchTeams ? matchDescription.Odds.Team1 : matchDescription.Odds.Team2,
                            DrawOdds = openGame.DoesNotSupportDraw ? null : matchDescription.Odds.Draw,
                            ValidUntil = now.AddMinutes(ValidMinutes).UtcDateTime,
                        };
                        await _wettmaContext.Odds.AddAsync(dbOdds);
                    }
                }
                await _wettmaContext.SaveChangesAsync();
            }
            finally
            {
                _semaphoreSlim.Release();
            }
        }
    }
}