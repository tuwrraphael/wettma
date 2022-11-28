using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Wettma.Migrations
{
    public partial class NextCrawlTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "NextCrawlTime",
                table: "Games",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextCrawlTime",
                table: "Games");
        }
    }
}
