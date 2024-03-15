using Microsoft.EntityFrameworkCore;

namespace ItemService.Models
{
    public class BookContext(DbContextOptions<BookContext> options) : DbContext(options)
    {
        public DbSet<Book> Books { get; set; } = null!;
    }
}
