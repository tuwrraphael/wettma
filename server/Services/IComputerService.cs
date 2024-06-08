using System.Threading.Tasks;
using Wettma.Models;

namespace Wettma.Services
{
    public interface IComputerService
    {
        Task<ComputerGameInfo> GetGameInfo(int gameId);
    }   
}