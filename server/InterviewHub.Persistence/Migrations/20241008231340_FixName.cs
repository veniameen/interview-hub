using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace InterviewHub.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "user",
                newName: "FIO");

            migrationBuilder.CreateTable(
                name: "CodeChanges",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InterviewId = table.Column<int>(type: "integer", nullable: false),
                    ChangeDate = table.Column<DateTime>(type: "timestamp(3) without time zone", nullable: false),
                    ChangedBy = table.Column<Guid>(type: "uuid", maxLength: 512, nullable: false),
                    CodeContent = table.Column<string>(type: "text", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeChanges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CodeChanges_Interviews_InterviewId",
                        column: x => x.InterviewId,
                        principalTable: "Interviews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 9, 2, 13, 40, 386, DateTimeKind.Local).AddTicks(7444), new DateTime(2024, 10, 9, 2, 13, 40, 386, DateTimeKind.Local).AddTicks(7458) });

            migrationBuilder.CreateIndex(
                name: "IX_CodeChanges_InterviewId",
                table: "CodeChanges",
                column: "InterviewId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CodeChanges");

            migrationBuilder.RenameColumn(
                name: "FIO",
                table: "user",
                newName: "Username");

            migrationBuilder.UpdateData(
                table: "user",
                keyColumn: "Id",
                keyValue: new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 10, 9, 0, 2, 3, 613, DateTimeKind.Local).AddTicks(1070), new DateTime(2024, 10, 9, 0, 2, 3, 613, DateTimeKind.Local).AddTicks(1100) });
        }
    }
}
