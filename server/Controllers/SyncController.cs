using System.Collections.Generic;
using System.IO;
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

        private async Task StreamArray<T>(Utf8JsonWriter jsonWriter, TextWriter textWriter, IAsyncEnumerable<T> objects)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };
            var first = true;
            jsonWriter.WriteStartArray();
            await jsonWriter.FlushAsync();
            await foreach (var game in objects)
            {
                if (!first)
                {
                    await textWriter.WriteAsync(",");
                    await textWriter.FlushAsync();
                }
                first = false;
                await JsonSerializer.SerializeAsync(Response.Body, game, options);
            }
            jsonWriter.WriteEndArray();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task Get([FromQuery] SyncRequest request)
        {
            Response.ContentType = "application/json; charset=utf-8";
            Response.StatusCode = 200;
            Utf8JsonWriter writer;
            StreamWriter streamWriter;
            await using ((writer = new Utf8JsonWriter(Response.Body)).ConfigureAwait(false))
            await using ((streamWriter = new StreamWriter(Response.Body)).ConfigureAwait(false))
            {
                writer.WriteStartObject();
                writer.WritePropertyName("games");
                await StreamArray(writer, streamWriter, _syncService.GetGames(request.GameId));
                writer.WritePropertyName("results");
                await StreamArray(writer, streamWriter, _syncService.GetResults(request.ResultId));
                writer.WritePropertyName("bets");
                await StreamArray(writer, streamWriter, _syncService.GetBets(request.BetId, User?.Identity?.Name));
                writer.WritePropertyName("odds");
                await StreamArray(writer, streamWriter, _oddsService.GetOdds());
                writer.WriteEndObject();
                await writer.FlushAsync();
            }
        }
    }
}
