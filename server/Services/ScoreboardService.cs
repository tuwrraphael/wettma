using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Wettma.Models;

namespace Wettma.Services
{
    public class ScoreboardService : IScoreboardService
    {
        private readonly WettmaContext _wettmaContext;

        public ScoreboardService(WettmaContext wettmaContext)
        {
            _wettmaContext = wettmaContext;
        }
        public async IAsyncEnumerable<ScoreboardEntry> GetEntries()
        {
            await foreach (var user in _wettmaContext.Users.AsAsyncEnumerable())
            {
                var bets = _wettmaContext.Bets.Where(b => b.UserId == user.Id && null != b.Odds.Game.Result).Include(b => b.Odds).ThenInclude(b => b.Game).ToArray();
                var groupedBets = bets.GroupBy(b => b.Odds.GameId);
                var lastCalls = groupedBets.Select(grouping => grouping.Where(g => g.TimePlaced == grouping.Max(g => g.TimePlaced)).Single());
                double score = 0;
                foreach (var bet in lastCalls)
                {
                    if (bet.Choice == Choice.Team1 && bet.Odds.Game.Result.Team1Goals > bet.Odds.Game.Result.Team2Goals)
                    {
                        score += bet.Odds.Game.Points * bet.Odds.Team1Odds;
                    }
                    else if (bet.Choice == Choice.Team2 && bet.Odds.Game.Result.Team2Goals > bet.Odds.Game.Result.Team1Goals)
                    {
                        score += bet.Odds.Game.Points * bet.Odds.Team2Odds;
                    }
                    else if (bet.Odds.DrawOdds.HasValue && bet.Choice == Choice.Draw && bet.Odds.Game.Result.Team2Goals == bet.Odds.Game.Result.Team1Goals)
                    {
                        score += bet.Odds.Game.Points * bet.Odds.DrawOdds.Value;
                    }
                }
                yield return new ScoreboardEntry()
                {
                    DisplayName = user.DisplayName,
                    Points = score,
                    UserId = user.Id
                };
            }
        }
    }
}