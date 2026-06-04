using System;
using System.Collections.Generic;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> dbContextOptions)
            : base(dbContextOptions)
        {
        }

        public DbSet<Stock> Stocks { get; set; }

        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
{
    Id = "1",
    Name = "Admin",
    NormalizedName = "ADMIN",
    ConcurrencyStamp = "1"
},
new IdentityRole
{
    Id = "2",
    Name = "User",
    NormalizedName = "USER",
    ConcurrencyStamp = "2"
}
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}