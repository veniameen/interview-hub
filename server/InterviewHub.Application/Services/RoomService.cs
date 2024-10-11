using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using InterviewHub.Domain.Interfaces.Database;
using Task = System.Threading.Tasks.Task;

namespace InterviewHub.Application.Services;

public class RoomService(IRoomRepository roomRepository) : IRoomService
{
    
    public async Task<Room?> CreateRoomAsync(string roomId, string connectionId)
    {
        var room = new Room()
        {
            Id = roomId,
            CreatedAt = DateTime.Now,
            Name = null,
            ConnectionRooms = new List<ConnectionRoom>()
        };
        var connectionRoom = new ConnectionRoom
        {
            Id = new Guid(),
            ConnectionId = connectionId,
            RoomId = room.Id,
            Room = room
        };
        
        room.ConnectionRooms.Add(connectionRoom);

       await roomRepository.CreateAsync(room);

        return room;
    }
    
    public async Task AddRoomAsync(string roomId, string connectionId)
    {
       var room = await roomRepository.GetByRoomIdAsync(roomId);
       
       if(room is null) return;
       
       room.ConnectionRooms ??= new List<ConnectionRoom>();
       
       room.ConnectionRooms.Add(new ConnectionRoom
       {
           ConnectionId = connectionId,
           Room = room,
           RoomId = roomId
       });

       await roomRepository.UpdateAsync(room);
    }

    public void DeleteRoom(int roomId)
    {
       //TODO
    }

    public void DeleteRoom(string connectionId)
    {
       
    }

    public async Task<Room?> GetRoomAsync(string roomId)
    {
        return await roomRepository.GetByRoomIdAsync(roomId);
    }
}