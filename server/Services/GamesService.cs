using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Wettma.Services
{
    public class GamesService : IGamesService
    {
        private readonly WettmaContext _wettmaContext;

        public GamesService(WettmaContext wettmaContext)
        {
            _wettmaContext = wettmaContext;
        }

        public async IAsyncEnumerable<Models.Game> GetGames(UserId userId = null)
        {
            await foreach (var game in _wettmaContext.Games
                .Select(g => new Models.Game
                {
                    Id = g.Id,
                    Team1 = g.Team1,
                    Team2 = g.Team2,
                    Time = new DateTimeOffset(g.Time, TimeSpan.Zero),
                    Result = null == g.Result ? null : new Models.GameResult()
                    {
                        Team1Goals = g.Result.Team1Goals,
                        Team2Goals = g.Result.Team2Goals
                    },
                })
                .AsAsyncEnumerable())
            {
                if (null != userId)
                {
                    game.MyBet = await _wettmaContext.Bets.Where(b => b.UserId == userId.InternalId).Select(b => new Models.MyBet()
                    {
                        Choice = b.Choice,
                        Odds = new Models.Odds()
                        {
                            DrawOdds = b.Odds.DrawOdds,
                            Id = b.Odds.Id,
                            GameId = b.Odds.GameId,
                            Team1Odds = b.Odds.Team1Odds,
                            Team2Odds = b.Odds.Team2Odds
                        }
                    }).SingleOrDefaultAsync();
                }
                yield return game;
            }
        }
    }
}