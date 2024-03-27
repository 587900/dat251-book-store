import React from 'react';
import { Box, Chip, Select, MenuItem, FormControl, InputLabel, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const Filters = ({ selectedFilters, clearFilter }) => {
  const theme = useTheme();
  // Assuming clearFilter function is adjusted to handle both array and boolean type filters
  const handleDelete = (filterCategory, item) => () => {
    clearFilter(filterCategory, item);
  };

  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        mt: 2,
        mb: 2,
        mr: 2,
        [theme.breakpoints.down("sm")]: {
          mx: 3,
        },
      }}
    >
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {Object.keys(selectedFilters).map((filterCategory) =>
          selectedFilters[filterCategory].length > 0
            ? selectedFilters[filterCategory].map((item) => (
                <Chip
                  key={`${filterCategory}-${item}`}
                  label={item}
                  onDelete={handleDelete(filterCategory, item)}
                  deleteIcon={<ClearIcon />}
                  color="secondary"
                  variant="outlined"
                  sx={{ mr:1}}
                />
              ))
            : null
        )}
      </Box>
    </Box>
  );
};

export default Filters;
