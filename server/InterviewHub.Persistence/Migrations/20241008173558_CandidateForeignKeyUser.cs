using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InterviewHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CandidateForeignKeyUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Candidates",
                type: "uuid",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 8, 20, 35, 58, 276, DateTimeKind.Local).AddTicks(2821), new DateTime(2024, 10, 8, 20, 35, 58, 276, DateTimeKind.Local).AddTicks(2833) });

            migrationBuilder.CreateIndex(
                name: "IX_Candidates_UserId",
                table: "Candidates",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_user_UserId",
                table: "Candidates",
                column: "UserId",
                principalTable: "user",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_user_UserId",
                table: "Candidates");

            migrationBuilder.DropIndex(
                name: "IX_Candidates_UserId",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Candidates");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 8, 20, 30, 27, 453, DateTimeKind.Local).AddTicks(4150), new DateTime(2024, 10, 8, 20, 30, 27, 453, DateTimeKind.Local).AddTicks(4330) });
        }
    }
}
