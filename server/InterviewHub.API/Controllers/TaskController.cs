using AutoMapper;
using BaseProject.API.Requests;
using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BaseProject.API.Controllers;

[Route("api/tasks")]
public class TaskController(IMapper mapper, IConfiguration configuration, ITaskService service)
    : BaseController
{
    private readonly IMapper _mapper = mapper;

    [HttpPost]
    public async Task<ActionResult<TaskEntity>> CreateTask([FromBody] CreateTaskRequest request)
    {   
        var task =
            await service.CreateTaskAsync(request.Name, request.Description, request.ProgrammingLanguage, request.Code,
                request.Answer, request.IsActive, request.TypeId, request.IsPublic);
        return Ok(task);
    }

    [HttpPut]
    public async Task<ActionResult<TaskEntity>> UpdateTask([FromBody] UpdateTaskRequest request)
    {
        var task = await service.UpdateTaskAsync(request.Id, request.Name, request.Description, 
            request.ProgrammingLanguage, request.Code, request.Answer, request.IsActive, request.TypeId, request.IsPublic);

        if (task == null)
            return NotFound(request.Id);
        return Ok(task);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskEntity>> GetTask(int id)
    {
        var task = await service.GetTaskAsync(id);

        if (task == null)
            return NotFound(id);
        return Ok(task);
    }

    [HttpGet]
    public async Task<ActionResult<List<TaskEntity>>> GetTasks()
    {
        var tasks = await service.GetTasksAsync();
        return Ok(tasks);
    }
        
    [HttpGet("types")]
    public async Task<ActionResult<List<TaskType>>> GetTaskTypes()
    {
        var taskTypes = await service.GetTaskTypesAsync();
        return Ok(taskTypes);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteTaskAsync(id);
        return Ok();
    }
}