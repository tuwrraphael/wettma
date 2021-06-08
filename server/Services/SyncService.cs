using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Wettma.Services
{
    public class SyncService : ISyncService
    {
        private readonly WettmaContext _wettmaContext;
        private readonly IOddsRefreshService _oddsRefreshService;

        public SyncService(WettmaContext wettmaContext)
        {
            _wettmaContext = wettmaContext;
        }

        public IAsyncEnumerable<Models.Game> GetGames(int? after)
        {
            int afterId = after ?? 0;
            return _wettmaContext.Games.Where(g => g.Id > afterId)
                .Select(g => new Models.Game
                {
                    Id = g.Id,
                    Team1 = g.Team1,
                    Team2 = g.Team2,
                    Time = new DateTimeOffset(g.Time, TimeSpan.Zero)
                })
                .AsAsyncEnumerable();
        }

        public IAsyncEnumerable<Models.GameResult> GetResults(int? after)
        {
            int afterId = after ?? 0;
            return _wettmaContext.Results.Where(g => g.Id > afterId)
                .Select(g => new Models.GameResult
                {
                    Id = g.Id,
                    Team1Goals = g.Team1Goals,
                    Team2Goals = g.Team2Goals
                })
                .AsAsyncEnumerable();
        }

        public IAsyncEnumerable<Models.Bet> GetBets(int? after, string userId = null)
        {
            int afterId = after ?? 0;
            return _wettmaContext.Bets.Where(g => g.Id > afterId
            && (g.Odds.Game.Result != null || (null != userId && g.UserId == userId)))
                .Select(g => new Models.Bet
                {
                    Id = g.Id,
                    Choice = g.Choice,
                    Odds = g.Choice == Choice.Team1 ? g.Odds.Team1Odds : g.Choice == Choice.Team2 ? g.Odds.Team2Odds : g.Odds.DrawOdds.Value,
                    TimePlaced = g.TimePlaced,
                    UserDisplayName = g.User.DisplayName,
                    UserId = g.UserId,
                })
                .AsAsyncEnumerable();
        }
    }
}