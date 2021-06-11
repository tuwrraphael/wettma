using Microsoft.EntityFrameworkCore;
using Wettma.Services.DbModels;

namespace Wettma.Services
{


    public class WettmaContext : DbContext
    {
        public WettmaContext(DbContextOptions<WettmaContext> contextOptions) : base(contextOptions)
        {

        }

        public DbSet<Game> Games { get; set; }
        public DbSet<GameResult> Results { get; set; }
        public DbSet<Odds> Odds { get; set; }
        public DbSet<Bet> Bets { get; set; }
        public DbSet<User> Users { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Game>()
                .HasKey(g => g.Id);
            modelBuilder.Entity<Game>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Game>()
                .Property(g => g.Time)
                .IsRequired();
            modelBuilder.Entity<Game>()
                .Property(g => g.Team1)
                .IsRequired();
            modelBuilder.Entity<Game>()
                .Property(g => g.Team2)
                .IsRequired();
            modelBuilder.Entity<Game>().HasMany(g => g.Odds)
                .WithOne(o => o.Game)
                .HasForeignKey(o => o.GameId);
            modelBuilder.Entity<Game>().HasOne(g => g.Result)
                .WithOne(o => o.Game)
                .HasForeignKey<GameResult>(o => o.GameId)
                .IsRequired(false);
            modelBuilder.Entity<Game>().Property(g => g.Points)
                .HasDefaultValue(2);

            modelBuilder.Entity<GameResult>()
                .HasKey(g => g.Id);
            modelBuilder.Entity<GameResult>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Odds>()
                .HasKey(g => g.Id);
            modelBuilder.Entity<Odds>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Odds>()
                .Property(g => g.ValidUntil)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasKey(g => g.Id);
            modelBuilder.Entity<User>()
                .Property(g => g.DisplayName)
                .IsRequired();
            modelBuilder.Entity<User>()
                .HasAlternateKey(g => g.GoogleId);
            modelBuilder.Entity<User>()
                .HasAlternateKey(g => g.DisplayName);

            modelBuilder.Entity<Bet>()
                .HasKey(g => g.Id);
            modelBuilder.Entity<Bet>()
                .Property(g => g.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Bet>()
                .Property(g => g.TimePlaced)
                .IsRequired();
            modelBuilder.Entity<Bet>()
                .Property(g => g.Choice)
                .IsRequired();
            modelBuilder.Entity<Bet>()
                .HasOne(p => p.User)
                .WithMany(p => p.Bets)
                .HasForeignKey(p => p.UserId)
                .IsRequired();
            modelBuilder.Entity<Bet>()
                .HasOne(p => p.Odds)
                .WithMany(p => p.Bets)
                .HasForeignKey(p => p.OddsId)
                .IsRequired();
        }
    }
}