namespace Wettma.Models
{
    public class ComputerBet
    {
        public int ComputerPlayerId { get; set; }
        public string DisplayName { get; set; }
        public Choice Choice { get; set; }
        public string Reason { get; set; }
    }
}
