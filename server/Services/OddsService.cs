using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Wettma.Services
{
    public class OddsService : IOddsService
    {
        private readonly WettmaContext _wettmaContext;
        private readonly IOddsRefreshService _oddsRefreshService;

        public OddsService(WettmaContext wettmaContext, IOddsRefreshService oddsRefreshService)
        {
            _wettmaContext = wettmaContext;
            _oddsRefreshService = oddsRefreshService;
        }

        public async IAsyncEnumerable<Models.Odds> GetOdds()
        {
            var now = DateTimeOffset.Now;
            var needRefresh = await _wettmaContext.Games.AnyAsync(g => null == g.Result && !g.Odds.Any(o => o.ValidUntil > DateTime.UtcNow));
            if (needRefresh)
            {
                await _oddsRefreshService.RefreshOdds();
            }
            await foreach (var odds in _wettmaContext.Games.Where(g => null == g.Result)
                .Select(g => g.Odds.Where(d => d.ValidUntil > now.UtcDateTime).FirstOrDefault())
                .Select(g => new Models.Odds
                {
                    Id = g.Id,
                    GameId = g.GameId,
                    Team1Odds = g.Team1Odds,
                    Team2Odds = g.Team2Odds,
                    DrawOdds = g.DrawOdds,
                    ValidUntil = new DateTimeOffset(g.ValidUntil, TimeSpan.Zero)
                }).AsAsyncEnumerable())
            {
                yield return odds;
            }
        }
    }
}