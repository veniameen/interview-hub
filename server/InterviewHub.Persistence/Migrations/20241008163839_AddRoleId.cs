using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InterviewHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "Id", "CreatedAt", "Email", "IsDeleted", "PasswordHash", "RoleId", "UpdatedAt" },
                values: new object[] { new Guid("204b78ec-0705-4484-b6df-000abf87af9e"), new DateTime(2024, 10, 8, 19, 38, 38, 700, DateTimeKind.Local).AddTicks(5067), "test@test.com", false, "10000:NlWQcjHD7EmsbLgZhzHTNg==:0wwaII+tF7cVif+HbDv+Z6TyDYQ7G8zRFZxp11xNiq0=", 1, new DateTime(2024, 10, 8, 19, 38, 38, 700, DateTimeKind.Local).AddTicks(5086) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"));
        }
    }
}
