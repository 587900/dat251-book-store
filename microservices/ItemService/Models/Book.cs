namespace ItemService.Models
{
    public abstract class Book
    {
        public ulong Id { get; set; }
        public ulong ISBN { get; set; }
        public string Author { get; set; } = null!;
        public string Title { get; set; } = null!;
        public ulong? SeriesId { get; set; }
        public Series? Series { get; set; }
    }

    public class PhysicalBook : Book
    {
        public uint GWeight { get; set; }
        public ushort MMHeight { get; set; }
        public ushort MMWidth { get; set; }
    }

    public class EBook : Book
    {
        public ulong Bytes { get; set; }
    }

    public enum BookType
    {
        PhysicalBook, EBook
    }
}
