using InterviewHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InterviewHub.Persistence.EntityTypeConfigurations;

public class CandidateConfiguration : IEntityTypeConfiguration<Candidate>
{
    public void Configure(EntityTypeBuilder<Candidate> builder)
    {
        builder.ToTable("Candidates");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).UseIdentityColumn();
        builder.Property(x => x.Id).IsRequired();
        builder.HasIndex(x => x.IsDeleted);
        builder.Property(x => x.IsDeleted).IsRequired();
        builder.Property(x => x.Name).IsRequired(false);
        builder.Property(x => x.Email).IsRequired(false);
        builder.Property(x => x.Description).IsRequired(false);
        builder.Property(x => x.ResumeUrl).IsRequired();
        builder.Property(x => x.UserId).IsRequired(false);
        builder.Property(x => x.Status).IsRequired(false);
        
        builder.HasOne(cr => cr.User)
            .WithMany(r => r.Candidates)
            .OnDelete(DeleteBehavior.Restrict);
    }
}