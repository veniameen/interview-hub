namespace InterviewHub.Domain.Entities;

/// <summary>
/// Оценка за собеседование
/// </summary>
public class InterviewRating : Entity<int>
{
    /// <summary>
    /// Оценка за навыки общения (от 1 до 5)
    /// </summary>
    public int SoftSkills { get; set; }
    
    /// <summary>
    /// Оценка за способ выполнения заданий  (от 1 до 5)
    /// </summary>
    public int SolveTaskWay { get; set; }
    
    /// <summary>
    /// Оценка за дебаггинг (от 1 до 5)
    /// </summary>
    public int Debugging { get; set; }
    
    /// <summary>
    /// Оценка за качество кода (от 1 до 5)
    /// </summary>
    public int CodeQuality { get; set; }
    
    public int InterviewId { get; set; }
    
    public Interview Interview { get; set; }
}