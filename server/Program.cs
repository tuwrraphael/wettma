using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Wettma.Services;
using Wettma.Services.DbModels;

namespace Wettma
{
    public class Program
    {

        private static async Task MigrateDatabase(IHost host)
        {
            using var serviceScope = host.Services.CreateScope();
            using var context = serviceScope.ServiceProvider.GetService<WettmaContext>();
            await context.Database.MigrateAsync();
            var mesz = TimeSpan.FromHours(2);
            var games = new[] {
                new Game() { Id = 1, Time = new DateTimeOffset(2021, 6, 11, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Türkei", Team2 = "Italien" },
                new Game() { Id = 2, Time = new DateTimeOffset(2021, 6, 12, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Wales", Team2 = "Schweiz" },
                new Game() { Id = 13, Time = new DateTimeOffset(2021, 6, 16, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Türkei", Team2 = "Wales" },
                new Game() { Id = 14, Time = new DateTimeOffset(2021, 6, 16, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Italien", Team2 = "Schweiz" },
                new Game() { Id = 25, Time = new DateTimeOffset(2021, 6, 20, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Schweiz", Team2 = "Türkei" },
                new Game() { Id = 26, Time = new DateTimeOffset(2021, 6, 20, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Italien", Team2 = "Wales" },
                new Game() { Id = 3, Time = new DateTimeOffset(2021, 6, 12, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Dänemark", Team2 = "Finnland" },
                new Game() { Id = 4, Time = new DateTimeOffset(2021, 6, 12, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Belgien", Team2 = "Russland" },
                new Game() { Id = 15, Time = new DateTimeOffset(2021, 6, 16, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Finnland", Team2 = "Russland" },
                new Game() { Id = 16, Time = new DateTimeOffset(2021, 6, 17, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Dänemark", Team2 = "Belgien" },
                new Game() { Id = 27, Time = new DateTimeOffset(2021, 6, 21, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Russland", Team2 = "Dänemark" },
                new Game() { Id = 28, Time = new DateTimeOffset(2021, 6, 21, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Finnland", Team2 = "Belgien" },
                new Game() { Id = 6, Time = new DateTimeOffset(2021, 6, 13, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Österreich", Team2 = "Nordmazedonien" },
                new Game() { Id = 5, Time = new DateTimeOffset(2021, 6, 13, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Niederlande", Team2 = "Ukraine" },
                new Game() { Id = 18, Time = new DateTimeOffset(2021, 6, 17, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Ukraine", Team2 = "Nordmazedonien" },
                new Game() { Id = 17, Time = new DateTimeOffset(2021, 6, 17, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Niederlande", Team2 = "Österreich" },
                new Game() { Id = 29, Time = new DateTimeOffset(2021, 6, 21, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Nordmazedonien", Team2 = "Niederlande" },
                new Game() { Id = 30, Time = new DateTimeOffset(2021, 6, 21, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Ukraine", Team2 = "Österreich" },
                new Game() { Id = 7, Time = new DateTimeOffset(2021, 6, 13, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "England", Team2 = "Kroatien" },
                new Game() { Id = 8, Time = new DateTimeOffset(2021, 6, 14, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Schottland", Team2 = "Tschechien" },
                new Game() { Id = 19, Time = new DateTimeOffset(2021, 6, 18, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Kroatien", Team2 = "Tschechien" },
                new Game() { Id = 20, Time = new DateTimeOffset(2021, 6, 18, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "England", Team2 = "Schottland" },
                new Game() { Id = 31, Time = new DateTimeOffset(2021, 6, 22, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Kroatien", Team2 = "Schottland" },
                new Game() { Id = 32, Time = new DateTimeOffset(2021, 6, 22, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Tschechien", Team2 = "England" },
                new Game() { Id = 10, Time = new DateTimeOffset(2021, 6, 14, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Polen", Team2 = "Slowakei" },
                new Game() { Id = 9, Time = new DateTimeOffset(2021, 6, 14, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Spanien", Team2 = "Schweden" },
                new Game() { Id = 21, Time = new DateTimeOffset(2021, 6, 18, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Schweden", Team2 = "Slowakei" },
                new Game() { Id = 22, Time = new DateTimeOffset(2021, 6, 19, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Spanien", Team2 = "Polen" },
                new Game() { Id = 33, Time = new DateTimeOffset(2021, 6, 23, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Slowakei", Team2 = "Spanien" },
                new Game() { Id = 34, Time = new DateTimeOffset(2021, 6, 23, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Schweden", Team2 = "Polen" },
                new Game() { Id = 11, Time = new DateTimeOffset(2021, 6, 15, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Ungarn", Team2 = "Portugal" },
                new Game() { Id = 12, Time = new DateTimeOffset(2021, 6, 15, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Frankreich", Team2 = "Deutschland" },
                new Game() { Id = 23, Time = new DateTimeOffset(2021, 6, 19, 15, 0, 0, 0, mesz).UtcDateTime, Team1 = "Ungarn", Team2 = "Frankreich" },
                new Game() { Id = 24, Time = new DateTimeOffset(2021, 6, 19, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Portugal", Team2 = "Deutschland" },
                new Game() { Id = 35, Time = new DateTimeOffset(2021, 6, 23, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Portugal", Team2 = "Frankreich" },
                new Game() { Id = 36, Time = new DateTimeOffset(2021, 6, 23, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Deutschland", Team2 = "Ungarn" },

                new Game() { Id = 37, Time = new DateTimeOffset(2021, 6, 26, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Wales", Team2 = "Dänemark", Points = 4.0, DoesNotSupportDraw = true},
                new Game() { Id = 38, Time = new DateTimeOffset(2021, 6, 26, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Italien", Team2 = "Österreich", Points = 4.0, DoesNotSupportDraw = true},
                new Game() { Id = 39, Time = new DateTimeOffset(2021, 6, 27, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Niederlande", Team2 = "Tschechien", Points = 4.0, DoesNotSupportDraw = true},
                new Game() { Id = 40, Time = new DateTimeOffset(2021, 6, 27, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Belgien", Team2 = "Portugal", Points = 4.0, DoesNotSupportDraw = true},
                new Game() { Id = 41, Time = new DateTimeOffset(2021, 6, 28, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Kroatien", Team2 = "Spanien", Points = 4.0, DoesNotSupportDraw = true },
                new Game() { Id = 42, Time = new DateTimeOffset(2021, 6, 28, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Frankreich", Team2 = "Schweiz", Points = 4.0, DoesNotSupportDraw = true },
                new Game() { Id = 43, Time = new DateTimeOffset(2021, 6, 29, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "England", Team2 = "Deutschland", Points = 4.0, DoesNotSupportDraw = true },
                new Game() { Id = 44, Time = new DateTimeOffset(2021, 6, 29, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Schweden", Team2 = "Ukraine", Points = 4.0, DoesNotSupportDraw = true },

                new Game() { Id = 45, Time = new DateTimeOffset(2021, 7,  2, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Schweiz", Team2 = "Spanien", Points = 5.0, DoesNotSupportDraw = true },
                new Game() { Id = 46, Time = new DateTimeOffset(2021, 7,  2, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Belgien", Team2 = "Italien", Points = 5.0, DoesNotSupportDraw = true },
                new Game() { Id = 47, Time = new DateTimeOffset(2021, 7,  3, 18, 0, 0, 0, mesz).UtcDateTime, Team1 = "Tschechien", Team2 = "Dänemark", Points = 5.0, DoesNotSupportDraw = true },
                new Game() { Id = 48, Time = new DateTimeOffset(2021, 7,  3, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Ukraine", Team2 = "England", Points = 5.0, DoesNotSupportDraw = true },

                new Game() { Id = 49, Time = new DateTimeOffset(2021, 7,  6, 21, 0, 0, 0, mesz).UtcDateTime, Team1 = "Italien", Team2 = "Spanien", Points = 6.0, DoesNotSupportDraw = true }
            };
            foreach (var game in games)
            {
                if (!await context.Games.Where(g => g.Id == game.Id).AnyAsync())
                {
                    await context.Games.AddAsync(game);
                }
            }
            await context.SaveChangesAsync();
        }
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            await MigrateDatabase(host);
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
