using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ItemService.Models;

namespace ItemService.Controllers
{
    [Route("store")]
    [ApiController]
    public class BooksController(BookContext context) : ControllerBase
    {
        private readonly BookContext _context = context;

        // GET: store/items
        [HttpGet("items")]
        public async Task<ActionResult<IEnumerable<Book>>> GetItems()
        {
            return await _context.Books.ToListAsync();
        }

        // GET: store/items/5
        [HttpGet("items/{id}")]
        public async Task<ActionResult<Book>> GetItem(ulong id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // GET: store/isbn/5
        [HttpGet("isbn/{id}")]
        public async Task<ActionResult<Book>> GetByISBN(ulong isbn)
        {
            var book = _context.Books.First(b => b.ISBN == isbn);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // PUT: store/items/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(ulong id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: store/items
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostItem(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetItem), new { id = book.Id }, book);
        }

        // DELETE: store/items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(long id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(ulong id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}
