using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InterviewHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Addseed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Candidates",
                columns: new[] { "Id", "Description", "Email", "IsDeleted", "Name", "ResumeUrl", "Status", "UserId" },
                values: new object[,]
                {
                    { 2, "Кандидат на вакансию пайтон девелопер", "test@test.com", false, "Test Testov", "http://", "Готовится", null },
                    { 3, "Кандидат на вакансию C# jun", "kirill@test.com", false, "Frolov kirill", "http://proger111", "Готовится", null },
                    { 4, "", "karl@test.com", false, "Test Karlov", "http://teeee", "Отдыхает", null }
                });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 9, 9, 14, 10, 36, DateTimeKind.Local).AddTicks(5283), new DateTime(2024, 10, 9, 9, 14, 10, 36, DateTimeKind.Local).AddTicks(5296) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Candidates",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Candidates",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Candidates",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 9, 2, 13, 40, 386, DateTimeKind.Local).AddTicks(7444), new DateTime(2024, 10, 9, 2, 13, 40, 386, DateTimeKind.Local).AddTicks(7458) });
        }
    }
}
