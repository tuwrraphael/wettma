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
            if (!context.Contests.Any(c => c.Id == 3))
            {
                await context.Contests.AddAsync(new Contest()
                {
                    Name = "EM2024",
                    Id = 3
                });
            }
            var allGames = EM2021.GetGames()
                .Union(WM2022.GetGames())
                .Union(EM2024.GetGames());

            var wrong = await context.Games.Where(g => g.Id == 140 && g.Team1 == "Ukraine").ToArrayAsync();
            foreach (var g in wrong)
            {
                var result = await context.Results.Where(r => r.GameId == g.Id).SingleOrDefaultAsync();
                if (result != null)
                {
                    context.Results.Remove(result);
                }
                var bets = await context.Bets
                    .Include(b => b.Odds)
                    .Where(r => r.Odds.GameId == g.Id).ToArrayAsync();
                foreach (var b in bets)
                {
                    context.Bets.Remove(b);
                }
                var computerPlayerBets = await context.ComputerBets
                     .Include(b => b.Odds)
                    .Where(r => r.Odds.GameId == g.Id).ToArrayAsync();
                foreach (var b in computerPlayerBets)
                {
                    context.ComputerBets.Remove(b);
                }
                var odds = await context.Odds
                    .Where(o => o.GameId == g.Id)
                    .ToArrayAsync();
                foreach (var o in odds)
                {
                    context.Odds.Remove(o);
                }
                context.Remove(g);
            }
            await context.SaveChangesAsync();

            foreach (var game in allGames)
            {
                if (!await context.Games.Where(g => g.Id == game.Id).AnyAsync())
                {
                    await context.Games.AddAsync(game);
                }
            }
            foreach (var computerPlayer in ComputerPlayers.GetComputerPlayers())
            {
                if (!await context.ComputerPlayers.Where(c => c.Id == computerPlayer.Id).AnyAsync())
                {
                    await context.ComputerPlayers.AddAsync(computerPlayer);
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
