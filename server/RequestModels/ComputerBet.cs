using System.ComponentModel.DataAnnotations;

namespace Wettma.RequestModels
{
    public class ComputerBet
    {
        [Required]
        public int GameId { get; set; }
        [Required]
        public Choice Choice { get; set; }
        [Required]
        public string Reason { get; set; }
    }
}
