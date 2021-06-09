using System;

namespace Wettma.Models
{
    public class Game
    {
        public int Id { get; set; }
        public string Team1 { get; set; }
        public string Team2 { get; set; }
        public DateTimeOffset Time { get; set; }
        public GameResult Result { get; set; }
        public MyBet MyBet { get; set; }
    }
}
