using System.Collections.Generic;
using Wettma.Models;

namespace Wettma.Services
{
    public interface ISyncService
    {
        IAsyncEnumerable<Bet> GetBets(int? after, string userId = null);
        IAsyncEnumerable<Game> GetGames(int? after);
        IAsyncEnumerable<GameResult> GetResults(int? after);
    }
}