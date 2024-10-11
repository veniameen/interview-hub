using InterviewHub.Domain.Entities;

namespace InterviewHub.Application.Interfaces;

public interface ITaskService
{
    public Task<TaskEntity?> CreateTaskAsync(string name, string description, string programmingLanguage, string code,
        string answer, bool isActive, int typeId, bool isPublic);

    public Task<TaskEntity?> UpdateTaskAsync(int id, string name, string description, string programmingLanguage,
        string code, string answer, bool isActive, int typeId, bool isPublic);
    public Task<TaskEntity?> GetTaskAsync(int id);
    public Task<List<TaskEntity>> GetTasksAsync();
    public Task<List<TaskType>> GetTaskTypesAsync();
    public Task DeleteTaskAsync(int id);
}