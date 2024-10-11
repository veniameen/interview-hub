using InterviewHub.Application.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace BaseProject.API.Hubs;

[HubRoute("chatHub")]
public class ChatHub(IRoomService roomService) : Hub
{
    public async Task SendMessage(string roomId, string user, string message)
    {
        // Отправляем сообщение всем пользователям
        await Clients.All.SendAsync("ReceiveMessage", roomId, user, message);
    }

    public async Task SendOffer(string roomId, string offer, bool isScreenShare)
    {
        // Отправляем предложение видеозвонка другому пользователю
        await Clients.Others.SendAsync("ReceiveOffer", roomId, offer, isScreenShare);
    }

    public async Task SendAnswer(string roomId, string answer, bool isScreenShare)
    {
        // Отправляем ответ обратно инициатору
        await Clients.Others.SendAsync("ReceiveAnswer", roomId, answer, isScreenShare);
    }

    public async Task SendIceCandidate(string roomId, string candidate, bool isScreenShare)
    {
        // Отправляем кандидата ICE соответствующему пользователю
        await Clients.Others.SendAsync("ReceiveCandidate", roomId, candidate, isScreenShare);
    }

    #region Room

    public async Task JoinRoom(string roomId)
    {
        var room = await roomService.GetRoomAsync(roomId) ??
                   await roomService.CreateRoomAsync(roomId, Context.ConnectionId);

        if (room is null)
        {
            await Clients.Caller.SendAsync("error", "error occurred when creating a new room.");
            return;
        }

        await roomService.AddRoomAsync(Context.ConnectionId, room.Id);
        await Groups.AddToGroupAsync(Context.ConnectionId, room.Id);
        await Clients.Caller.SendAsync("created", room.Id);

        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        await Clients.Caller.SendAsync("joined", roomId);
        await Clients.Group(roomId).SendAsync("ready");
    }

    public async Task SendMicrophoneState(string roomId, bool isEnabled)
    {
        await Clients.All.SendAsync("ReceiveMicrophoneState", isEnabled);
    }

    public async Task SendScreenShareState(string roomId, bool isEnabled)
    {
        await Clients.All.SendAsync("ReceiveScreenShareState", isEnabled);
    }

    public async Task SendCameraState(string roomId, bool isEnabled)
    {
        await Clients.All.SendAsync("ReceiveCameraState", isEnabled);
    }

    #endregion
}