using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Wettma.Models;

namespace Wettma.Services
{
    public class UserService : IUserService
    {
        private readonly WettmaContext _wettmaContext;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly AuthSettings _authSettings;

        public UserService(WettmaContext wettmaContext, IHttpClientFactory httpClientFactory,
            IOptions<AuthSettings> authSettings)
        {
            _wettmaContext = wettmaContext;
            _httpClientFactory = httpClientFactory;
            _authSettings = authSettings.Value;
        }

        public async Task<DbModels.User> FindByGoogleSub(string sub)
        {
            return await _wettmaContext.Users.Where(u => u.GoogleId == sub).SingleOrDefaultAsync();
        }

        public async Task<Profile> GetProfile(UserId userId)
        {
            return await _wettmaContext.Users.Where(u => u.Id == userId.InternalId).Select(p => new Models.Profile()
            {
                DisplayName = p.DisplayName,
                UserId = p.Id
            }).SingleAsync();
        }

        public async Task Register(string googleToken, string displayName)
        {
            if (await _wettmaContext.Users.AnyAsync(d => d.DisplayName == displayName))
            {
                throw new InvalidDisplayNameException();
            }
            var googleClient = _httpClientFactory.CreateClient();
            var res = await googleClient.GetAsync($"https://oauth2.googleapis.com/tokeninfo?id_token={googleToken}");
            if (!res.IsSuccessStatusCode)
            {
                throw new InvalidTokenException();
            }
            var result = await JsonSerializer.DeserializeAsync<TokenValidationResult>(await res.Content.ReadAsStreamAsync(), new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            if (result.Aud != _authSettings.GoogleClientID)
            {
                throw new InvalidTokenException();
            }
            await _wettmaContext.Users.AddAsync(new DbModels.User()
            {
                DisplayName = displayName,
                GoogleId = result.Sub,
                Id = Guid.NewGuid().ToString()
            });
            await _wettmaContext.SaveChangesAsync();
        }
    }

    public class TokenValidationResult
    {
        public string Aud { get; set; }
        public string Sub { get; set; }
    }
}