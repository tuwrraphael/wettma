using System.Collections.Generic;
using Wettma.Models;

namespace Wettma.Services
{
    public interface IScoreboardService
    {
        IAsyncEnumerable<ScoreboardEntry> GetEntries(int contestId);
    }
}