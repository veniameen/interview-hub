namespace InterviewHub.Domain.Entities;

/// <summary>
/// История изменения кода
/// </summary>
public class CodeChange : Entity<int>
{
    public int InterviewId { get; set; }
    public Interview Interview { get; set; }
    
    /// <summary>
    /// Дата изменения
    /// </summary>
    public DateTime ChangeDate { get; set; }
    
    /// <summary>
    /// Автор изменения
    /// </summary>
    public Guid ChangedBy { get; set; }

    /// <summary>
    /// Содержимое изменения кода
    /// </summary>
    public string CodeContent { get; set; }
}