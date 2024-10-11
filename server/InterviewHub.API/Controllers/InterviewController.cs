using AutoMapper;
using BaseProject.API.Requests;
using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BaseProject.API.Controllers;

public class InterviewController(IInterviewService interviewService, IMapper mapper) : BaseController
{
    [HttpGet("{id:int}")]
    public async Task<Interview?> Get(int id, CancellationToken cancellationToken = default)
    {
        return await interviewService.GetInterview(id, cancellationToken);
    }
    
    [HttpPost]
    public async Task<Interview> Create(int candidateId, CancellationToken cancellationToken = default)
    {
        return await interviewService.CreateInterviewAsync(candidateId, cancellationToken);
    }
    
    [HttpPatch("room")]
    public async Task<Interview> AddRoom(string roomId, int interviewId, CancellationToken cancellationToken = default)
    {
        return await interviewService.AddRoom(roomId, interviewId, cancellationToken);
    }

    [HttpPatch("tasks")]
    public async Task<Interview> AddTasks(IEnumerable<int> taskIds, int interviewId, CancellationToken cancellationToken = default)
    {
        return await interviewService.AddTaskRange(taskIds, interviewId, cancellationToken);
    }
    
    [HttpPatch("rating")]
    public async Task<Interview> AddRating(AddRatingRequest request, CancellationToken cancellationToken = default)
    {

        var interviewRating = mapper.Map<InterviewRating>(request);
        return await interviewService.AddRating(interviewRating, cancellationToken);
    }
    
    [HttpPatch("code-change")]
    public async Task<IActionResult> AddRating(CodeChangeRequest request, CancellationToken cancellationToken = default)
    {
        var codeChange = mapper.Map<CodeChange>(request);
        await interviewService.AddCodeChangeAsync(codeChange, cancellationToken);

        return NoContent();
    }
    
}