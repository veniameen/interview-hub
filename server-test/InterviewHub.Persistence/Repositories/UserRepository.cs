using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using InterviewHub.Domain.Interfaces.Database;

namespace InterviewHub.Persistence.Repositories;

public class UserRepository(IDbContext applicationDbContext) : IUserRepository
{
    public User GetById(Guid id)
    {
        throw new NotImplementedException();
    }

    public int Create(User entity)
    {
        throw new NotImplementedException();
    }

    public int Update(User entity)
    {
        throw new NotImplementedException();
    }

    public User Delete(Guid id)
    {
        throw new NotImplementedException();
    }
}