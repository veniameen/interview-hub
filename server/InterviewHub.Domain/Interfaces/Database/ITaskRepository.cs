using InterviewHub.Domain.Entities;

namespace InterviewHub.Domain.Interfaces.Database;

public interface ITaskRepository
{
    public Task<int> CreateAsync(TaskEntity task, CancellationToken cancellationToken = default);

    public Task<int> UpdateAsync(TaskEntity task, CancellationToken cancellationToken = default);
    
    public Task<TaskEntity?> GetByIdAsync(int id, CancellationToken cancellationToken = default);

    public Task<List<TaskEntity>> GetListAsync(CancellationToken cancellationToken = default);
    
    public Task<List<TaskType>> GetTaskTypesAsync(CancellationToken cancellationToken = default);
}