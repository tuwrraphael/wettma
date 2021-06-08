using System.Threading.Tasks;

namespace Wettma.Services
{
    public interface IOddsRefreshService
    {
        Task RefreshOdds();
    }
}