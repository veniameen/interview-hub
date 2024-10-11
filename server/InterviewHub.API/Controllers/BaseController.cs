using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace BaseProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseController: ControllerBase
    {
        protected IMediator Mediator => HttpContext.RequestServices.GetService<IMediator>()!;

        //internal Guid UserId => User.Identity is null || !User.Identity.IsAuthenticated
         //   ? throw new UnauthorizedAccessException()
         //   : new Guid(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new UnauthorizedAccessException());
    }
}
