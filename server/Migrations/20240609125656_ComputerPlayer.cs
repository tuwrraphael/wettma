using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Wettma.Migrations
{
    public partial class ComputerPlayer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ComputerPlayers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    DisplayAsUser = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComputerPlayers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ComputerBets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ComputerPlayerId = table.Column<int>(type: "INTEGER", nullable: false),
                    TimePlaced = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Choice = table.Column<int>(type: "INTEGER", nullable: false),
                    OddsId = table.Column<int>(type: "INTEGER", nullable: false),
                    Reason = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComputerBets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ComputerBets_ComputerPlayers_ComputerPlayerId",
                        column: x => x.ComputerPlayerId,
                        principalTable: "ComputerPlayers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComputerBets_Odds_OddsId",
                        column: x => x.OddsId,
                        principalTable: "Odds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ComputerBets_ComputerPlayerId",
                table: "ComputerBets",
                column: "ComputerPlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_ComputerBets_OddsId",
                table: "ComputerBets",
                column: "OddsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ComputerBets");

            migrationBuilder.DropTable(
                name: "ComputerPlayers");
        }
    }
}
