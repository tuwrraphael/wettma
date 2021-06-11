using Microsoft.EntityFrameworkCore.Migrations;

namespace Wettma.Migrations
{
    public partial class Points : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Points",
                table: "Games",
                type: "REAL",
                nullable: false,
                defaultValue: 2.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Points",
                table: "Games");
        }
    }
}
