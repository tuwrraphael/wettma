namespace Wettma.Models
{
    public class ComputerGameInfo
    {
        public Game Game { get; set; }
        public Game[] ConnectedGames { get; set; }
        public Odds Odds { get; set; }
    }
}
