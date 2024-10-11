using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Interfaces.Database;
using InterviewHub.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace InterviewHub.Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection
            services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql(configuration.GetConnectionString("DatabaseContext"));
            });

            
            services.AddScoped<IDbContext>(provider => provider.GetService<ApplicationDbContext>()!);
            services.AddTransient<IRoomRepository, RoomRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IInterviewRepository, InterviewRepository>();
            services.AddTransient<ICandidateRepository, CandidateRepository>();
            services.AddTransient<ITaskRepository, TaskRepository>();
            
            return services;
        }
    }
}
