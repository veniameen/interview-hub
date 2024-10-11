using InterviewHub.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InterviewHub.Persistence.EntityTypeConfigurations;

public class ConnectionRoomConfiguration : IEntityTypeConfiguration<ConnectionRoom>
{
    public void Configure(EntityTypeBuilder<ConnectionRoom> builder)
    {
        builder.HasKey(cr => cr.Id);

        builder.Property(cr => cr.RoomId)
            .IsRequired();

        builder.Property(cr => cr.ConnectionId)
            .IsRequired();
        
        builder.HasOne(cr => cr.Room)
            .WithMany(r => r.ConnectionRooms)
            .HasForeignKey(cr => cr.RoomId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.ToTable("ConnectionRooms");
    }
}