using System.ComponentModel.DataAnnotations;

namespace Wettma.RequestModels
{
    public class RegisterRequest
    {
        [Required]
        public string Token { get; set; }
        [Required]
        public string DisplayName { get; set; }
    }
}
