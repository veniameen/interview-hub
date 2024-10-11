using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using InterviewHub.Domain.Interfaces.Database;
using Task = System.Threading.Tasks.Task;

namespace InterviewHub.Application.Services;

public class CandidateService(ICandidateRepository candidateRepository) : ICandidateService
{
    public async Task<Candidate?> CreateAsync(string name, string email, string description, string resumeUrl, string status)
    {
        var candidate = new Candidate(name, email, description, resumeUrl, status);
        await candidateRepository.CreateAsync(candidate);
        return candidate;
    }

    public async Task<Candidate?> UpdateAsync(int id, string name, string email, string description, string resumeUrl, string status)
    {
        var candidate = await candidateRepository.GetByIdAsync(id);
        if (candidate == default)
            return null;
        
        candidate.Name = name;
        candidate.Email = email;
        candidate.Description = description;
        candidate.ResumeUrl = resumeUrl;
        candidate.Status = status;
        await candidateRepository.UpdateAsync(candidate);
        return candidate;
    }

    public async Task<Candidate?> GetAsync(int id)
    {
        return await candidateRepository.GetByIdAsync(id);
    }
    
    public async Task<List<Candidate>> GetListAsync()
    {
        return await candidateRepository.GetListAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var candidate = await candidateRepository.GetByIdAsync(id);
        if (candidate == null)
            return;
        candidate.IsDeleted = true;
        await candidateRepository.UpdateAsync(candidate);
    }
}