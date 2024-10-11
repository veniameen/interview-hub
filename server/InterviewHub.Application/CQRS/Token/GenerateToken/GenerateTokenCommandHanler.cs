using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BaseProject.API.Authentication;
using InterviewHub.Application.Common.Exceptions;
using MediatR;
using Microsoft.IdentityModel.Tokens;

namespace InterviewHub.Application.CQRS.Token.GenerateToken;

public class GenerateTokenCommandHanler : IRequestHandler<GenerateTokenCommand, TokenDto>
{
    public async Task<TokenDto> Handle(GenerateTokenCommand request, CancellationToken cancellationToken)
    {
        if(request.UserClaims is null) throw new NotFoundException("User is not found", nameof(request.UserClaims));
 
        var now = DateTime.Now;
        
        var jwt = new JwtSecurityToken(
            issuer: AuthOptions.Issuer,
            audience: AuthOptions.Audience,
            notBefore: now,
            claims: request.UserClaims.Claims,
            expires: now.Add(TimeSpan.FromMinutes(AuthOptions.Lifetime)),
            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
        
        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        return new TokenDto(request?.UserClaims?.FindFirst(ClaimTypes.Email)?.Value, encodedJwt);
    }
}