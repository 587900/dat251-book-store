using Microsoft.EntityFrameworkCore;

namespace ItemService.Models
{
    public class ItemServiceContext(DbContextOptions<ItemServiceContext> options) : DbContext(options)
    {
        public DbSet<Book> Books { get; set; } = null!;
        public DbSet<Series> Series { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Series>()
                .HasMany(s => s.Books)
                .WithOne(b => b.Series)
                .HasForeignKey(e => e.SeriesId)
                .IsRequired(false);
            modelBuilder.Entity<Book>()
                .HasDiscriminator<BookType>("discriminator")
                .HasValue<PhysicalBook>(BookType.PhysicalBook)
                .HasValue<EBook>(BookType.EBook);
        }
    }
}
