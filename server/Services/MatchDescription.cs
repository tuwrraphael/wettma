using System;

namespace Wettma.Services
{
    public class MatchDescription
    {
        public string Team1 { get; set; }
        public string Team2 { get; set; }
        public MatchOdds Odds { get; set; }
        public DateTimeOffset Time { get; set; }
        public MatchResult Result { get; set; }
    }
}