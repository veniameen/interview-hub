namespace InterviewHub.Domain.Entities;

/// <summary>
/// Собеседование
/// </summary>
public class Interview : Entity<int>
{
    public int CandidateId { get; set; }
    
    public Candidate Candidate { get; set; }
    
    public string? RoomId { get; set; }
    
    /// <summary>
    /// Комманата видеосвязи и шэринга
    /// </summary>
    public Room Room { get; set; }
    
    /// <summary>
    /// Задания
    /// </summary>
    public ICollection<TaskEntity>? Tasks { get; set; }
    
    /// <summary>
    /// Оценки
    /// </summary>
    public ICollection<InterviewRating>? Ratings { get; set; }
    
    /// <summary>
    /// История изменений кода
    /// </summary>
    public ICollection<CodeChange>? CodeChanges { get; set; }
}