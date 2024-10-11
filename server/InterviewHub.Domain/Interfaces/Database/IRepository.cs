using InterviewHub.Domain.Entities;

namespace InterviewHub.Domain.Interfaces.Database;

public interface IRepository<TEntity, in TId> where TEntity : Entity<TId>
{

    public Task<TEntity?> GetByIdAsync(TId id, CancellationToken cancellationToken = default);

    public Task<int> CreateAsync(TEntity entity, CancellationToken cancellationToken = default);

    public Task<int> UpdateAsync(TEntity entity, CancellationToken cancellationToken = default);

}