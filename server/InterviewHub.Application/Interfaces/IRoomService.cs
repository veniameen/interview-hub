using InterviewHub.Domain.Entities;
using Task = System.Threading.Tasks.Task;

namespace InterviewHub.Application.Interfaces;

public interface IRoomService
{
    public Task<Room?> CreateRoomAsync(string roomId, string connectionId);
    public Task AddRoomAsync(string roomId, string connectionId);
    public Task<Room?> GetRoomAsync(string roomId);
}