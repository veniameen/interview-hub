using InterviewHub.Application.Common.Exceptions;
using InterviewHub.Application.Common.Extensions;
using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using InterviewHub.Domain.Interfaces.Database;
using Microsoft.EntityFrameworkCore;

namespace InterviewHub.Application.Services;

public class UserService(IUserRepository userRepository, ICandidateRepository candidateRepository) : IUserService
{
    public async Task<IEnumerable<User>> GetAllAsync(int? skip, int? take,
        CancellationToken cancellationToken = default)
    {
        return await userRepository.GetAllNoTrackAsync().SkipOrAll(skip).TakeOrAll(take).ToListAsync(cancellationToken);
    }
    
    public async Task<IEnumerable<Role>> GetAllRoleAsync(CancellationToken cancellationToken = default)
    {
        return await userRepository.GetRoles(cancellationToken);
    }
    
    public async Task<User?> GetByEmail(string email, CancellationToken cancellationToken = default)
    {
        return await userRepository.GetByEmailAsync(email, cancellationToken);
    }
    
    public async Task<User?> GetById(Guid id, CancellationToken cancellationToken = default)
    {
        return await userRepository.GetByIdAsync(id, cancellationToken);
    }

    public async Task<Candidate> AddCandidateAsync(string userEmail, int candidateId,
        CancellationToken cancellationToken = default)
    {
        var user = await userRepository.GetByEmailAsync(userEmail, cancellationToken);

        if (user is null)
            throw new NotFoundException("userEmail", userEmail);

        if(user.Candidates.FirstOrDefault(x => x.Id == candidateId) is not null)
            throw new ArgumentException("candidate added");
        
        var candidate = await candidateRepository.GetByIdAsync(candidateId, cancellationToken);

        if (candidate is null)
            throw new NotFoundException("candidateId", candidateId);

        if (candidate.Email.Equals(user.Email, StringComparison.InvariantCultureIgnoreCase) == false)
            throw new ArgumentException("candidate email and user email not equal");
        
        user.Candidates.Add(candidate);

        await userRepository.UpdateAsync(user, cancellationToken);

        return candidate;
    }
}