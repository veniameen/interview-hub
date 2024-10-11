namespace InterviewHub.Application.Interfaces;

public interface IGigaChatIntegrationService
{
    public Task<string?> GenerateTextAsync(string text);
}