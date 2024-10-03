using InterviewHub.Application.Interfaces;
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
                options.UseNpgsql(configuration.GetConnectionString(nameof(ApplicationDbContext)));
            });

            services.AddScoped<IDbContext>(provider => provider.GetService<ApplicationDbContext>()!);

            return services;
        }
    }
}
