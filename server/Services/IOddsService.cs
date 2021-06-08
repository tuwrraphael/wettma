using System.Collections.Generic;
using Wettma.Models;

namespace Wettma.Services
{
    public interface IOddsService
    {
        IAsyncEnumerable<Odds> GetOdds();
    }
}