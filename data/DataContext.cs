
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Project.Models;
namespace Project.Data
{
    public class DataContext : DbContext
    {
        public DataContext (DbContextOptions<DataContext> options): base(options)
        {
        }
        public DbSet<Project.Models.Staff> Staffs { get; set; }
        public DbSet<Project.Models.Customer> Customers { get; set; }
        public DbSet<Project.Models.Course> Courses { get; set; }
        public DbSet<Project.Models.Group> Groups { get; set; }
        public DbSet<Project.Models.JoinCourse> JoinCourses { get; set; }
        public DbSet<Project.Models.JoinGroup> JoinGroups { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Project.Models.Customer>().Property(f => f.ID).ValueGeneratedOnAdd();
        }


    }
}