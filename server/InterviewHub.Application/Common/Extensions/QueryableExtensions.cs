namespace InterviewHub.Application.Common.Extensions;

public static class QueryableExtensions
{
    public static IQueryable<TEntity> TakeOrAll<TEntity>(
        this IQueryable<TEntity> source, int? take) =>
        take.HasValue ? source.Take(take.Value) : source;
    
    public static IQueryable<TEntity> SkipOrAll<TEntity>(
        this IQueryable<TEntity> source, int? take) =>
        take.HasValue ? source.Skip(take.Value) : source;
}