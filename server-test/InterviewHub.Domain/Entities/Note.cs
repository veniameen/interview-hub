using InterviewHub.Domain.Interfaces;

namespace InterviewHub.Domain.Entities
{
    public class Note : IIdentifier<Guid>
    {
        public Guid Id { get; set; }
        
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? EditDate { get; set;}
    }
}
