using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WinellyApi.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedRatingModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReviewDate",
                table: "Ratings",
                newName: "CreatedOn");

            migrationBuilder.AlterColumn<decimal>(
                name: "Score",
                table: "Ratings",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Ratings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Ratings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_AppUserId",
                table: "Ratings",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_AspNetUsers_AppUserId",
                table: "Ratings",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_AspNetUsers_AppUserId",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_AppUserId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Ratings");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Ratings",
                newName: "ReviewDate");

            migrationBuilder.AlterColumn<int>(
                name: "Score",
                table: "Ratings",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");
        }
    }
}
