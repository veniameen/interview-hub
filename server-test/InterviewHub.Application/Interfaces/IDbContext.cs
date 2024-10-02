namespace InterviewHub.Application.Interfaces
{
    public interface IDbContext
    {
        //DbSet<>.........
        
        int SaveChanges(); 
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
