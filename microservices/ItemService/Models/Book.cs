namespace ItemService.Models
{
    public class Book
    {
        public ulong Id { get; set; }
        public ulong ISBN { get; set; }
        public string Author { get; set; } = null!;
        public string Title { get; set; } = null!;
        public Series? Series { get; set; }

    }
}
