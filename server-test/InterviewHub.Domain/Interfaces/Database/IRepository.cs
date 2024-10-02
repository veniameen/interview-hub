namespace InterviewHub.Domain.Interfaces.Database;

public interface IRepository<TEntity, in TId> where TEntity : IIdentifier<TId>
{
    public TEntity GetById(TId id);

    public int Create(TEntity entity);
    public int Update(TEntity entity);
    public TEntity Delete(TId id);
}