namespace InterviewHub.Domain.Entities;

public class ConnectionRoom : Entity<Guid>
{
    public string RoomId { get; set; }
    public Room Room { get; set; }
    public string ConnectionId { get; set; }
}