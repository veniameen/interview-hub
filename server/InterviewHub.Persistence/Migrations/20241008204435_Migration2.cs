using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InterviewHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Migration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Tasks",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 8, 23, 44, 34, 5, DateTimeKind.Local).AddTicks(2220), new DateTime(2024, 10, 8, 23, 44, 34, 5, DateTimeKind.Local).AddTicks(2250) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Tasks");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 8, 23, 2, 39, 475, DateTimeKind.Local).AddTicks(8460), new DateTime(2024, 10, 8, 23, 2, 39, 475, DateTimeKind.Local).AddTicks(8490) });
        }
    }
}
