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

        public async IAsyncEnumerable<Models.Odds> GetOdds(int contestId)
        {
            var now = DateTimeOffset.Now;
            await _oddsRefreshService.RefreshOdds(contestId);
            await foreach (var game in _wettmaContext.Games.Where(g => g.ContestId == contestId && null == g.Result)
                .Select(g => g.Odds.Where(d => d.ValidUntil == g.Odds.Max(g => g.ValidUntil)).SingleOrDefault())
                .Select(g => new Models.Odds
                {
                    Id = g.Id,
                    GameId = g.GameId,
                    Team1Odds = g.Team1Odds,
                    Team2Odds = g.Team2Odds,
                    DrawOdds = g.DrawOdds ?? 0,
                }).AsAsyncEnumerable())
            {
                yield return game;
            }
        }
    }
}