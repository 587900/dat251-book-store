using Microsoft.EntityFrameworkCore;

namespace ItemService.Models
{
    public class SeriesContext(DbContextOptions<SeriesContext> options) : DbContext(options)
    {
        public DbSet<Series> Series { get; set; } = null!;
    }
}
