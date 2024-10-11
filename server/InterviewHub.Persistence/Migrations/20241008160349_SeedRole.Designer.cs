﻿// <auto-generated />
using System;
using InterviewHub.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace InterviewHub.Persistence.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241008160349_SeedRole")]
    partial class SeedRole
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("InterviewHub.Domain.Entities.Candidate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("ResumeUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("IsDeleted");

                    b.ToTable("Candidates", (string)null);
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.ConnectionRoom", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("ConnectionId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("RoomId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.ToTable("ConnectionRooms", (string)null);
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.Interview", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CandidateId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("CandidateId");

                    b.HasIndex("IsDeleted");

                    b.ToTable("Interviews", (string)null);
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.InterviewRating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CodeQuality")
                        .HasColumnType("integer");

                    b.Property<int>("Debugging")
                        .HasColumnType("integer");

                    b.Property<int>("InterviewId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<int>("SoftSkills")
                        .HasColumnType("integer");

                    b.Property<int>("SolveTaskWay")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("InterviewId");

                    b.HasIndex("IsDeleted");

                    b.ToTable("InterviewRatings", (string)null);
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.InterviewTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("InterviewId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("InterviewId");

                    b.HasIndex("IsDeleted");

                    b.ToTable("InterviewTasks", (string)null);
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.HasKey("Id");

                    b.ToTable("roles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            IsDeleted = false,
                            Name = "Admin"
                        },
                        new
                        {
                            Id = 2,
                            IsDeleted = false,
                            Name = "Candidate"
                        },
                        new
                        {
                            Id = 3,
                            IsDeleted = false,
                            Name = "Interviewer"
                        });
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.Room", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<DateTime?>("ClosedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp without time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.HasKey("Id");

                    b.ToTable("rooms", (string)null);
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp without time zone")
                        .HasDefaultValueSql("NOW()");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp without time zone")
                        .HasDefaultValueSql("NOW()");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("RoleId");

                    b.ToTable("user", (string)null);
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.ConnectionRoom", b =>
                {
                    b.HasOne("InterviewHub.Domain.Entities.Room", "Room")
                        .WithMany("ConnectionRooms")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.Interview", b =>
                {
                    b.HasOne("InterviewHub.Domain.Entities.Candidate", "Candidate")
                        .WithMany("Interviews")
                        .HasForeignKey("CandidateId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Candidate");
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.InterviewRating", b =>
                {
                    b.HasOne("InterviewHub.Domain.Entities.Interview", "Interview")
                        .WithMany("Ratings")
                        .HasForeignKey("InterviewId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Interview");
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.InterviewTask", b =>
                {
                    b.HasOne("InterviewHub.Domain.Entities.Interview", "Interview")
                        .WithMany("Tasks")
                        .HasForeignKey("InterviewId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Interview");
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.User", b =>
                {
                    b.HasOne("InterviewHub.Domain.Entities.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.Candidate", b =>
                {
                    b.Navigation("Interviews");
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.Interview", b =>
                {
                    b.Navigation("Ratings");

                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("InterviewHub.Domain.Entities.Room", b =>
                {
                    b.Navigation("ConnectionRooms");
                });
#pragma warning restore 612, 618
        }
    }
}
