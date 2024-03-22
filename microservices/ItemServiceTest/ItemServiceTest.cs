using ItemService.Controllers;
using ItemService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ItemServiceTest
{
    [TestClass]
    public class ItemServiceTest
    {
        static ItemServiceController bc = null!;
        static readonly Book testBook = new PhysicalBook()
        {
            Title = "Test",
            Author = "A",
            ISBN = 123
        };

        [ClassInitialize]
        public static void Init(TestContext tc)
        {
            DbContextOptionsBuilder<ItemServiceContext> dbcob = new();
            dbcob.UseInMemoryDatabase("Books");
            bc = new(new(dbcob.Options));
            bc.PostItem(testBook.Id, testBook).Wait();
        }

        [TestMethod]
        public void GetItems()
        {
            ActionResult<IEnumerable<Book>> ar = bc.GetItems().Result;
            Assert.IsNotNull(ar.Value);
            Assert.AreEqual(1, ar.Value.Count());
        }

        [TestMethod]
        public void GetItemOk()
        {
            ulong id = testBook.Id;
            ActionResult<Book> ar = bc.GetItem(id).Result;
            Assert.IsNotNull(ar.Value);
            Assert.AreEqual(id, ar.Value.Id);
        }

        [TestMethod]
        public void GetItemNotFound()
        {
            ulong id = GenUniqueId();
            ActionResult<Book> ar = bc.GetItem(id).Result;
            Assert.IsInstanceOfType<NotFoundResult>(ar.Result);
        }

        [TestMethod]
        public void GetItemByISBNOk()
        {
            ActionResult<Book> ar = bc.GetItemByISBN(testBook.ISBN).Result;
            Assert.IsNotNull(ar.Value);
            Assert.AreEqual(testBook.Id, ar.Value.Id);
        }

        [TestMethod]
        public void GetItemByISBNNotFound()
        {
            ulong isbn = GenUniqueId(b => b.ISBN);
            ActionResult<Book> ar = bc.GetItemByISBN(isbn).Result;
            Assert.IsInstanceOfType<NotFoundResult>(ar.Result);
        }

        [TestMethod]
        public void PostItemOk()
        {
            Book b = new EBook()
            {
                Title = "PostOkTest",
                Author = "B"
            };
            bc.PostItem(b.Id, b).Wait();
            ActionResult<Book> ar = bc.GetItem(b.Id).Result;
            Assert.IsNotNull(ar.Value);
            Assert.AreEqual(b.Id, ar.Value.Id);
            bc.DeleteItem(b.Id).Wait();
        }

        [TestMethod]
        public void PostItemConflict()
        {
            Book b = new PhysicalBook()
            {
                Title = "PostConflictTest",
                Author = "C"
            };
            IActionResult iar = bc.PostItem(testBook.Id, b).Result;
            Assert.IsInstanceOfType<ConflictResult>(iar);
            bc.DeleteItem(b.Id).Wait();
        }

        [TestMethod]
        public void PutItemOk()
        {
            Book b = new EBook()
            {
                Title = "PutOkTest",
                Author = "D"
            };
            Book old = new PhysicalBook()
            {
                Title = "Test",
                Author = "A"
            };
            bc.PutItem(testBook.Id, b).Wait();
            ActionResult<Book> ar = bc.GetItem(testBook.Id).Result;
            Assert.IsNotNull(ar.Value);
            Assert.AreEqual("D", ar.Value.Author);
            bc.PutItem(testBook.Id, old).Wait();
        }

        [TestMethod]
        public void PutItemNotFound()
        {
            Book b = new EBook()
            {
                Title = "PutNotFoundTest",
                Author = "E"
            };
            Book old = new PhysicalBook()
            {
                Title = "Test",
                Author = "A"
            };
            IActionResult iar = bc.PutItem(testBook.Id, b).Result;
            Assert.IsInstanceOfType<NotFoundResult>(iar);
            bc.PutItem(testBook.Id, old).Wait();
        }

        [TestMethod]
        public void DeleteItemOk()
        {
            bc.DeleteItem(testBook.Id).Wait();
            ActionResult<Book> ar = bc.GetItem(testBook.Id).Result;
            Assert.IsInstanceOfType<NotFoundResult>(ar.Result);
            bc.PostItem(testBook.Id, testBook).Wait();
        }

        [TestMethod]
        public void DeleteItemNotFound()
        {
            IActionResult iar = bc.DeleteItem(GenUniqueId()).Result;
            Assert.IsInstanceOfType<NotFoundResult>(iar);
        }

        private static ulong GenUniqueId() => GenUniqueId(b => b.Id);
        private static ulong GenUniqueId(Func<Book, ulong> getId)
        {
            ulong id = 1;
            IEnumerable<Book> books = bc.GetItems().Result.Value!;
            while (books.Any(b => getId(b) == id))
                id++;
            return id;
        }
    }
}