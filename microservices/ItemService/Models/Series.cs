namespace ItemService.Models
{
    public class Series
    {
        public long Id { get; set; }
        public string? DisplayName { get; set; }
        public Book[] Books { get; set; } = null!;
        public string[] Authors { get; set; } = null!;
    }
}
