using System;

namespace InterviewHub.Domain.Interfaces;

public interface IUpdatable
{
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public void Update() => UpdatedAt = DateTime.Now;
}