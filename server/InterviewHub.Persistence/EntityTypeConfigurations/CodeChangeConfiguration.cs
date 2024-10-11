using InterviewHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InterviewHub.Persistence.EntityTypeConfigurations;

public class CodeChangeConfiguration : IEntityTypeConfiguration<CodeChange>
{
    public void Configure(EntityTypeBuilder<CodeChange> builder)
    {
        builder.ToTable("CodeChanges"); 

        builder.HasKey(cc => cc.Id);

        builder.Property(cc => cc.ChangeDate)
            .HasColumnType("timestamp(3)") 
            .IsRequired(); 

        builder.Property(cc => cc.ChangedBy)
            .HasMaxLength(512); 

        builder.Property(cc => cc.CodeContent)
            .HasColumnType("text");

        builder.HasOne(cc => cc.Interview)
            .WithMany(i => i.CodeChanges) // Настройка обратной навигации
            .HasForeignKey(cc => cc.InterviewId); 
    }
}