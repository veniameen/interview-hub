namespace InterviewHub.Domain.Entities;

/// <summary>
/// Задания для собеседования
/// </summary>
public class TaskEntity : Entity<int>
{
    public TaskEntity(string name, string description, string programmingLanguage, string code, string answer,
        bool isActive, int typeId, bool isPublic)
    {
        Name = name;
        Description = description;
        ProgrammingLanguage = programmingLanguage;
        Code = code;
        Answer = answer;
        IsActive = isActive;
        TypeId = typeId;
        IsPublic = isPublic;
    }

    /// <summary>
    /// Название задания
    /// </summary>
    public string Name { get; set; }
    
    /// <summary>
    /// Описание задания
    /// </summary>
    public string Description { get; set; }
    
    /// <summary>
    /// Язык программирования
    /// </summary>
    public string ProgrammingLanguage { get; set; }
    
    /// <summary>
    /// Код
    /// </summary>
    public string Code { get; set; }
    
    /// <summary>
    /// Ответ
    /// </summary>
    public string Answer { get; set; }
    
    /// <summary>
    /// Активный
    /// </summary>
    public bool IsActive { get; set; }
    
    public int TypeId { get; set; }
    
    public TaskType Type { get; set; }
    
    public bool IsPublic { get; set; }
    
    public int? InterviewId { get; set; }
    
    public Interview Interview { get; set; }
}