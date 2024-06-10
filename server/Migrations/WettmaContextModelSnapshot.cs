﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Wettma.Services;

namespace Wettma.Migrations
{
    [DbContext(typeof(WettmaContext))]
    partial class WettmaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.6");

            modelBuilder.Entity("Wettma.Services.DbModels.Bet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Choice")
                        .HasColumnType("INTEGER");

                    b.Property<int>("OddsId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("TimePlaced")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("OddsId");

                    b.HasIndex("UserId");

                    b.ToTable("Bets");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.ComputerBet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Choice")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ComputerPlayerId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("OddsId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Reason")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("TimePlaced")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ComputerPlayerId");

                    b.HasIndex("OddsId");

                    b.ToTable("ComputerBets");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.ComputerPlayer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("DisplayAsUser")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ComputerPlayers");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.Contest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Contests");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ContestId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER")
                        .HasDefaultValue(1);

                    b.Property<bool>("DoesNotSupportDraw")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER")
                        .HasDefaultValue(false);

                    b.Property<DateTime?>("NextCrawlTime")
                        .HasColumnType("TEXT");

                    b.Property<double>("Points")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("REAL")
                        .HasDefaultValue(2.0);

                    b.Property<string>("Team1")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Team2")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Time")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ContestId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.GameResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("GameId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Team1Goals")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Team2Goals")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("GameId")
                        .IsUnique();

                    b.ToTable("Results");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.Odds", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<double?>("DrawOdds")
                        .HasColumnType("REAL");

                    b.Property<int>("GameId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Team1Odds")
                        .HasColumnType("REAL");

                    b.Property<double>("Team2Odds")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("ValidUntil")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("Odds");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("GoogleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasAlternateKey("DisplayName");

                    b.HasAlternateKey("GoogleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.Bet", b =>
                {
                    b.HasOne("Wettma.Services.DbModels.Odds", "Odds")
                        .WithMany("Bets")
                        .HasForeignKey("OddsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Wettma.Services.DbModels.User", "User")
                        .WithMany("Bets")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Odds");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.ComputerBet", b =>
                {
                    b.HasOne("Wettma.Services.DbModels.ComputerPlayer", "ComputerPlayer")
                        .WithMany("Bets")
                        .HasForeignKey("ComputerPlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Wettma.Services.DbModels.Odds", "Odds")
                        .WithMany("ComputerBets")
                        .HasForeignKey("OddsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ComputerPlayer");

                    b.Navigation("Odds");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.Game", b =>
                {
                    b.HasOne("Wettma.Services.DbModels.Contest", "Contest")
                        .WithMany("Games")
                        .HasForeignKey("ContestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Contest");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.GameResult", b =>
                {
                    b.HasOne("Wettma.Services.DbModels.Game", "Game")
                        .WithOne("Result")
                        .HasForeignKey("Wettma.Services.DbModels.GameResult", "GameId");

                    b.Navigation("Game");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.Odds", b =>
                {
                    b.HasOne("Wettma.Services.DbModels.Game", "Game")
                        .WithMany("Odds")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Game");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.ComputerPlayer", b =>
                {
                    b.Navigation("Bets");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.Contest", b =>
                {
                    b.Navigation("Games");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.Game", b =>
                {
                    b.Navigation("Odds");

                    b.Navigation("Result");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.Odds", b =>
                {
                    b.Navigation("Bets");

                    b.Navigation("ComputerBets");
                });

            modelBuilder.Entity("Wettma.Services.DbModels.User", b =>
                {
                    b.Navigation("Bets");
                });
#pragma warning restore 612, 618
        }
    }
}
