using System.Security.Claims;
using MediatR;

namespace InterviewHub.Application.CQRS.User.GetClaimsUser;

public class GetClaimsUserCommand : IRequest<ClaimsIdentity>
{
    public string Email { get; set; }
    public string Password { get; set; }
}