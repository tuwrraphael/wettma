using System.ComponentModel.DataAnnotations;

namespace Wettma.RequestModels
{
    public class PlaceComputerBetsRequest
    {
        [Required]
        public int ComputerId { get; set; }
        [Required]
        public ComputerBet[] ComputerBets { get; set; }
    }
}
