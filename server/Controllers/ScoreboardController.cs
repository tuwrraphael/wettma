﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Wettma.Services;

namespace Wettma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScoreboardController : ControllerBase
    {
        private readonly IScoreboardService _scoreboardService;

        public ScoreboardController(IScoreboardService scoreboardService)
        {
            _scoreboardService = scoreboardService;
        }



        [HttpGet]
        [AllowAnonymous]
        public async Task Get(int contestId = 1)
        {
            Response.ContentType = "application/json; charset=utf-8";
            Response.StatusCode = 200;
            Utf8JsonWriter writer;
            StreamWriter streamWriter;
            await using ((writer = new Utf8JsonWriter(Response.Body)).ConfigureAwait(false))
            await using ((streamWriter = new StreamWriter(Response.Body)).ConfigureAwait(false))
            {
                await this.StreamArray(writer, streamWriter, _scoreboardService.GetEntries(contestId));
                await writer.FlushAsync();
            }
        }
    }

}
