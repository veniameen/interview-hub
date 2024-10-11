using InterviewHub.Application.CQRS.Token.GenerateToken;
using InterviewHub.Application.CQRS.User.GetClaimsUser;
using InterviewHub.Application.CQRS.User.Register;
using Microsoft.AspNetCore.Mvc;

namespace BaseProject.API.Controllers;

public class AuthController : BaseController
{
    [HttpPost("token")]
    public async Task<ActionResult<TokenDto>> GenerateToken(string email, string password)
    {
        var identity  = await Mediator.Send(new GetClaimsUserCommand { Email = email, Password = password });
        
        return await Mediator.Send(new GenerateTokenCommand { UserClaims = identity});
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserView>> Register(RegisterCommand userDto, CancellationToken cancellationToken)
    {
       return await Mediator.Send(userDto, cancellationToken);
    }
    
}