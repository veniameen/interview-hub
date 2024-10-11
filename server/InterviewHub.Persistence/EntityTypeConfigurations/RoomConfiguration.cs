using InterviewHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InterviewHub.Persistence.EntityTypeConfigurations;

public class RoomConfiguration : IEntityTypeConfiguration<Room>
{
    public void Configure(EntityTypeBuilder<Room> builder)
    {
        builder.ToTable("rooms");
        
        builder.HasKey(r => r.Id);

        builder.Property(r => r.Name)
            .IsRequired(false)
            .HasMaxLength(150);

        builder.Property(r => r.CreatedAt)
            .HasColumnType("timestamp without time zone")
            .HasDefaultValueSql("NOW()")
            .IsRequired();

        builder.Property(r => r.ClosedAt)
            .HasColumnType("timestamp without time zone")
            .IsRequired(false); 
    }
}