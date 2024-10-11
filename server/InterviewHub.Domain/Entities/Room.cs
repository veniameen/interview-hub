using System;
using InterviewHub.Domain.Interfaces;

namespace InterviewHub.Domain.Entities;

public class Room : Entity<string>
{
    public string Name { get; set; }
    public required DateTime CreatedAt { get; set; }
    public DateTime? ClosedAt { get; set; }
    public Interview Interview { get; set; }
    public ICollection<ConnectionRoom>? ConnectionRooms { get; set; }
}