using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wettma.Services
{
    public class GamesService : IGamesService
    {
        private readonly WettmaContext _wettmaContext;

        public GamesService(WettmaContext wettmaContext)
        {
            _wettmaContext = wettmaContext;
        }

        public async Task SetGameResult(int gameId, int team1Goals, int team2Goals)
        {
            var result = _wettmaContext.Results.Where(r => r.GameId == gameId).SingleOrDefault();
            if (null == result)
            {
                result = new DbModels.GameResult()
                {
                    GameId = gameId,
                };
                await _wettmaContext.Results.AddAsync(result);
            }
            result.Team1Goals = team1Goals;
            result.Team2Goals = team2Goals;
            await _wettmaContext.SaveChangesAsync();

        }

        public async Task<Models.UserBet[]> GetUserBets(int gameId)
        {
            var bettingEndTime = DateTimeOffset.Now.AddMinutes(5).UtcDateTime;
            if (!await _wettmaContext.Games.Where(g => g.Id == gameId && g.Time <= bettingEndTime).AnyAsync())
            {
                return null;
            }
            var betsByUser = (await _wettmaContext.Bets.Where(b => b.Odds.GameId == gameId).Include(b => b.User).ToArrayAsync()).GroupBy(b => b.UserId);
            return betsByUser.Select(b => { return new { User = b.First().User, Bet = b.Where(g => g.TimePlaced == b.Max(d => d.TimePlaced)).Single() }; })
                .Select(b => new Models.UserBet()
                {
                    Choice = b.Bet.Choice,
                    DisplayName = b.User.DisplayName,
                    UserId = b.User.Id
                }).ToArray();
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
                    Points = g.Points
                })
                .AsAsyncEnumerable())
            {
                if (null != userId)
                {
                    var myGameBets = _wettmaContext.Bets.Where(b => b.UserId == userId.InternalId && b.Odds.GameId == game.Id);
                    game.MyBet = await myGameBets.Where(bets => bets.TimePlaced == myGameBets.Max(d => d.TimePlaced)).Select(b => new Models.MyBet()
                    {
                        Choice = b.Choice,
                        Odds = new Models.Odds()
                        {
                            DrawOdds = b.Odds.DrawOdds ?? 0,
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