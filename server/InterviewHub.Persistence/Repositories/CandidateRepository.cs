using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using InterviewHub.Domain.Interfaces.Database;
using Microsoft.EntityFrameworkCore;

namespace InterviewHub.Persistence.Repositories;

public class CandidateRepository(IDbContext context) : ICandidateRepository
{
    public async Task<int> CreateAsync(Candidate candidate, CancellationToken cancellationToken = default)
    {
        context.Candidates.Add(candidate);
        return await context.SaveChangesAsync(cancellationToken);
    }
    
    public async Task<int> UpdateAsync(Candidate candidate, CancellationToken cancellationToken = default)
    {
        context.Candidates.Update(candidate);
        return await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<Candidate?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await context.Candidates.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted,
            cancellationToken: cancellationToken);
    }

    public async Task<List<Candidate>> GetListAsync(CancellationToken cancellationToken = default)
    {
        return context.Candidates.Where(x => !x.IsDeleted).ToList();
    }
}