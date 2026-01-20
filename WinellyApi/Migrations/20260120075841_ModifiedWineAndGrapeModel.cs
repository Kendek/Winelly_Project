using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WinellyApi.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedWineAndGrapeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Taste",
                table: "Grapes");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Wines",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Taste",
                table: "Wines",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Wines");

            migrationBuilder.DropColumn(
                name: "Taste",
                table: "Wines");

            migrationBuilder.AddColumn<string>(
                name: "Taste",
                table: "Grapes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
