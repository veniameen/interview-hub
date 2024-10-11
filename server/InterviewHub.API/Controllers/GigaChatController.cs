using InterviewHub.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BaseProject.API.Controllers;

public class GigaChatController(IGigaChatIntegrationService gigaChatIntegrationService) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GenerateText(string text)
    {
        return Ok(await gigaChatIntegrationService.GenerateTextAsync(text));
    }
}