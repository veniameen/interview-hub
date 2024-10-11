using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using InterviewHub.Domain.Interfaces.Database;
using Microsoft.EntityFrameworkCore;

namespace InterviewHub.Persistence.Repositories;

public class TaskRepository(IDbContext context) : ITaskRepository
{
    public async Task<int> CreateAsync(TaskEntity task, CancellationToken cancellationToken = default)
    {
        context.Tasks.Add(task);
        return await context.SaveChangesAsync(cancellationToken);
    }
    
    public async Task<int> UpdateAsync(TaskEntity task, CancellationToken cancellationToken = default)
    {
        context.Tasks.Update(task);
        return await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<TaskEntity?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await context.Tasks.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted,
            cancellationToken: cancellationToken);
    }

    public async Task<List<TaskEntity>> GetListAsync(CancellationToken cancellationToken = default)
    {
        return context.Tasks.Where(x => !x.IsDeleted).ToList();
    }

    public async Task<List<TaskType>> GetTaskTypesAsync(CancellationToken cancellationToken = default)
    {
        return context.TaskTypes.Where(x => !x.IsDeleted).ToList();
    }
    
}