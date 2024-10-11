using InterviewHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace InterviewHub.Application.Interfaces;

public interface IDbContext
{
    DbSet<Room> Rooms { get; set; }
    DbSet<User> Users { get; set; }
    DbSet<Candidate> Candidates { get; set; }
    DbSet<Role> Roles { get; set; }
    DbSet<ConnectionRoom> ConnectionRooms { get; set; }
    DbSet<Interview> Interviews { get; set; }
    DbSet<InterviewRating> InterviewRatings { get; set; }
    DbSet<TaskEntity> Tasks { get; set; }
    DbSet<TaskType> TaskTypes { get; set; }
    int SaveChanges();
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}