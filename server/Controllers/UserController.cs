using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wettma.RequestModels;
using Wettma.Services;
using System.Linq;

namespace Wettma.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }
            try
            {
                await _userService.Register(request.Token, request.DisplayName);
            }
            catch (InvalidDisplayNameException)
            {
                return ValidationProblem("Username Invalid");
            }
            catch (InvalidTokenException)
            {
                return ValidationProblem("Token Invalid");
            }
            return CreatedAtAction("profile", null);
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> Profile()
        {
            return Ok(await _userService.GetProfile(this.GetUserId()));
        }
    }
}
