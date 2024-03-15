namespace ItemService.Models
{
    public class Series
    {
        public ulong Id { get; set; }
        public string? DisplayName { get; set; }
        public ICollection<Book> Books { get; } = [];
        public string[] Authors { get; set; } = null!;
    }
}
