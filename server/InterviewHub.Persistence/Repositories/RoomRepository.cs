using InterviewHub.Application.Interfaces;
using InterviewHub.Domain.Entities;
using InterviewHub.Domain.Interfaces.Database;
using Microsoft.EntityFrameworkCore;

namespace InterviewHub.Persistence.Repositories;

public class RoomRepository(IDbContext context) : IRoomRepository
{
    public async Task<Room?> GetByRoomIdAsync(string roomId, CancellationToken cancellationToken = default)
    {
       return await context.Rooms.FirstOrDefaultAsync(x => x != null && x.Id == roomId, cancellationToken: cancellationToken);
    }
    
    public async Task<int> CreateAsync(Room room, CancellationToken cancellationToken = default)
    {
        if (room is null) return 0;

        context.Rooms.Add(room);

        return await context.SaveChangesAsync(cancellationToken);
    }
    
    public async Task<int> UpdateAsync(Room room, CancellationToken cancellationToken = default)
    {
        var roomUpdate = await context.Rooms.FirstOrDefaultAsync(x => x != null && x.Id == room.Id, cancellationToken: cancellationToken);

        if (roomUpdate is null) return 0;

        context.Rooms.Update(room);
        
        return await context.SaveChangesAsync(cancellationToken);
    }
}