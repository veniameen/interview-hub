namespace InterviewHub.Domain.Entities;

public abstract class Entity<TId>
{
    public TId Id { get; set; }
    
    public bool IsDeleted { get; set; }
}