using Microsoft.AspNetCore.SignalR;

namespace BaseProject.API.Hubs;

[HubRoute("chatHub")]
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        // Отправляем сообщение всем пользователям
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task SendOffer(string offer, bool isScreenShare)
    {
        // Отправляем предложение видеозвонка другому пользователю
        await Clients.Others.SendAsync("ReceiveOffer", offer, isScreenShare);
    }

    public async Task SendAnswer(string answer, bool isScreenShare)
    {
        // Отправляем ответ обратно инициатору
        await Clients.Caller.SendAsync("ReceiveAnswer", answer, isScreenShare);
    }

    public async Task SendIceCandidate(string candidate, bool isScreenShare)
    {
        // Отправляем кандидата ICE соответствующему пользователю
        await Clients.Others.SendAsync("ReceiveCandidate", candidate, isScreenShare);
    }

    // Методы для получения сообщений и предложений
    public async Task RevieveMessage(string user, string message)
    {
        await SendMessage(user, message);
    }

    public async Task RevieveOffer(string offer, bool isScreenShare)
    {
        await SendOffer(offer, isScreenShare);
    }
        
    public async Task RevieveAnswer(string answer, bool isScreenShare)
    {
        await SendAnswer(answer, isScreenShare);
    }

    public async Task RevieveCandidate(string candidate, bool isScreenShare)
    {
        await SendIceCandidate(candidate, isScreenShare);
    }
}