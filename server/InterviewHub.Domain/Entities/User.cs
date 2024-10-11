using System;
using System.Text.Json.Serialization;
using InterviewHub.Domain.Interfaces;

namespace InterviewHub.Domain.Entities;

public class User : Entity<Guid>, IUpdatable
{
    public string FIO { get; set; }
    [JsonIgnore]
    public string PasswordHash { get; set; }
    
    public string Email { get; set; }
    
    public Role Role { get; set; }
    public int RoleId { get; set; }
    
    public DateTime CreatedAt { get; set; } 
    
    public DateTime UpdatedAt { get; set; }
    
    public ICollection<Candidate> Candidates { get; set; } 
    
}