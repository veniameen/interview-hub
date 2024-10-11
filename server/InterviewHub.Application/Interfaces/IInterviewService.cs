using InterviewHub.Domain.Entities;

namespace InterviewHub.Application.Interfaces;

public interface IInterviewService
{
    public Task<Interview> CreateInterviewAsync(int candidateId, CancellationToken cancellationToken = default);
    public Task<Interview?> GetInterview(int interviewId, CancellationToken cancellationToken = default);

    public Task<Interview> AddRoom(string roomId, int interviewId, CancellationToken cancellationToken = default);

    public Task<Interview> AddTaskRange(IEnumerable<int> taskIds, int interviewId,
        CancellationToken cancellationToken = default);
    
    Task<Interview> AddRating(InterviewRating interviewRating, CancellationToken cancellationToken);
    Task AddCodeChangeAsync(CodeChange codeChange, CancellationToken cancellationToken);
}