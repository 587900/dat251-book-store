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
            var item = await _context.Books.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // GET: store/isbn/5
        [HttpGet("isbn/{id}")]
        public async Task<ActionResult<Book>> GetByISBN(ulong isbn)
        {
            var item = _context.Books.First(b => b.ISBN == isbn);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // PUT: store/items/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(ulong id, Book item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

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
        public async Task<ActionResult<Book>> PostItem(Book b)
        {
            _context.Books.Add(b);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetItem), new { id = b.Id }, b);
        }

        // DELETE: store/items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(long id)
        {
            var item = await _context.Books.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Books.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(ulong id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}
