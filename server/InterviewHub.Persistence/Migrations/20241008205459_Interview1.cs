using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InterviewHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Interview1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoomId",
                table: "Interviews",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 8, 23, 54, 59, 493, DateTimeKind.Local).AddTicks(551), new DateTime(2024, 10, 8, 23, 54, 59, 493, DateTimeKind.Local).AddTicks(564) });

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_RoomId",
                table: "Interviews",
                column: "RoomId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Interviews_rooms_RoomId",
                table: "Interviews",
                column: "RoomId",
                principalTable: "rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interviews_rooms_RoomId",
                table: "Interviews");

            migrationBuilder.DropIndex(
                name: "IX_Interviews_RoomId",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "RoomId",
                table: "Interviews");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 8, 23, 44, 34, 5, DateTimeKind.Local).AddTicks(2220), new DateTime(2024, 10, 8, 23, 44, 34, 5, DateTimeKind.Local).AddTicks(2250) });
        }
    }
}
