namespace BaseProject.API.Requests;

public class CreateCandidateRequest
{
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
}