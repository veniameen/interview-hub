using System;
using InterviewHub.Domain.Interfaces.Database;

namespace InterviewHub.Persistence.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    
    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
        Users = new UserRepository(_context);
    }
    
    public IUserRepository Users { get; private set; }

    public int Complete()
    {
        return _context.SaveChanges();
    }

    public virtual void Dispose()
    {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}