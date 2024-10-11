using System;
using InterviewHub.Domain.Entities;

namespace InterviewHub.Domain.Interfaces.Database;

public interface IUserRepository : IRepository<User, Guid>
{
    public Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
    public Task<IEnumerable<Role>> GetRoles(CancellationToken cancellationToken = default);
    public IQueryable<User> GetAllNoTrackAsync();
}