using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using InterviewHub.Domain.Interfaces.Database;
using Microsoft.EntityFrameworkCore;

namespace InterviewHub.Persistence.Repositories;

public class InterviewRepository(IDbContext context) : IInterviewRepository
{
    public async Task<Interview?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await context.Interviews
            .Include(x => x.Tasks)
            .Include(x => x.Ratings)
            .Include(x => x.Room)
            .ThenInclude(x => x.ConnectionRooms)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken: cancellationToken);
    }

    public async Task<Interview> CreateAsync(Candidate candidate, CancellationToken cancellationToken = default)
    {
        var interview = new Interview { CandidateId = candidate.Id };
        context.Interviews.Add(interview);

        await context.SaveChangesAsync(cancellationToken);
        
        return interview;
    }
    
    public async Task<Interview> UpdateAsync(Interview interview, CancellationToken cancellationToken = default)
    {
        context.Interviews.Update(interview);

        await context.SaveChangesAsync(cancellationToken);
        
        return interview;
    }
}