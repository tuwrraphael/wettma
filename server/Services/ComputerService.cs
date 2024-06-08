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
    }
}