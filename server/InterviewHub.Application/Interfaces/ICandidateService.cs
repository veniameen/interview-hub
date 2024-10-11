using InterviewHub.Domain.Entities;
using Task = System.Threading.Tasks.Task;

namespace InterviewHub.Application.Interfaces;

public interface ICandidateService
{
    public Task<Candidate?> CreateAsync(string name, string email, string description, string resumeUrl, string status);
    public Task<Candidate?> UpdateAsync(int id, string name, string email, string description, string resumeUrl, string status);
    public Task<List<Candidate>> GetListAsync();
    public Task<Candidate?> GetAsync(int id);
    public Task DeleteAsync(int id);
}