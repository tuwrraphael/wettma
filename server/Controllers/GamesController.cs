using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Wettma.RequestModels;
using Wettma.Services;

namespace Wettma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly IGamesService _gamesService;
        private readonly TelemetryClient _telemetryClient;

        public GamesController(IGamesService gamesService, TelemetryClient telemetryClient)
        {
            _gamesService = gamesService;
            _telemetryClient = telemetryClient;
        }

        [HttpGet]
        public async Task Get()
        {
            Response.ContentType = "application/json; charset=utf-8";
            Response.StatusCode = 200;
            Utf8JsonWriter writer;
            StreamWriter streamWriter;
            await using ((writer = new Utf8JsonWriter(Response.Body)).ConfigureAwait(false))
            await using ((streamWriter = new StreamWriter(Response.Body)).ConfigureAwait(false))
            {
                await this.StreamArray(writer, streamWriter, _gamesService.GetGames(this.GetUserId()));
                await writer.FlushAsync();
            }
            var telemetry = new PageViewTelemetry("games");
            if (Request.Headers.TryGetValue("X-Frontend-Version", out StringValues value))
            {
                telemetry.Properties.Add("frontendversion", value.FirstOrDefault());
            }
            if (Request.Headers.TryGetValue("X-Frontend-Standalone", out StringValues v2))
            {
                telemetry.Properties.Add("standalone", v2.FirstOrDefault());
            }
            _telemetryClient.TrackPageView(telemetry);
        }

        [HttpGet("{id}/bets")]
        public async Task<IActionResult> UserBets(int id)
        {
            var res = await _gamesService.GetUserBets(id);
            if (null != res)
            {
                return Ok(res);
            }
            return NotFound();
        }

        [Authorize("GameAdmin")]
        [HttpPut("{id}/result")]
        public async Task<IActionResult> Put(int id, [FromBody] SetResultRequest request)
        {
            await _gamesService.SetGameResult(id, request.Team1Goals, request.Team2Goals);
            return Ok();
        }
    }
}
