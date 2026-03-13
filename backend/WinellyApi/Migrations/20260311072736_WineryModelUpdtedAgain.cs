using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WinellyApi.Migrations
{
    /// <inheritdoc />
    public partial class WineryModelUpdtedAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Wineries",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MapUrl",
                table: "Wineries",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Wineries");

            migrationBuilder.DropColumn(
                name: "MapUrl",
                table: "Wineries");
        }
    }
}
