using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using InterviewHub.Domain.Interfaces.Database;
using Microsoft.EntityFrameworkCore;

namespace InterviewHub.Persistence.Repositories;

public class UserRepository(IDbContext context) : IUserRepository
{
    public async Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
       return await context.Users.Include(x => x.Role).FirstOrDefaultAsync(x => x.Id == id, cancellationToken: cancellationToken);
    }
    
    public async Task<IEnumerable<Role>> GetRoles(CancellationToken cancellationToken = default)
    {
        return await context.Roles.ToListAsync(cancellationToken);
    }

    public async Task<int> CreateAsync(User entity, CancellationToken cancellationToken = default)
    {
        if (entity is null) return 0;
        
        context.Users.Add(entity);

        return await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<int> UpdateAsync(User entity, CancellationToken cancellationToken = default)
    {
        if (entity is null) return 0;

        entity.UpdatedAt = DateTime.Now;
        
        context.Users.Update(entity);

        return await context.SaveChangesAsync(cancellationToken);
    }
    
    public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return await context.Users
            .Include(x => x.Role)
            .Include(x => x.Candidates)
            .FirstOrDefaultAsync(x => x.Email == email, cancellationToken: cancellationToken);

    }

    public IQueryable<User> GetAllNoTrackAsync()
    {
        return context.Users.AsNoTracking();
    }
}