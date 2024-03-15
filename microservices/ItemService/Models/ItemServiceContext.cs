using Microsoft.EntityFrameworkCore;

namespace ItemService.Models
{
    public class ItemServiceContext(DbContextOptions<ItemServiceContext> options) : DbContext(options)
    {
        public DbSet<Book> Books { get; set; } = null!;
        public DbSet<Series> Series { get; set; } = null!;
    }
}
