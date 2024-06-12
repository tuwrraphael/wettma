using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wettma.Services;

namespace Wettma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ParticipantsController : ControllerBase
    {
        private readonly IUserService _userService;

        public ParticipantsController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize("GameAdmin")]
        public async Task<IActionResult> Get(int contestId)
        {
            return Ok(await _userService.GetParticipants(contestId));
        }
    }
}
