using InterviewHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InterviewHub.Persistence.EntityTypeConfigurations;

public class InterviewRatingConfiguration : IEntityTypeConfiguration<InterviewRating>
{
    public void Configure(EntityTypeBuilder<InterviewRating> builder)
    {
        builder.ToTable("InterviewRatings");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).UseIdentityColumn();
        builder.Property(x => x.Id).IsRequired();
        builder.HasIndex(x => x.IsDeleted);
        builder.Property(x => x.IsDeleted).IsRequired();
        builder.Property(x => x.SoftSkills).IsRequired();
        builder.Property(x => x.SolveTaskWay).IsRequired();
        builder.Property(x => x.Debugging).IsRequired();
        builder.Property(x => x.CodeQuality).IsRequired();
        builder.HasOne(cr => cr.Interview)
            .WithMany(r => r.Ratings)
            .HasForeignKey(cr => cr.InterviewId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}