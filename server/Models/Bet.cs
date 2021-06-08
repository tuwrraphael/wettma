using System;

namespace Wettma.Models
{
    public class Bet
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserDisplayName { get; set; }
        public DateTimeOffset TimePlaced { get; set; }
        public Choice Choice { get; set; }
        public double Odds { get; set; }
    }
}
