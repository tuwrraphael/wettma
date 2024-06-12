using System.Threading.Tasks;
using Wettma.Models;
using Wettma.Services.DbModels;

namespace Wettma.Services
{
    public interface IUserService
    {
        Task<User> FindByGoogleSub(string sub);
        Task Register(string googleToken, string displayName);
        Task<Profile> GetProfile(UserId userId);
        Task<Profile[]> GetParticipants(int contestId);
    }
}