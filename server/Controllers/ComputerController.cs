using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wettma.Models;
using Wettma.RequestModels;
using Wettma.Services;

namespace Wettma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ComputerController : ControllerBase
    {
        private readonly IComputerService _computerService;

        public ComputerController(IComputerService computerService)
        {
            _computerService = computerService;
        }

        [HttpGet("gameinfo")]
        public async Task<IActionResult> GetGameInfo(int id)
        {
            var res = await _computerService.GetGameInfo(id);
            return Ok(res);
        }

        [HttpGet("games/{id}/bets")]
        public async Task<IActionResult> GetComputerBets(int id)
        {
            var res = await _computerService.GetComputerBets(id);
            return Ok(res);
        }


        [Authorize("GameAdmin")]
        [HttpPost("bets")]
        public async Task<IActionResult> PlaceBets([FromBody]PlaceComputerBetsRequest request)
        {
            var result = new List<ComputerBetPlaceResult>();
            foreach (var bet in request.ComputerBets)
            {
                var res = await _computerService.PlaceBet(request.ComputerId, bet.GameId, bet.Choice, bet.Reason);
                result.Add(new ComputerBetPlaceResult
                {
                    GameId = bet.GameId,
                    Placed = res
                });
            }
            return Ok(result);
        }
    }
}
