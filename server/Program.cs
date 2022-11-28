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

            if (!context.Contests.Any(c => c.Id == 2))
            {
                await context.Contests.AddAsync(new Contest()
                {
                    Name = "WM2022",
                    Id = 2
                });
            }

            foreach (var game in EM2021.GetGames()
                .Union(WM2022.GetGames()))
            {
                if (!await context.Games.Where(g => g.Id == game.Id).AnyAsync())
                {
                    await context.Games.AddAsync(game);
                }
            }
            foreach(var game in context.Games.Where(g => g.ContestId == 2 && g.Team1 == "Republik Korea"))
            {
                game.Team1 = "Südkorea";
            }
            foreach (var game in context.Games.Where(g => g.ContestId == 2 && g.Team2 == "Republik Korea"))
            {
                game.Team2 = "Südkorea";
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
