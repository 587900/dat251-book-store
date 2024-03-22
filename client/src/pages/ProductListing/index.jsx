import React, { useState, useEffect } from 'react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import ProductCard from '../../components/ProductCard';
import { books } from '../../utils/books';

const ProductListing = () => {
  const [allBooks, setAllBooks] = useState(books); 
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [filters, setFilters] = useState({
    language: '',
    genre: '',
    format: '',
    priceRange: [0, 200],
    isAvailable: false, // You may want to define what "available" means in your context.
  });
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let updatedBooks = allBooks;

    if (filters.language) {
      updatedBooks = updatedBooks.filter(book => book.language === filters.language);
    }

    if (filters.genre) {
      updatedBooks = updatedBooks.filter(book => book.category === filters.genre);
    }

    if (filters.format) {
      updatedBooks = updatedBooks.filter(book => book.cover === filters.format);
    }

    if (filters.priceRange) {
      updatedBooks = updatedBooks.filter(book => book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1]);
    }

    // Assuming "isAvailable" means the book has not been purchased by a user
    if (filters.isAvailable) {
      updatedBooks = updatedBooks.filter(book => !book.user);
    }

    // Implement sorting if needed using the 'sortBy' state.

    setFilteredBooks(updatedBooks);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Sidebar handleFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {currentBooks.length > 0 ? currentBooks.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.isbn}>
                <ProductCard {...book} />
              </Grid>
            )) : <Typography sx={{ mx: 2 }}>No books to display based on filters.</Typography>}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={Math.ceil(filteredBooks.length / booksPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductListing;
