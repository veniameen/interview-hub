using System.Net;
using System.Net.Http.Headers;
using System.Text;
using InterviewHub.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace InterviewHub.Application.Services;

public class GigaChatIntegrationService : IGigaChatIntegrationService
{
    private readonly HttpClient _httpClient;
    private string? _accessToken;
    private readonly IConfiguration _configuration;
    private readonly ILogger<GigaChatIntegrationService> _logger;

    public GigaChatIntegrationService(IConfiguration configuration, ILogger<GigaChatIntegrationService> logger)
    {
        _configuration = configuration;
        _logger = logger;
        var clientHandler = new HttpClientHandler();
        clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true;
        
        _httpClient = new HttpClient(clientHandler);
    }
    
    private async Task RequestAccessToken()
    {
        
        
        var authUrl = _configuration["GigaChat:AuthUrl"];
        var secretKey = _configuration["GigaChat:SecretKey"];
        var clientId = _configuration["GigaChat:ClientId"];
        var scope = _configuration["GigaChat:Scope"];

        if (string.IsNullOrEmpty(authUrl) || string.IsNullOrEmpty(secretKey) || string.IsNullOrEmpty(clientId) ||
            string.IsNullOrEmpty(scope))
        {
            throw new ArgumentException("Configuration settings are not properly set.");
        }

        using var request = new HttpRequestMessage(HttpMethod.Post, authUrl);

        request.Headers.Authorization = new AuthenticationHeaderValue("Basic", secretKey);
        request.Headers.Add("RqUID", clientId);

        var body = $"grant_type=client_credentials&scope={Uri.EscapeDataString(scope)}";
        request.Content = new StringContent(body, Encoding.UTF8, "application/x-www-form-urlencoded");
        
        _logger.LogInformation("request complete");
        
        var response = await _httpClient.SendAsync(request);

        _logger.LogInformation("request send");
        if (response.IsSuccessStatusCode)
        {
            _logger.LogInformation("200");
            
            var content = await response.Content.ReadAsStringAsync();
            var token = JsonConvert.DeserializeObject<GigaToken>(content);
            _accessToken = token?.AccessToken;

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
        }
        else
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Ошибка при запросе токена: {response.StatusCode}, {errorContent}");
        }
    }

    public async Task<string?> GenerateTextAsync(string text)
    {
        if (string.IsNullOrEmpty(_accessToken))
        {
            await RequestAccessToken();
        }

        var requestContent = new
        {
            model = "GigaChat",
            stream = false,
            update_interval = 0,
            messages = new List<GigaMessage>()
            {
                new()
                {
                    Role = "system",
                    Content = "Отвечай как интервьюер на собеседовании"
                },
                new()
                {
                    Role = "user",
                    Content = text // "Задай мне вопрос для подготовки к собеседованию" //text
                }
            }
        };

        var request = new HttpRequestMessage(HttpMethod.Post, _configuration["GigaChat:Url"] + "/chat/completions");
        request.Content =
            new StringContent(JsonConvert.SerializeObject(requestContent), Encoding.UTF8, "application/json");
        _logger.LogInformation("request complete");
        var response = await _httpClient.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            _logger.LogInformation("200");
            
            var content = await response.Content.ReadAsStringAsync();
            var resObj = JsonConvert.DeserializeObject<ChatCompletionResponse>(content);

            return resObj?.Choices?.FirstOrDefault()?.Message?.Content;
        }
        else if (response.StatusCode == HttpStatusCode.Unauthorized) //////////////////////////////aaaaaaaaa
        {
            await RequestAccessToken();

            response = await _httpClient.SendAsync(request);
            var content = await response.Content.ReadAsStringAsync();
            var resObj = JsonConvert.DeserializeObject<ChatCompletionResponse>(content);

            return resObj?.Choices?.FirstOrDefault()?.Message?.Content;
        }

        throw new Exception($"Ошибка при генерации текста: {response.StatusCode}");
    }

    private string ExtractGeneratedText(string jsonResponse)
    {
        dynamic json = JsonConvert.DeserializeObject(jsonResponse);
        return json.generated_text; // Если поле с текстом называется иначе, измените это место
    }

    public class GigaToken
    {
        [JsonProperty("access_token")] public string? AccessToken { get; set; }
        [JsonProperty("expires_at")] public long ExpiresAt { get; set; }
    }

    public class GigaMessage
    {
        [JsonProperty("role")] public string? Role { get; set; }
        [JsonProperty("content")] public string? Content { get; set; }
    }

    public class ChatCompletionResponse
    {
        public List<Choice> Choices { get; set; }

        public long Created { get; set; }

        public string Model { get; set; }

        public string Object { get; set; }

        public Usage Usage { get; set; }
    }

    public class Choice
    {
        public Message Message { get; set; }

        public int Index { get; set; }

        [JsonProperty("finish_reason")] public string FinishReason { get; set; }
    }

    public class Message
    {
        public string? Content { get; set; }

        public string Role { get; set; }
    }

    public class Usage
    {
        [JsonProperty("prompt_tokens")] public int PromptTokens { get; set; }

        [JsonProperty("completion_tokens")] public int CompletionTokens { get; set; }

        [JsonProperty("total_tokens")] public int TotalTokens { get; set; }
    }
}