using System.Collections.Generic;
using Wettma.Models;

namespace Wettma.Services
{
    public interface IGamesService
    {
        IAsyncEnumerable<Game> GetGames(UserId userId = null);
    }
}