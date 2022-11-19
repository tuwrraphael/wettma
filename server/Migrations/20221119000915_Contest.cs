using Microsoft.EntityFrameworkCore.Migrations;

namespace Wettma.Migrations
{
    public partial class Contest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ContestId",
                table: "Games",
                type: "INTEGER",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateTable(
                name: "Contests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contests", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Games_ContestId",
                table: "Games",
                column: "ContestId");

            migrationBuilder.InsertData(
                table: "Contests",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "EM2021" });

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Contests_ContestId",
                table: "Games",
                column: "ContestId",
                principalTable: "Contests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Contests_ContestId",
                table: "Games");

            migrationBuilder.DropTable(
                name: "Contests");

            migrationBuilder.DropIndex(
                name: "IX_Games_ContestId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "ContestId",
                table: "Games");
        }
    }
}
