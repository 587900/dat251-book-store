import React from 'react';
import { Box, Chip, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Filters = ({ selectedFilters, clearFilter, sortBy, setSortBy }) => {
  const handleDelete = (filterCategory, item) => () => {
    clearFilter(filterCategory, item);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 2 }}>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {Object.keys(selectedFilters).map(
          (filterCategory) =>
            selectedFilters[filterCategory].map((item) => (
              <Chip
                key={item}
                label={item}
                onDelete={handleDelete(filterCategory, item)}
                deleteIcon={<ClearIcon />}
                color="secondary"
                variant="outlined"
              />
            ))
        )}
      </Box>
      <Box>
        <FormControl variant="outlined" size="small">
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            onChange={handleSortChange}
            label="Sort by"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="featured">Featured</MenuItem>
            <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
            <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
            <MenuItem value="newArrivals">New Arrivals</MenuItem>
            {/* Add more sorting options as needed */}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Filters;
