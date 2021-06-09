using System.Threading.Tasks;

namespace Wettma.Services
{
    public interface IBetsService
    {
        Task PlaceBet(int oddsId, Choice choice, UserId userId = null);
    }
}