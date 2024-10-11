using AutoMapper;
using InterviewHub.Application.Common.Exceptions;
using InterviewHub.Application.Common.Helpers;
using InterviewHub.Application.Common.Mappings;
using InterviewHub.Domain.Interfaces.Database;
using MediatR;

namespace InterviewHub.Application.CQRS.User.Register;

public class RegisterCommand : IRequest<UserView>, IMapWith<Domain.Entities.User>
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FIO { get; set; }
    public int RoleId { get; set; }


    public void Mapping(Profile profile)
    {
        profile.CreateMap<RegisterCommand, Domain.Entities.User>();
    }
}

public class RegisterCommandHandler(IMapper mapper, IUserRepository userRepository) : IRequestHandler<RegisterCommand, UserView>
{
    public async Task<UserView> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        if (await userRepository.GetByEmailAsync(request.Email, cancellationToken) is not null)
            throw new UserExistException(request.Email);
        
        var user = mapper.Map<Domain.Entities.User>(request);
        
        user.PasswordHash = HashManager.HashPassword(request.Password);
        
        await userRepository.CreateAsync(user, cancellationToken);

        return new UserView(user.Email, user.FIO);
    }
}

public record UserView(string Email, string FIO);