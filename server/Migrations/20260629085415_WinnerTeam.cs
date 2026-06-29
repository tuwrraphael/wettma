using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Wettma.Migrations
{
    public partial class WinnerTeam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WinnerTeams",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ContestId = table.Column<int>(type: "INTEGER", nullable: false),
                    Team = table.Column<string>(type: "TEXT", nullable: false),
                    KnockedOut = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    NextCrawlTime = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WinnerTeams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WinnerTeams_Contests_ContestId",
                        column: x => x.ContestId,
                        principalTable: "Contests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WinnerTeamOdds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    WinnerTeamId = table.Column<int>(type: "INTEGER", nullable: false),
                    Odds = table.Column<double>(type: "REAL", nullable: false),
                    ValidUntil = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WinnerTeamOdds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WinnerTeamOdds_WinnerTeams_WinnerTeamId",
                        column: x => x.WinnerTeamId,
                        principalTable: "WinnerTeams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WinnerTeamBets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    TimePlaced = table.Column<DateTime>(type: "TEXT", nullable: false),
                    WinnerTeamOddsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WinnerTeamBets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WinnerTeamBets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WinnerTeamBets_WinnerTeamOdds_WinnerTeamOddsId",
                        column: x => x.WinnerTeamOddsId,
                        principalTable: "WinnerTeamOdds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WinnerTeamBets_UserId",
                table: "WinnerTeamBets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WinnerTeamBets_WinnerTeamOddsId",
                table: "WinnerTeamBets",
                column: "WinnerTeamOddsId");

            migrationBuilder.CreateIndex(
                name: "IX_WinnerTeamOdds_WinnerTeamId",
                table: "WinnerTeamOdds",
                column: "WinnerTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_WinnerTeams_ContestId",
                table: "WinnerTeams",
                column: "ContestId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WinnerTeamBets");

            migrationBuilder.DropTable(
                name: "WinnerTeamOdds");

            migrationBuilder.DropTable(
                name: "WinnerTeams");
        }
    }
}
