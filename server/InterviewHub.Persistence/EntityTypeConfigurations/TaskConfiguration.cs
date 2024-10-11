using InterviewHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InterviewHub.Persistence.EntityTypeConfigurations;

public class TaskConfiguration : IEntityTypeConfiguration<TaskEntity>
{
    public void Configure(EntityTypeBuilder<TaskEntity> builder)
    {
        builder.ToTable("Tasks");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).UseIdentityColumn();
        builder.Property(x => x.Id).IsRequired();
        builder.HasIndex(x => x.IsDeleted);
        builder.Property(x => x.IsDeleted).IsRequired();
        builder.Property(x => x.Name).IsRequired();
        builder.Property(x => x.Description).IsRequired();
        builder.Property(x => x.ProgrammingLanguage).IsRequired(false);
        builder.Property(x => x.Code).IsRequired(false);
        builder.Property(x => x.Answer).IsRequired();
        builder.Property(x => x.IsActive).IsRequired();
        builder.Property(x => x.IsPublic).IsRequired();
        
        builder.HasOne(cr => cr.Type)
            .WithMany(r => r.Tasks)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder.HasOne(cr => cr.Interview)
            .WithMany(r => r.Tasks)
            .HasForeignKey(cr => cr.InterviewId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}