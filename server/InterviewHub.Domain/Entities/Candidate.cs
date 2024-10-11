namespace InterviewHub.Domain.Entities;

/// <summary>
/// Кандидат
/// </summary>
public class Candidate : Entity<int>
{
    public Candidate(string name, string email, string description, string resumeUrl, string status)
    {
        Name = name;
        Email = email;
        Description = description;
        ResumeUrl = resumeUrl;
        Status = status;
    }

    /// <summary>
    /// Имя
    /// </summary>
    public string Name { get; set; }
    
    /// <summary>
    /// Почта
    /// </summary>
    public string Email { get; set; }
    
    /// <summary>
    /// Описание
    /// </summary>
    public string Description { get; set; }
    
    /// <summary>
    /// Ссылка на резюме
    /// </summary>
    public string ResumeUrl { get; set; }
    
    public string Status { get; set; }
    
    /// <summary>
    /// Собеседования
    /// </summary>
    public ICollection<Interview>? Interviews { get; set; }
    
    public Guid? UserId { get; set; }
    
    /// <summary>
    /// Сыллка на пользвателя
    /// </summary>
    public User User { get; set; }
}