namespace Wettma.Models
{
    public class Odds
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public double Team1Odds { get; set; }
        public double Team2Odds { get; set; }
        public double DrawOdds { get; set; }
    }
}
