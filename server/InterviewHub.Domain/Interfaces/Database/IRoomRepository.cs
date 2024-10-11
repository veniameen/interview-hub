using System.Threading;
using System.Threading.Tasks;
using InterviewHub.Domain.Entities;

namespace InterviewHub.Domain.Interfaces.Database;

public interface IRoomRepository
{
    public Task<Room?> GetByRoomIdAsync(string roomId, CancellationToken cancellationToken = default);
    public Task<int> CreateAsync(Room room, CancellationToken cancellationToken = default);

    public Task<int> UpdateAsync(Room room, CancellationToken cancellationToken = default);
}