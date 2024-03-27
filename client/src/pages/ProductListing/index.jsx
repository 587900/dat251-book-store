import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  Pagination,
  Typography,
  useTheme,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import ProductCard from "../../components/ProductCard";
import Filters from "../../components/Filters";
import { books } from "../../utils/books";

const ProductListing = () => {
  const theme = useTheme();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [allBooks, setAllBooks] = useState(books);
  const [sortBy, setSortBy] = useState("featured");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [filters, setFilters] = useState({
    language: "",
    genre: "",
    format: "",
    priceRange: [0, 100],
    isAvailable: false, // You may want to define what "available" means in your context.
  });
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const getSelectedFilterArray = (filterObject) => {
    return Object.entries(filterObject)
      .filter(([key, value]) => value)
      .map(([key]) => key);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const applyFilters = useCallback(() => {
    let updatedBooks = allBooks;

    // Filter by languages
    const selectedLanguages = Object.entries(filters.language)
      .filter(([language, isChecked]) => isChecked)
      .map(([language]) => language);
    if (selectedLanguages.length) {
      updatedBooks = updatedBooks.filter((book) =>
        selectedLanguages.includes(book.language)
      );
    }

    // Filter by genres
    const selectedGenres = Object.entries(filters.genre)
      .filter(([genre, isChecked]) => isChecked)
      .map(([genre]) => genre);
    if (selectedGenres.length) {
      updatedBooks = updatedBooks.filter((book) =>
        selectedGenres.includes(book.category)
      );
    }

    // Filter by formats
    const selectedFormats = Object.entries(filters.format)
      .filter(([format, isChecked]) => isChecked)
      .map(([format]) => format);
    if (selectedFormats.length) {
      updatedBooks = updatedBooks.filter((book) =>
        selectedFormats.includes(book.cover)
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      updatedBooks = updatedBooks.filter(
        (book) =>
          book.price >= filters.priceRange[0] &&
          book.price <= filters.priceRange[1]
      );
    }

    // Filter by availability
    if (filters.isAvailable) {
      updatedBooks = updatedBooks.filter((book) => !book.user);
    }

    setFilteredBooks(updatedBooks);
  }, [allBooks, filters]);

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  const handleFilterChange = (newFilters) => {
    // Flatten the newFilters if necessary, or use them directly if the parent can handle the structure
    const flattenedFilters = {
      language: newFilters.language,
      genre: newFilters.genre,
      format: newFilters.format,
      priceRange: newFilters.priceRange,
      isAvailable: newFilters.isAvailable,
    };

    setFilters(flattenedFilters);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const clearFilter = (filterCategory, item) => {
    if (typeof filters[filterCategory] === "object") {
      // Assuming multi-select filters are objects with boolean values
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterCategory]: { ...prevFilters[filterCategory], [item]: false },
      }));
    } else {
      // For boolean filters
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterCategory]: false,
      }));
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const selectedFiltersForChips = {
    language: getSelectedFilterArray(filters.language),
    genre: getSelectedFilterArray(filters.genre),
    format: getSelectedFilterArray(filters.format),
    // Add other filters as needed
  };

  return (
    <Box sx={{ flexGrow: 1, mr: 3 }}>
      <Grid container>
        <Grid item xs={12} md={5} lg={3}>
          <Sidebar
            handleFilterChange={handleFilterChange}
            activeFilters={filters}
            toggleSidebar={toggleSidebar}
            isSidebarVisible={isSidebarVisible}
          />
        </Grid>
        <Grid item xs={12} md={7} lg={9}>
          <Filters
            selectedFilters={selectedFiltersForChips}
            clearFilter={clearFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Button
              variant="contained"
              sx={{
                [theme.breakpoints.down("sm")]: {
                  ml: 3,
                  mb: 2,
                  mt: 0.5,
                },
                display: { sm: "none" },
              }}
              onClick={toggleSidebar}
            >
              Filters
            </Button>
            <Box>
              <FormControl variant="outlined" size="small">
                <InputLabel id="sort-by-label">Sort by</InputLabel>
                <Select
                  labelId="sort-by-label"
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort by"
                  sx={{ minWidth: 100 }}
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                  <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                  <MenuItem value="newArrivals">New Arrivals</MenuItem>
                  {/* Add more sorting options as needed */}
                </Select>
              </FormControl>
            </Box>
          </Stack>
          <Typography
            variant="h3"
            sx={{
              mt: 2,
              mb: 2,
              [theme.breakpoints.down("sm")]: {
                ml: 3,
                mb: 3,
                mt: 1
              },
            }}
          >
            Results
          </Typography>
          <Grid container spacing={2}>
            {currentBooks.length > 0 ? (
              currentBooks.map((book, index) => (
                <Grid item xs={12} sm={12} md={6} lg={3} key={book.isbn}>
                  <ProductCard {...book} />
                </Grid>
              ))
            ) : (
              <Typography
                sx={{
                  mx: 2,
                  [theme.breakpoints.down("sm")]: {
                    mx: 5,
                  },
                }}
              >
                No books to display based on filters.
              </Typography>
            )}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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
