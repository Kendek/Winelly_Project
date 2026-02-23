using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WinellyApi.Models;

namespace WinellyApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Wine> Wines { get; set; }
        public DbSet<Winery> Wineries { get; set; }
        public DbSet<Grape> Grapes { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Wine_GrapeConnection> Wine_GrapeConnections { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Wine_GrapeConnection>(x => x.HasKey(k => new { k.WineId, k.GrapeId }));

            builder.Entity<Wine_GrapeConnection>()
                .HasOne(x => x.Wine)
                .WithMany(x => x.Wine_GrapeConnections)
                .HasForeignKey(x => x.WineId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Wine_GrapeConnection>()
                .HasOne(x => x.Grape)
                .WithMany(x => x.Wine_GrapeConnections)
                .HasForeignKey(x => x.GrapeId)
                .OnDelete(DeleteBehavior.Restrict);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = "8D04DCE2-969A-435D-BBA4-DF3F325983DC",
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = "ADMIN-CONCURRENCY-1"
                },
                new IdentityRole
                {
                    Id = "F1F5B5E8-6C9A-4A3A-9A76-5B2D5E6C1234",
                    Name = "User",
                    NormalizedName = "USER",
                    ConcurrencyStamp = "USER-CONCURRENCY-1"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);

        }

    }
}
