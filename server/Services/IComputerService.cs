using System.Threading.Tasks;
using Wettma.Models;

namespace Wettma.Services
{
    public interface IComputerService
    {
        Task<ComputerGameInfo> GetGameInfo(int gameId);
        Task<bool> PlaceBet(int computerId, int gameId, Choice choice, string reason);
        Task<ComputerBet[]> GetComputerBets(int gameId);
    }   
}