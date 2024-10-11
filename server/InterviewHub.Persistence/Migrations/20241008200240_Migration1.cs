using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InterviewHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Migration1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "InterviewId",
                table: "Tasks",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 8, 23, 2, 39, 475, DateTimeKind.Local).AddTicks(8460), new DateTime(2024, 10, 8, 23, 2, 39, 475, DateTimeKind.Local).AddTicks(8490) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "InterviewId",
                table: "Tasks",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 8, 20, 59, 39, 84, DateTimeKind.Local).AddTicks(3257), new DateTime(2024, 10, 8, 20, 59, 39, 84, DateTimeKind.Local).AddTicks(3273) });
        }
    }
}
