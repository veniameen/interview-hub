using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InterviewHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Migration3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Candidates",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 9, 0, 2, 3, 613, DateTimeKind.Local).AddTicks(1070), new DateTime(2024, 10, 9, 0, 2, 3, 613, DateTimeKind.Local).AddTicks(1100) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Candidates");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 8, 23, 54, 59, 493, DateTimeKind.Local).AddTicks(551), new DateTime(2024, 10, 8, 23, 54, 59, 493, DateTimeKind.Local).AddTicks(564) });
        }
    }
}
