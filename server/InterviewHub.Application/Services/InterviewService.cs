using InterviewHub.Application.Common.Exceptions;
using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using InterviewHub.Domain.Interfaces.Database;

namespace InterviewHub.Application.Services;

public class InterviewService(
    ICandidateRepository candidateRepository, 
    IInterviewRepository interviewRepository,
    IRoomRepository roomRepository, 
    ITaskRepository taskRepository) : IInterviewService
{
    public async Task<Interview> CreateInterviewAsync(int candidateId, CancellationToken cancellationToken = default)
    {
        var candidate = await candidateRepository.GetByIdAsync(candidateId, cancellationToken);

        if (candidate is null) throw new NotFoundException(nameof(candidate), candidateId);
        
        var interview = await interviewRepository.CreateAsync(candidate, cancellationToken);

        return interview;
    }

    public async Task<Interview?> GetInterview(int interviewId, CancellationToken cancellationToken = default)
    {
        return await interviewRepository.GetByIdAsync(interviewId, cancellationToken);
    }

    public async Task<Interview> AddRoom(string roomId, int interviewId, CancellationToken cancellationToken = default)
    {
        var room = await roomRepository.GetByRoomIdAsync(roomId, cancellationToken);
        
        if (room is null) throw new NotFoundException(nameof(room), roomId);
        
        var interview = await interviewRepository.GetByIdAsync(interviewId, cancellationToken);

        if (interview is null) throw new NotFoundException(nameof(interview), interviewId);
        
        interview.Room = room;
        
        return await interviewRepository.UpdateAsync(interview, cancellationToken);
    }
    
    public async Task<Interview> AddTaskRange(IEnumerable<int> taskIds, int interviewId, CancellationToken cancellationToken = default)
    {
        var interview = await interviewRepository.GetByIdAsync(interviewId, cancellationToken);

        if (interview is null) throw new NotFoundException(nameof(interview), interviewId);

        interview.Tasks ??= new List<TaskEntity>();
        
        foreach (var taskId in taskIds)
        {
            var task = await taskRepository.GetByIdAsync(taskId, cancellationToken);
            if (task is not null)
            {
                interview.Tasks.Add(task);
            }
        }

        return await interviewRepository.UpdateAsync(interview, cancellationToken);
    }

    public async Task<Interview> AddRating(InterviewRating rating, CancellationToken cancellationToken)
    {
       var interview = await interviewRepository.GetByIdAsync(rating.InterviewId, cancellationToken);
       
       if (interview is null) throw new NotFoundException(nameof(interview), rating.InterviewId);

       interview.Ratings ??= new List<InterviewRating>();
       
       interview.Ratings.Add(rating);

       return await interviewRepository.UpdateAsync(interview, cancellationToken);
    }

    public async Task AddCodeChangeAsync(CodeChange codeChange, CancellationToken cancellationToken)
    {
        var interview = await interviewRepository.GetByIdAsync(codeChange.InterviewId, cancellationToken);
       
        if (interview is null) throw new NotFoundException(nameof(interview), codeChange.InterviewId);

        codeChange.ChangeDate = DateTime.Now;
        
        interview.CodeChanges ??= new List<CodeChange>();
       
        interview.CodeChanges.Add(codeChange);

        await interviewRepository.UpdateAsync(interview, cancellationToken);
    }
}