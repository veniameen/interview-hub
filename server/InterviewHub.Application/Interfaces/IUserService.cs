using InterviewHub.Domain.Entities;

namespace InterviewHub.Application.Interfaces;

public interface IUserService
{
    public Task<IEnumerable<User>> GetAllAsync(int? skip, int? take, CancellationToken cancellationToken = default);

    public Task<User?> GetById(Guid id, CancellationToken cancellationToken = default);

    public Task<IEnumerable<Role>> GetAllRoleAsync(CancellationToken cancellationToken = default);
    public Task<User?> GetByEmail(string email, CancellationToken cancellationToken = default);

    public Task<Candidate> AddCandidateAsync(string userEmail, int candidateId, CancellationToken cancellationToken = default);
}