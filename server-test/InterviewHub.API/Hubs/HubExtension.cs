using System.Reflection;
using Microsoft.AspNetCore.SignalR;

namespace BaseProject.API.Hubs;

public static class HubExtension
{
    public static void UseHubs(this WebApplication app)
    {
        app.UseRouting();
        
        app.MapHubRoute<ChatHub>();
    }

    private static void MapHubRoute<THub>(this IEndpointRouteBuilder endpoints) where THub : Hub
    {
        var attribute = typeof(THub).GetCustomAttribute<HubRouteAttribute>();

        endpoints.MapHub<THub>(attribute?.Route ?? string.Empty);
    }
}