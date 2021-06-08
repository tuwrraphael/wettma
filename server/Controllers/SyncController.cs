using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wettma.RequestModels;
using Wettma.Services;

namespace Wettma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SyncController : ControllerBase
    {
        private readonly ISyncService _syncService;
        private readonly IOddsService _oddsService;

        public SyncController(ISyncService syncService, IOddsService oddsService)
        {
            _syncService = syncService;
            _oddsService = oddsService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task Get([FromQuery] SyncRequest request)
        {
            Response.ContentType = "application/json; charset=utf-8";
            Response.StatusCode = 200;
            Utf8JsonWriter writer;
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };
            await using ((writer = new Utf8JsonWriter(Response.Body)).ConfigureAwait(false))
            {
                writer.WriteStartObject();
                writer.WritePropertyName("games");
                writer.WriteStartArray();
                await writer.FlushAsync();
                await foreach (var game in _syncService.GetGames(request.GameId))
                {
                    await JsonSerializer.SerializeAsync(Response.Body, game, options);
                }
                writer.WriteEndArray();
                writer.WritePropertyName("results");
                writer.WriteStartArray();
                await writer.FlushAsync();
                await foreach (var result in _syncService.GetResults(request.ResultId))
                {
                    await JsonSerializer.SerializeAsync(Response.Body, result, options);
                }
                writer.WriteEndArray();
                writer.WritePropertyName("bets");
                writer.WriteStartArray();
                await writer.FlushAsync();
                await foreach (var bet in _syncService.GetBets(request.BetId, User?.Identity?.Name))
                {
                    await JsonSerializer.SerializeAsync(Response.Body, bet, options);
                }
                writer.WriteEndArray();
                writer.WritePropertyName("odds");
                writer.WriteStartArray();
                await writer.FlushAsync();
                await foreach (var result in _oddsService.GetOdds())
                {
                    await JsonSerializer.SerializeAsync(Response.Body, result, options);
                }
                writer.WriteEndArray();
                writer.WriteEndObject();
                await writer.FlushAsync();
            }
        }
    }
}
