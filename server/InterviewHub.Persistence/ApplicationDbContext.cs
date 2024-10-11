using System.Reflection;
using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace InterviewHub.Persistence
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options), IDbContext
    {
        public DbSet<Room> Rooms { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<ConnectionRoom> ConnectionRooms { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<InterviewRating> InterviewRatings { get; set; }
        public DbSet<TaskEntity> Tasks { get; set; }
        public DbSet<TaskType> TaskTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "Admin" },
                new Role { Id = 2, Name = "Candidate" },
                new Role { Id = 3, Name = "Interviewer" }
            );

            modelBuilder.Entity<TaskType>().HasData(
                new TaskType { Id = 1, Name = "Задача" },
                new TaskType { Id = 2, Name = "Вопрос" }
            );

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = new Guid("204b78ec-0705-4484-b6df-000abf87af9e"),
                    Email = "test@test.com",
                    PasswordHash = "10000:NlWQcjHD7EmsbLgZhzHTNg==:0wwaII+tF7cVif+HbDv+Z6TyDYQ7G8zRFZxp11xNiq0=", //123
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    RoleId = 1
                }
            );

            modelBuilder.Entity<Candidate>().HasData(
                new Candidate
                ("Test Testov",
                    "test@test.com", "Кандидат на вакансию пайтон девелопер", "http://",
                    "Готовится"
                )
                {
                    Id = 2
                },
            new Candidate
                ("Frolov kirill",
                    "kirill@test.com", "Кандидат на вакансию C# jun", "http://proger111",
                    "Готовится"
                )
            {
                Id = 3
            },
            new Candidate
                ("Test Karlov",
                    "karl@test.com", "", "http://teeee",
                    "Отдыхает"
                )
            {
                Id = 4
            }
            )
                ;

            base.OnModelCreating(modelBuilder);
        }
    }
}