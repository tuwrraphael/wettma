using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Wettma.Services
{
    public class BetsService : IBetsService
    {
        private readonly WettmaContext _wettmaContext;

        public BetsService(WettmaContext wettmaContext)
        {
            _wettmaContext = wettmaContext;
        }
        public async Task PlaceBet(int oddsId, Choice choice, UserId userId = null)
        {
            var now = DateTimeOffset.Now;
            var game = await _wettmaContext.Odds.Where(o => o.Id == oddsId).Select(g => g.Game).SingleOrDefaultAsync();
            if (null == game)
            {
                throw new OddsNotFoundException();
            }
            if (now > new DateTimeOffset(game.Time, TimeSpan.Zero).Add(TimeSpan.FromMinutes(-5)))
            {
                throw new GameStartedException();
            }
            var gameOdds = _wettmaContext.Games.Where(d => d.Id == game.Id).SelectMany(g => g.Odds);
            var newestOdds = await gameOdds.Where(g => g.ValidUntil == gameOdds.Max(s => s.ValidUntil)).SingleOrDefaultAsync();
            if (newestOdds.Id != oddsId)
            {
                throw new OddsChangedException();
            }
            if (new DateTimeOffset(newestOdds.ValidUntil, TimeSpan.Zero) < now)
            {
                throw new OddsExpiredException();
            }
            await _wettmaContext.Bets.AddAsync(new DbModels.Bet()
            {
                Choice = choice,
                OddsId = oddsId,
                TimePlaced = now.UtcDateTime,
                UserId = userId.InternalId,
            });
            await _wettmaContext.SaveChangesAsync();
        }
    }
}