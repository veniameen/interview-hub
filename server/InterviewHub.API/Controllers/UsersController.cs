using BaseProject.API.Requests;
using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BaseProject.API.Controllers;

public class UsersController(IUserService userService) : BaseController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAll(int? skip, int? take, CancellationToken cancellationToken)
    {
        var users = await userService.GetAllAsync(skip, take, cancellationToken);
        
        return Ok(users);
    }
    
    [HttpGet("{email}")]
    public async Task<ActionResult<User>> Get(string email, CancellationToken cancellationToken)
    {
        var user = await userService.GetByEmail(email, cancellationToken);
        
        return Ok(user);
    }
    
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<User>> Get(Guid id, CancellationToken cancellationToken)
    {
        var user = await userService.GetById(id, cancellationToken);
        
        return Ok(user);
    }
    
    [HttpGet("roles")]
    public async Task<ActionResult<IEnumerable<User>>> GetRoles(CancellationToken cancellationToken)
    {
        var roles = await userService.GetAllRoleAsync(cancellationToken);
        
        return Ok(roles);
    }
    
    [HttpPatch("candidate")]
    public async Task<ActionResult<IEnumerable<User>>> AddCandidate(AddCandidateRequest candidateRequest, CancellationToken cancellationToken)
    {
        var users = await userService.AddCandidateAsync(candidateRequest.UserEmail, candidateRequest.CandidateId, cancellationToken);
        
        return Ok(users);
    }
}