using System;
using Wettma.Services.DbModels;

namespace Wettma
{
    public static class EM2024
    {
        public static Game[] GetGames()
        {
            var mesz = TimeSpan.FromHours(2);
            var games = new[] {
                new Game() { Id = 116, Time = new DateTimeOffset(2024, 6, 14, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Deutschland", Team2 = "Schottland", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 117, Time = new DateTimeOffset(2024, 6, 15, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Ungarn", Team2 = "Schweiz", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 118, Time = new DateTimeOffset(2024, 6, 15, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Spanien", Team2 = "Kroatien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 119, Time = new DateTimeOffset(2024, 6, 15, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Italien", Team2 = "Albanien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 120, Time = new DateTimeOffset(2024, 6, 16, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Polen", Team2 = "Niederlande", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 121, Time = new DateTimeOffset(2024, 6, 16, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Slowenien", Team2 = "Dänemark", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 122, Time = new DateTimeOffset(2024, 6, 16, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Serbien", Team2 = "England", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 123, Time = new DateTimeOffset(2024, 6, 17, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Rumänien", Team2 = "Ukraine", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 124, Time = new DateTimeOffset(2024, 6, 17, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Belgien", Team2 = "Slowakei", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 125, Time = new DateTimeOffset(2024, 6, 17, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Österreich", Team2 = "Frankreich", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 126, Time = new DateTimeOffset(2024, 6, 18, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Türkei", Team2 = "Georgien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 127, Time = new DateTimeOffset(2024, 6, 18, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Portugal", Team2 = "Tschechien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 128, Time = new DateTimeOffset(2024, 6, 19, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Kroatien", Team2 = "Albanien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 129, Time = new DateTimeOffset(2024, 6, 19, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Deutschland", Team2 = "Ungarn", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 130, Time = new DateTimeOffset(2024, 6, 19, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Schottland", Team2 = "Schweiz", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 131, Time = new DateTimeOffset(2024, 6, 20, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Slowenien", Team2 = "Serbien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 132, Time = new DateTimeOffset(2024, 6, 20, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Dänemark", Team2 = "England", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 133, Time = new DateTimeOffset(2024, 6, 20, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Spanien", Team2 = "Italien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 134, Time = new DateTimeOffset(2024, 6, 21, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Slowakei", Team2 = "Ukraine", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 135, Time = new DateTimeOffset(2024, 6, 21, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Polen", Team2 = "Österreich", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 136, Time = new DateTimeOffset(2024, 6, 21, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Niederlande", Team2 = "Frankreich", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 137, Time = new DateTimeOffset(2024, 6, 22, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Georgien", Team2 = "Tschechien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 138, Time = new DateTimeOffset(2024, 6, 22, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Türkei", Team2 = "Portugal", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 139, Time = new DateTimeOffset(2024, 6, 22, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Belgien", Team2 = "Rumänien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 140, Time = new DateTimeOffset(2024, 6, 23, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Schweiz", Team2 = "Deutschland", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 141, Time = new DateTimeOffset(2024, 6, 23, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Schottland", Team2 = "Ungarn", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 142, Time = new DateTimeOffset(2024, 6, 24, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Albanien", Team2 = "Spanien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 143, Time = new DateTimeOffset(2024, 6, 24, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Kroatien", Team2 = "Italien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 144, Time = new DateTimeOffset(2024, 6, 25, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Niederlande", Team2 = "Österreich", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 145, Time = new DateTimeOffset(2024, 6, 25, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Frankreich", Team2 = "Polen", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 146, Time = new DateTimeOffset(2024, 6, 25, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "England", Team2 = "Slowenien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 147, Time = new DateTimeOffset(2024, 6, 25, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Dänemark", Team2 = "Serbien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 148, Time = new DateTimeOffset(2024, 6, 26, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Slowakei", Team2 = "Rumänien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 149, Time = new DateTimeOffset(2024, 6, 26, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Ukraine", Team2 = "Belgien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 150, Time = new DateTimeOffset(2024, 6, 26, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Georgien", Team2 = "Portugal", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3},
                new Game() { Id = 151, Time = new DateTimeOffset(2024, 6, 26, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Tschechien", Team2 = "Türkei", Points = 2.0, DoesNotSupportDraw = false, ContestId = 3}
            };
            return games;
        }
    }
}
