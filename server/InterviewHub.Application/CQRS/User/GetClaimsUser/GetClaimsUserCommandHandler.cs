using System.Security.Claims;
using InterviewHub.Application.Common.Exceptions;
using InterviewHub.Application.Common.Helpers;
using InterviewHub.Domain.Interfaces.Database;
using MediatR;

namespace InterviewHub.Application.CQRS.User.GetClaimsUser;

public class GetClaimsUserCommandHandler(IUserRepository userRepository) : IRequestHandler<GetClaimsUserCommand, ClaimsIdentity>
{
    public async Task<ClaimsIdentity> Handle(GetClaimsUserCommand request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailAsync(request.Email, cancellationToken);
        
        if (user == null) throw new NotFoundException("User not found", request.Email);
        
        if (HashManager.VerifyPassword(user.PasswordHash, HashManager.HashPassword(request.Password)))
            throw new UnauthorizedAccessException("Access denied");

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.Id.ToString())
        };
        
        return new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
    }
}