using System;
using System.Collections.Generic;
using Wettma.Models;

namespace Wettma.Services.DbModels
{
    public class Game
    {
        public int Id { get; set; }
        public string Team1 { get; set; }
        public string Team2 { get; set; }
        public DateTime Time { get; set; }
        public List<Odds> Odds { get; set; }
        public GameResult Result { get; set; }
        public double Points { get; set; }
    }

    public class GameResult
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public int Team1Goals { get; set; }
        public int Team2Goals { get; set; }
        public Game Game { get; set; }
    }

    public class Odds
    {
        public int Id { get; set; }
        public Game Game { get; set; }
        public int GameId { get; set; }
        public double Team1Odds { get; set; }
        public double Team2Odds { get; set; }
        public double? DrawOdds { get; set; }
        public DateTime ValidUntil { get; set; }
        public List<Bet> Bets { get; set; }
    }

    public class User
    {
        public string GoogleId { get; set; }
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public List<Bet> Bets { get; set; }
    }

    public class Bet
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public int OddsId { get; set; }
        public DateTime TimePlaced { get; set; }
        public Choice Choice { get; set; }
        public Odds Odds { get; set; }
    }
}
