using System.Security.Claims;
using MediatR;

namespace InterviewHub.Application.CQRS.Token.GenerateToken;

public class GenerateTokenCommand : IRequest<TokenDto>
{
    public ClaimsIdentity? UserClaims { get; set; }
}