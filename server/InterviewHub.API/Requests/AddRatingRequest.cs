using AutoMapper;
using InterviewHub.Application.Common.Mappings;
using InterviewHub.Domain.Entities;

namespace BaseProject.API.Requests;

public class AddRatingRequest : IMapWith<InterviewRating>
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
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<AddRatingRequest, InterviewRating>();
    }
}

/// <summary>
/// История изменения кода
/// </summary>
public class CodeChangeRequest  : IMapWith<CodeChange>
{
    public int InterviewId { get; set; }
    
    /// <summary>
    /// Автор изменения
    /// </summary>
    public Guid ChangedBy { get; set; }

    /// <summary>
    /// Содержимое изменения кода
    /// </summary>
    public string CodeContent { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<CodeChangeRequest, CodeChange>();
    }
}