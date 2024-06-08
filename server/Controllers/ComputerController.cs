using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
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
    }
}
