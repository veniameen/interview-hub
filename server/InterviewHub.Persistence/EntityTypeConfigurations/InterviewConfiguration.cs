using InterviewHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InterviewHub.Persistence.EntityTypeConfigurations;

public class InterviewConfiguration : IEntityTypeConfiguration<Interview>
{
    public void Configure(EntityTypeBuilder<Interview> builder)
    {
        builder.ToTable("Interviews");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).UseIdentityColumn();
        builder.Property(x => x.Id).IsRequired();
        builder.HasIndex(x => x.IsDeleted);
        builder.Property(x => x.IsDeleted).IsRequired();
        
        builder.HasOne(cr => cr.Room)
            .WithOne(r => r.Interview)
            .HasForeignKey<Interview>(i => i.RoomId) 
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne(cr => cr.Candidate)
            .WithMany(r => r.Interviews)
            .HasForeignKey(cr => cr.CandidateId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}