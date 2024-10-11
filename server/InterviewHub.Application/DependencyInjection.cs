using System.Reflection;
using FluentValidation;
using InterviewHub.Application.Common.Behaviors;
using InterviewHub.Application.Interfaces;
using InterviewHub.Application.Services;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace InterviewHub.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(config => config.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        services.AddValidatorsFromAssemblies(new[] { Assembly.GetExecutingAssembly() });
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        services.AddScoped<IRoomService, RoomService>();
        services.AddScoped<ICandidateService, CandidateService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ITaskService, TaskService>();
        services.AddScoped<IInterviewService, InterviewService>();
        
        services.AddSingleton<IGigaChatIntegrationService, GigaChatIntegrationService>();
        
        return services;
    }
}