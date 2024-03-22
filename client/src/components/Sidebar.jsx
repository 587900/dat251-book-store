import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

// Utilizing a custom hook for handling debounce
function useDebouncedEffect(effect, deps, delay) {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);

    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps || [], delay]);
}

const Sidebar = ({ handleFilterChange }) => {
  const [filters, setFilters] = useState({
    language: '',
    genre: '',
    format: '',
    priceRange: [0, 200],
    isAvailable: false,
  });

  useDebouncedEffect(() => {
    handleFilterChange(filters);
  }, [filters], 300);

  const handleFieldChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      language: '',
      genre: '',
      format: '',
      priceRange: [0, 200],
      isAvailable: false,
    });
  };

  const languageOptions = ['English', 'French', 'Spanish'];
  const genreOptions = ['Fiction', 'Romance', 'Mystery'];
  const formatOptions = ['Hardcover', 'Paperback', 'E-book'];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        width: '300px',
        position: 'sticky',
        top: 8,
        height: 'fit-content',
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Language</InputLabel>
        <Select
          value={filters.language}
          label="Language"
          onChange={(e) => handleFieldChange('language', e.target.value)}
        >
          {languageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={filters.genre}
          label="Genre"
          onChange={(e) => handleFieldChange('genre', e.target.value)}
        >
          {genreOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Format</InputLabel>
        <Select
          value={filters.format}
          label="Format"
          onChange={(e) => handleFieldChange('format', e.target.value)}
        >
          {formatOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Range Input Fields */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Min Price"
          type="number"
          variant="outlined"
          value={filters.priceRange[0]}
          onChange={(e) => handleFieldChange('priceRange', [e.target.value, filters.priceRange[1]])}
          sx={{ width: '50%', mr: 1 }}
        />
        <TextField
          label="Max Price"
          type="number"
          variant="outlined"
          value={filters.priceRange[1]}
          onChange={(e) => handleFieldChange('priceRange', [filters.priceRange[0], e.target.value])}
          sx={{ width: '50%', ml: 1 }}
        />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={filters.isAvailable}
            onChange={(e) => handleFieldChange('isAvailable', e.target.checked)}
            name="availability"
          />
        }
        label="Available Only"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={filters.isNew}
            onChange={(e) => handleFieldChange('isNew', e.target.checked)}
            name="isNew"
          />
        }
        label="New Only"
      />

      <Typography variant="button" onClick={resetFilters} sx={{ cursor: 'pointer', mt: 2 }}>
        Reset Filters
      </Typography>
    </Box>
  );
};

export default Sidebar;
