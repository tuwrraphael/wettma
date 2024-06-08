using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
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
        private readonly WettmaContext wettmaContext;

        public GamesController(IGamesService gamesService, TelemetryClient telemetryClient, WettmaContext wettmaContext)
        {
            _gamesService = gamesService;
            _telemetryClient = telemetryClient;
            this.wettmaContext = wettmaContext;
        }

        [HttpGet]
        public async Task Get(int contestId = 1)
        {
            Response.ContentType = "application/json; charset=utf-8";
            Response.StatusCode = 200;
            Utf8JsonWriter writer;
            StreamWriter streamWriter;
            await using ((writer = new Utf8JsonWriter(Response.Body)).ConfigureAwait(false))
            await using ((streamWriter = new StreamWriter(Response.Body)).ConfigureAwait(false))
            {
                await this.StreamArray(writer, streamWriter, _gamesService.GetGames(contestId, this.GetUserId()));
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

        [HttpGet("berechnung")]
        public async Task<IActionResult> Berechnung()
        {
            var games = await wettmaContext.Games.Include(g => g.Result)
                .Where(g => g.ContestId == 1 && g.DoesNotSupportDraw == false)
                .Select(g => new { name = $"{g.Team1} - {g.Team2}", g.Id, g.Result, Time = new DateTimeOffset(g.Time, TimeSpan.Zero), g.Points }).ToArrayAsync();
            var results = new List<dynamic>();
            foreach (var game in games)
            {
                var correct = game.Result.Team1Goals == game.Result.Team2Goals ? Choice.Draw : game.Result.Team1Goals > game.Result.Team2Goals ? Choice.Team1 : Choice.Team2;

                var betsByUser = (await wettmaContext.Bets.Include(b => b.Odds).Where(b => b.Odds.GameId == game.Id).Include(b => b.User).ToArrayAsync()).GroupBy(b => b.UserId);
              

                var earlyBets = betsByUser.ToDictionary(b => b.Key, b => b.Where(b => new DateTimeOffset(b.TimePlaced, TimeSpan.Zero) <= game.Time.AddHours(-24)).OrderByDescending(d => d.TimePlaced).FirstOrDefault())
                    .Where(b => b.Value != null).Select(b => b.Value);

                var sum1 = earlyBets.Where(b => b.Choice == Choice.Team1).Count();
                var sum2 = earlyBets.Where(b => b.Choice == Choice.Team2).Count();
                var sumX = earlyBets.Where(b => b.Choice == Choice.Draw).Count();
                Choice majority;
                var lastOdds =  wettmaContext.Odds.Where(o => o.GameId == game.Id)
                    .ToArray()
                    .Select(o => new { o.Team1Odds, o.Team2Odds, o.DrawOdds, Time = new DateTimeOffset(o.ValidUntil, TimeSpan.Zero).AddMinutes(-15) })
                    .Where(o => o.Time <= game.Time.AddHours(-24))
                    .FirstOrDefault();
                if (lastOdds == null)
                {
                    continue;
                }

                if (sum1 > sum2 && sum1 > sumX)
                {
                    majority = Choice.Team1;
                }
                else if (sum2 > sum1 && sum2 > sumX)
                {
                    majority = Choice.Team2;
                }
                else
                {
                    majority = Choice.Draw;
                }
                
                var majorityOdds = majority switch
                {
                    Choice.Team1 => lastOdds.Team1Odds,
                    Choice.Team2 => lastOdds.Team2Odds,
                    Choice.Draw => lastOdds.DrawOdds,
                    _ => 0
                };
                var inFavorOdds = (new Dictionary<Choice, double>() { { Choice.Team1, lastOdds.Team1Odds }, { Choice.Team2, lastOdds.Team2Odds }, { Choice.Draw, lastOdds.DrawOdds.Value } })
                    .OrderBy(kv => kv.Value).First();
                results.Add(new
                {
                    game.Id,
                    game = game.name,
                    game.Time,
                    majority = majority,
                    correct = correct,
                    correctMajority = majority == correct,
                    correctInFavor = inFavorOdds.Key == correct,
                    majorityBetInFavor = inFavorOdds.Key == majority,
                    lastOdds,
                    money = (double)(majority == correct ? majorityOdds : 0),
                    moneyInFavor = (double)(inFavorOdds.Key == correct ? inFavorOdds.Value : 0),
                });
            }
            double totalMoney = 0;
            double totalMoneyInFavor = 0;
            foreach (var result in results)
            {
                totalMoney += result.money;
                totalMoneyInFavor += result.moneyInFavor;
            }
            double numGames = results.Count();

            var res = new
            {
               results,
               percentageCorrectMajority = 
               results.Where(r => r.correctMajority).Count() / (double)results.Count(),
               totalGames = results.Count(),
               finalMoney = totalMoney - numGames,
               finalMoneyInFavor = totalMoneyInFavor - numGames,
               percetageMajorityBetInFavor = results.Where(r => r.majorityBetInFavor).Count() / (double)results.Count(),
               percentageCorrectInFavor = results.Where(r => r.correctInFavor).Count() / (double)results.Count(),
            };
            return Ok(res);
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
