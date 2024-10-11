using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using InterviewHub.Domain.Interfaces.Database;

namespace InterviewHub.Application.Services;

public class TaskService(ITaskRepository taskRepository) : ITaskService
{
    public async Task<TaskEntity?> CreateTaskAsync(string name, string description, string programmingLanguage, string code,
        string answer, bool isActive, int typeId, bool isPublic)
    {
        var taskEntity = new TaskEntity(name, description, programmingLanguage, code, answer, isActive, typeId, isPublic);
        await taskRepository.CreateAsync(taskEntity);
        return taskEntity;
    }

    public async Task<TaskEntity?> UpdateTaskAsync(int id, string name, string description, string programmingLanguage, string code,
        string answer, bool isActive, int typeId, bool isPublic)
    {
        var task = await taskRepository.GetByIdAsync(id);
        if (task == default)
            return null;
        
        task.Name = name;
        task.Description = description;
        task.ProgrammingLanguage = programmingLanguage;
        task.Code = code;
        task.Answer = answer;
        task.IsActive = isActive;
        task.TypeId = typeId;
        task.IsPublic = isPublic;
        await taskRepository.UpdateAsync(task);
        return task;
    }

    public async Task<TaskEntity?> GetTaskAsync(int id)
    {
        return await taskRepository.GetByIdAsync(id);
    }
    
    public async Task<List<TaskEntity>> GetTasksAsync()
    {
        return await taskRepository.GetListAsync();
    }

    public async Task<List<TaskType>> GetTaskTypesAsync()
    {
        return await taskRepository.GetTaskTypesAsync();
    }

    public async Task DeleteTaskAsync(int id)
    {
        var task = await taskRepository.GetByIdAsync(id);
        if (task == null)
            return;
        task.IsDeleted = true;
        await taskRepository.UpdateAsync(task);
    }
}