namespace BaseProject.API.Requests;

public class CreateTaskRequest
{
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
    
    public bool IsPublic { get; set; }
}