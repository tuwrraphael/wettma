using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wettma.RequestModels;
using Wettma.Services;

namespace Wettma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BetsController : ControllerBase
    {
        private readonly IBetsService _betsService;

        public BetsController(IBetsService betsService)
        {
            _betsService = betsService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PlaceBet(PlaceBetRequest placeBetRequest)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }
            try
            {
                await _betsService.PlaceBet(placeBetRequest.OddsId, placeBetRequest.Choice, this.GetUserId());
                return Ok();
            }
            catch (OddsNotFoundException)
            {
                return NotFound();
            }
            catch (GameStartedException)
            {
                return ValidationProblem("The game has already started", type: "gamestarted");
            }
            catch (OddsChangedException)
            {
                return ValidationProblem("The odds has changed", type: "oddschanged");
            }
            catch (OddsExpiredException)
            {
                return ValidationProblem("The odds has expired", type: "oddsexpired");
            }
            catch (InvalidChoiceException)
            {
                return ValidationProblem("The choice is not valid for this bet", type: "invalidchoice");
            }
        }
    }
}
