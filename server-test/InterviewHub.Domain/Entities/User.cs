using InterviewHub.Domain.Interfaces;

namespace InterviewHub.Domain.Entities;

public class User : IUpdatable, IIdentifier<Guid>
{
    public Guid Id { get; set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
}