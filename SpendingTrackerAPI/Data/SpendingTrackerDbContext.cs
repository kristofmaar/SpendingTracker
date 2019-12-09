using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SpendingTrackerAPI.Model;
using System;
using System.Linq;

namespace SpendingTrackerAPI.Data
{
    public class SpendingTrackerDbContext : IdentityDbContext<User, Role, Guid>
    {
        public SpendingTrackerDbContext(DbContextOptions<SpendingTrackerDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .Property(c => c.Currency)
                .HasConversion<string>();

            builder.Entity<Spending>()
                .Property(c => c.Currency)
                .HasConversion<string>();

            builder.Entity<Role>().HasData(
                new { Id = Guid.NewGuid(), Name = "Admin", NormalizedName = "ADMIN" },
                new { Id = Guid.NewGuid(), Name = "Customer", NormalizedName = "CUSTOMER" }
            );

            base.OnModelCreating(builder);
        }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Spending> Spendings { get; set; }
    }
}
