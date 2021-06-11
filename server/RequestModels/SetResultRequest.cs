using System.ComponentModel.DataAnnotations;

namespace Wettma.RequestModels
{
    public class SetResultRequest
    {
        [Required]
        public int Team1Goals { get; set; }
        [Required]
        public int Team2Goals { get; set; }
    }
}
