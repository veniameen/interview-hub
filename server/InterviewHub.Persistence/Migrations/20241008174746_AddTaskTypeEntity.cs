using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InterviewHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTaskTypeEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Tasks",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProgrammingLanguage",
                table: "Tasks",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 8, 20, 47, 46, 47, DateTimeKind.Local).AddTicks(5670), new DateTime(2024, 10, 8, 20, 47, 46, 47, DateTimeKind.Local).AddTicks(5700) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "ProgrammingLanguage",
                table: "Tasks");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 8, 20, 35, 58, 276, DateTimeKind.Local).AddTicks(2821), new DateTime(2024, 10, 8, 20, 35, 58, 276, DateTimeKind.Local).AddTicks(2833) });
        }
    }
}
