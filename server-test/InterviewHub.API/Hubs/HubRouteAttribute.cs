namespace BaseProject.API.Hubs;

[AttributeUsage(AttributeTargets.Class, Inherited = false)]
public class HubRouteAttribute(string route) : Attribute
{
    public string Route { get; } = route;
}