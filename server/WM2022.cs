using System;
using Wettma.Services.DbModels;

namespace Wettma
{
    public static class WM2022
    {
        public static Game[] GetGames()
        {
            var mez = TimeSpan.FromHours(1);
            var games = new[] {
                new Game() { Id = 52, Time = new DateTimeOffset(2022, 11, 20, 17, 0, 0, 0, mez).UtcDateTime, Team1 = "Katar", Team2 = "Ecuador", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 53, Time = new DateTimeOffset(2022, 11, 21, 14, 0, 0, 0, mez).UtcDateTime, Team1 = "England", Team2 = "Iran", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 54, Time = new DateTimeOffset(2022, 11, 21, 17, 0, 0, 0, mez).UtcDateTime, Team1 = "Senegal", Team2 = "Niederlande", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 55, Time = new DateTimeOffset(2022, 11, 21, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "USA", Team2 = "Wales", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 56, Time = new DateTimeOffset(2022, 11, 22, 11, 0, 0, 0, mez).UtcDateTime, Team1 = "Argentinien", Team2 = "Saudi Arabien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 57, Time = new DateTimeOffset(2022, 11, 22, 14, 0, 0, 0, mez).UtcDateTime, Team1 = "Dänemark", Team2 = "Tunesien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 58, Time = new DateTimeOffset(2022, 11, 22, 17, 0, 0, 0, mez).UtcDateTime, Team1 = "Mexiko", Team2 = "Polen", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 59, Time = new DateTimeOffset(2022, 11, 22, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Frankreich", Team2 = "Australien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 60, Time = new DateTimeOffset(2022, 11, 23, 11, 0, 0, 0, mez).UtcDateTime, Team1 = "Marokko", Team2 = "Kroatien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 61, Time = new DateTimeOffset(2022, 11, 23, 14, 0, 0, 0, mez).UtcDateTime, Team1 = "Deutschland", Team2 = "Japan", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 62, Time = new DateTimeOffset(2022, 11, 23, 17, 0, 0, 0, mez).UtcDateTime, Team1 = "Spanien", Team2 = "Costa Rica", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 63, Time = new DateTimeOffset(2022, 11, 23, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Belgien", Team2 = "Kanada", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 64, Time = new DateTimeOffset(2022, 11, 24, 11, 0, 0, 0, mez).UtcDateTime, Team1 = "Schweiz", Team2 = "Kamerun", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 65, Time = new DateTimeOffset(2022, 11, 24, 14, 0, 0, 0, mez).UtcDateTime, Team1 = "Uruguay", Team2 = "Republik Korea", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 66, Time = new DateTimeOffset(2022, 11, 24, 17, 0, 0, 0, mez).UtcDateTime, Team1 = "Portugal", Team2 = "Ghana", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 67, Time = new DateTimeOffset(2022, 11, 24, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Brasilien", Team2 = "Serbien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 68, Time = new DateTimeOffset(2022, 11, 25, 11, 0, 0, 0, mez).UtcDateTime, Team1 = "Wales", Team2 = "Iran", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 69, Time = new DateTimeOffset(2022, 11, 25, 14, 0, 0, 0, mez).UtcDateTime, Team1 = "Katar", Team2 = "Senegal", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 70, Time = new DateTimeOffset(2022, 11, 25, 17, 0, 0, 0, mez).UtcDateTime, Team1 = "Niederlande", Team2 = "Ecuador", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 71, Time = new DateTimeOffset(2022, 11, 25, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "England", Team2 = "USA", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 72, Time = new DateTimeOffset(2022, 11, 26, 11, 0, 0, 0, mez).UtcDateTime, Team1 = "Tunesien", Team2 = "Australien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 73, Time = new DateTimeOffset(2022, 11, 26, 14, 0, 0, 0, mez).UtcDateTime, Team1 = "Polen", Team2 = "Saudi Arabien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 74, Time = new DateTimeOffset(2022, 11, 26, 17, 0, 0, 0, mez).UtcDateTime, Team1 = "Frankreich", Team2 = "Dänemark", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 75, Time = new DateTimeOffset(2022, 11, 26, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Argentinien", Team2 = "Mexiko", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 76, Time = new DateTimeOffset(2022, 11, 27, 11, 0, 0, 0, mez).UtcDateTime, Team1 = "Japan", Team2 = "Costa Rica", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 77, Time = new DateTimeOffset(2022, 11, 27, 14, 0, 0, 0, mez).UtcDateTime, Team1 = "Belgien", Team2 = "Marokko", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 78, Time = new DateTimeOffset(2022, 11, 27, 17, 0, 0, 0, mez).UtcDateTime, Team1 = "Kroatien", Team2 = "Kanada", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 79, Time = new DateTimeOffset(2022, 11, 27, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Spanien", Team2 = "Deutschland", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 80, Time = new DateTimeOffset(2022, 11, 28, 11, 0, 0, 0, mez).UtcDateTime, Team1 = "Kamerun", Team2 = "Serbien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 81, Time = new DateTimeOffset(2022, 11, 28, 14, 0, 0, 0, mez).UtcDateTime, Team1 = "Republik Korea", Team2 = "Ghana", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 82, Time = new DateTimeOffset(2022, 11, 28, 17, 0, 0, 0, mez).UtcDateTime, Team1 = "Brasilien", Team2 = "Schweiz", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 83, Time = new DateTimeOffset(2022, 11, 28, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Portugal", Team2 = "Uruguay", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 84, Time = new DateTimeOffset(2022, 11, 29, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Niederlande", Team2 = "Katar", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 85, Time = new DateTimeOffset(2022, 11, 29, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Ecuador", Team2 = "Senegal", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 86, Time = new DateTimeOffset(2022, 11, 29, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Wales", Team2 = "England", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 87, Time = new DateTimeOffset(2022, 11, 29, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Iran", Team2 = "USA", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 88, Time = new DateTimeOffset(2022, 11, 30, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Tunesien", Team2 = "Frankreich", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 89, Time = new DateTimeOffset(2022, 11, 30, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Australien", Team2 = "Dänemark", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 90, Time = new DateTimeOffset(2022, 11, 30, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Polen", Team2 = "Argentinien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 91, Time = new DateTimeOffset(2022, 11, 30, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Saudi Arabien", Team2 = "Mexiko", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 92, Time = new DateTimeOffset(2022, 12, 1, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Kroatien", Team2 = "Belgien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 93, Time = new DateTimeOffset(2022, 12, 1, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Kanada", Team2 = "Marokko", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 94, Time = new DateTimeOffset(2022, 12, 1, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Japan", Team2 = "Spanien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 95, Time = new DateTimeOffset(2022, 12, 1, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Costa Rica", Team2 = "Deutschland", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 96, Time = new DateTimeOffset(2022, 12, 2, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Republik Korea", Team2 = "Portugal", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 97, Time = new DateTimeOffset(2022, 12, 2, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Ghana", Team2 = "Uruguay", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 98, Time = new DateTimeOffset(2022, 12, 2, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Kamerun", Team2 = "Brasilien", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 99, Time = new DateTimeOffset(2022, 12, 2, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Serbien", Team2 = "Schweiz", Points = 2.0, DoesNotSupportDraw = false, ContestId = 2},
                new Game() { Id = 100, Time = new DateTimeOffset(2022, 12, 3, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Niederlande", Team2 = "USA", Points = 4.0, DoesNotSupportDraw = true, ContestId = 2},
                new Game() { Id = 101, Time = new DateTimeOffset(2022, 12, 3, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Argentinien", Team2 = "Australien", Points = 4.0, DoesNotSupportDraw = true, ContestId = 2},
                new Game() { Id = 102, Time = new DateTimeOffset(2022, 12, 4, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Frankreich", Team2 = "Polen", Points = 4.0, DoesNotSupportDraw = true, ContestId = 2},
                new Game() { Id = 103, Time = new DateTimeOffset(2022, 12, 4, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "England", Team2 = "Senegal", Points = 4.0, DoesNotSupportDraw = true, ContestId = 2},
                new Game() { Id = 104, Time = new DateTimeOffset(2022, 12, 5, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Japan", Team2 = "Kroatien", Points = 4.0, DoesNotSupportDraw = true, ContestId = 2},
                new Game() { Id = 105, Time = new DateTimeOffset(2022, 12, 5, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Brasilien", Team2 = "Südkorea", Points = 4.0, DoesNotSupportDraw = true, ContestId = 2},
                new Game() { Id = 106, Time = new DateTimeOffset(2022, 12, 6, 16, 0, 0, 0, mez).UtcDateTime, Team1 = "Marokko", Team2 = "Spanien", Points = 4.0, DoesNotSupportDraw = true, ContestId = 2},
                new Game() { Id = 107, Time = new DateTimeOffset(2022, 12, 6, 20, 0, 0, 0, mez).UtcDateTime, Team1 = "Portugal", Team2 = "Schweiz", Points = 4.0, DoesNotSupportDraw = true, ContestId = 2}
            };
            return games;
        }
    }
}
