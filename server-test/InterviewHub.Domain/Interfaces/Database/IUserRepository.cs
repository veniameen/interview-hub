using InterviewHub.Domain.Entities;

namespace InterviewHub.Domain.Interfaces.Database;

public interface IUserRepository : IRepository<User, Guid>
{
}