using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WinellyApi.Migrations
{
    /// <inheritdoc />
    public partial class FixedRatingWineConnection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Wineries_WineryId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Wines_WineId",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_WineryId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "WineryId",
                table: "Ratings");

            migrationBuilder.AlterColumn<int>(
                name: "WineId",
                table: "Ratings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Wines_WineId",
                table: "Ratings",
                column: "WineId",
                principalTable: "Wines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Wines_WineId",
                table: "Ratings");

            migrationBuilder.AlterColumn<int>(
                name: "WineId",
                table: "Ratings",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "WineryId",
                table: "Ratings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_WineryId",
                table: "Ratings",
                column: "WineryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Wineries_WineryId",
                table: "Ratings",
                column: "WineryId",
                principalTable: "Wineries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Wines_WineId",
                table: "Ratings",
                column: "WineId",
                principalTable: "Wines",
                principalColumn: "Id");
        }
    }
}
