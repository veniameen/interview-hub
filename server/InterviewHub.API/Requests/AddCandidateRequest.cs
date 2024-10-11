namespace BaseProject.API.Requests;

public record AddCandidateRequest
{
    public string UserEmail { get; set; }
    public int CandidateId { get; set; }
}