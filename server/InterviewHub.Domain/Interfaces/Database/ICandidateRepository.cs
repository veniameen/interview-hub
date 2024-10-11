using InterviewHub.Domain.Entities;

namespace InterviewHub.Domain.Interfaces.Database;

public interface ICandidateRepository
{
    public Task<int> CreateAsync(Candidate candidate, CancellationToken cancellationToken = default);

    public Task<int> UpdateAsync(Candidate candidate, CancellationToken cancellationToken = default);
    
    public Task<Candidate?> GetByIdAsync(int id, CancellationToken cancellationToken = default);

    public Task<List<Candidate>> GetListAsync(CancellationToken cancellationToken = default);
}