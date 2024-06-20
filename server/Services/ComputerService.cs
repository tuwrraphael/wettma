using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wettma.Models;

namespace Wettma.Services
{
    public class ComputerService : IComputerService
    {
        private readonly WettmaContext _wettmaContext;
        private readonly IOddsRefreshService _oddsRefreshService;
        private readonly IOddsService _oddsService;

        public ComputerService(WettmaContext wettmaContext,
            IOddsRefreshService oddsRefreshService,
            IOddsService oddsService)
        {
            _wettmaContext = wettmaContext;
            _oddsRefreshService = oddsRefreshService;
            _oddsService = oddsService;
        }

        public async Task<bool> PlaceBet(int computerId, int gameId, Choice choice, string reason)
        {
            var now = DateTimeOffset.Now;
            var game = await _wettmaContext.Games.Where(o => o.Id == gameId).SingleOrDefaultAsync();
            if (null == game)
            {
                throw new ArgumentException(nameof(gameId));
            }
            if (now > new DateTimeOffset(game.Time, TimeSpan.Zero).Add(TimeSpan.FromMinutes(-5)))
            {
                throw new GameStartedException();
            }
            await _oddsRefreshService.RefreshOdds(game.ContestId);
            var gameOdds = _wettmaContext.Games.Where(d => d.Id == game.Id).SelectMany(g => g.Odds);
            var newestOdds = await gameOdds.Where(g => g.ValidUntil == gameOdds.Max(s => s.ValidUntil)).SingleOrDefaultAsync();
            var currentBet = await _wettmaContext.ComputerBets
                .Include(b => b.Odds)
                .Where(b => b.ComputerPlayerId == computerId && b.Odds.GameId == gameId)
                .OrderByDescending(b => b.TimePlaced).FirstOrDefaultAsync();
            if (currentBet != null)
            {
                if (currentBet.Choice == choice)
                {
                    var currentBetOdds = currentBet.Choice == Choice.Draw ? currentBet.Odds.DrawOdds : currentBet.Choice == Choice.Team1 ? currentBet.Odds.Team1Odds : currentBet.Odds.Team2Odds;
                    var newOdds = choice == Choice.Draw ? newestOdds.DrawOdds : choice == Choice.Team1 ? newestOdds.Team1Odds : newestOdds.Team2Odds;
                    if (currentBetOdds >= newOdds)
                    {
                        currentBet.Reason = reason;
                        await _wettmaContext.SaveChangesAsync();
                        return false;
                    }
                }
            }
            if (new DateTimeOffset(newestOdds.ValidUntil, TimeSpan.Zero) < now)
            {
                throw new OddsExpiredException();
            }
            if (!newestOdds.DrawOdds.HasValue && choice == Choice.Draw)
            {
                throw new InvalidChoiceException();
            }
            await _wettmaContext.ComputerBets.AddAsync(new DbModels.ComputerBet()
            {
                Choice = choice,
                OddsId = newestOdds.Id,
                TimePlaced = now.UtcDateTime,
                ComputerPlayerId = computerId,
                Reason = reason
            });
            await _wettmaContext.SaveChangesAsync();
            return true;
        }

        public async Task<ComputerGameInfo> GetGameInfo(int gameId)
        {
            var game = await _wettmaContext.Games.Where(g => g.Id == gameId).SingleOrDefaultAsync();
            await _oddsRefreshService.RefreshOdds(game.ContestId);
            HashSet<string> teams = new()
            {
                game.Team1,
                game.Team2
            };
            bool newTeams = false;
            do
            {
                newTeams = false;
                foreach (var team in teams.ToArray())
                {
                    var games = await _wettmaContext.Games.Where(g => (g.Team1 == team || g.Team2 == team) && g.ContestId == game.ContestId && g.Result != null && game.Time > g.Time).ToArrayAsync();
                    foreach (var g in games)
                    {
                        if (!teams.Contains(g.Team1))
                        {
                            teams.Add(g.Team1);
                            newTeams = true;
                        }
                        if (!teams.Contains(g.Team2))
                        {
                            teams.Add(g.Team2);
                            newTeams = true;
                        }
                    }
                }
            } while (newTeams);
            var gamesOfInterest = (await _wettmaContext.Games.Where(g => g.ContestId == game.ContestId && game.Time > g.Time)
                .Include(g => g.Result)
                .ToArrayAsync())
                .Where(g => teams.Contains(g.Team1) && teams.Contains(g.Team2))
                .OrderBy(g => g.Time)
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
                }).ToArray();

            var odds = await _oddsService.GetOddsForGame(game.Id);
            return new ComputerGameInfo()
            {
                ConnectedGames = gamesOfInterest,
                Odds = odds,
                Game = new Models.Game()
                {
                    Id = game.Id,
                    Team1 = game.Team1,
                    Team2 = game.Team2,
                    Time = new DateTimeOffset(game.Time, TimeSpan.Zero),
                    Result = null == game.Result ? null : new Models.GameResult()
                    {
                        Team1Goals = game.Result.Team1Goals,
                        Team2Goals = game.Result.Team2Goals
                    },
                    Points = game.Points
                }
            };
        }

        public async Task<Models.ComputerBet[]> GetComputerBets(int gameId)
        {
            var bettingEndTime = DateTimeOffset.Now.AddMinutes(5).UtcDateTime;
            if (!await _wettmaContext.Games.Where(g => g.Id == gameId && g.Time <= bettingEndTime).AnyAsync())
            {
                return null;
            }
            var betsByComputer = (await _wettmaContext.ComputerBets.Where(b => b.Odds.GameId == gameId && !b.ComputerPlayer.DisplayAsUser).Include(b => b.ComputerPlayer).ToArrayAsync()).GroupBy(b => b.ComputerPlayerId);
            return betsByComputer.Select(b => { return new { Computer = b.First().ComputerPlayer, Bet = b.Where(g => g.TimePlaced == b.Max(d => d.TimePlaced)).Single() }; })
                .Select(b => new Models.ComputerBet()
                {
                    Choice = b.Bet.Choice,
                    DisplayName = b.Computer.Name,
                    ComputerPlayerId = b.Computer.Id,
                    Reason = b.Bet.Reason
                }).ToArray();
        }
    }
}