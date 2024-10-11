using InterviewHub.Domain.Entities;

namespace InterviewHub.Domain.Interfaces.Database;

public interface IInterviewRepository
{
    public Task<Interview?> GetByIdAsync(int id, CancellationToken cancellationToken = default);

    public Task<Interview> CreateAsync(Candidate candidate, CancellationToken cancellationToken = default);

    public Task<Interview> UpdateAsync(Interview interview, CancellationToken cancellationToken = default);
}