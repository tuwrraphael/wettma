﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Wettma.Models;

namespace Wettma.Services
{
    public interface IGamesService
    {
        IAsyncEnumerable<Game> GetGames(int contetId, UserId userId = null);
        Task<UserBet[]> GetUserBets(int gameId);
        Task SetGameResult(int gameId, int team1Goals, int team2Goals);
    }
}