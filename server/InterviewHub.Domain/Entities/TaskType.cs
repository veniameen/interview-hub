namespace InterviewHub.Domain.Entities;

public class TaskType : Entity<int>
{
   public int Id { get; set; }
   
   public string Name { get; set; }

   public ICollection<TaskEntity> Tasks { get; set; } = new List<TaskEntity>();
}
