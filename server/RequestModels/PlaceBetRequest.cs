using System.ComponentModel.DataAnnotations;

namespace Wettma.RequestModels
{
    public class PlaceBetRequest
    {
        [Required]
        public int OddsId { get; set; }
        [Required]
        public Choice Choice { get; set; }
    }
}
