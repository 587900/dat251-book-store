import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  Stack,
  Divider,
  Drawer,
  useTheme,
  useMediaQuery
} from "@mui/material";

// Utilizing a custom hook for handling debounce
function useDebouncedEffect(effect, deps, delay) {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || []), delay]);
}

const Sidebar = ({
  handleFilterChange,
  activeFilters,
  isSidebarVisible,
  toggleSidebar,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Using an array for dynamic checkbox options
  const languageOptions = ["English", "French", "Spanish"];
  const genreOptions = ["Fiction", "Romance", "Mystery"];
  const formatOptions = ["Hardcover", "Paperback", "e-book"];

  // Dynamic state initialization
  const initialState = {
    language: languageOptions.reduce((o, key) => ({ ...o, [key]: false }), {}),
    genre: genreOptions.reduce((o, key) => ({ ...o, [key]: false }), {}),
    format: formatOptions.reduce((o, key) => ({ ...o, [key]: false }), {}),
    priceRange: [0, 200],
    isAvailable: false,
  };

  const [filters, setFilters] = useState(initialState);

  useDebouncedEffect(
    () => {
      handleFilterChange(filters);
    },
    [filters],
    300
  );

  useEffect(() => {
    // Update local state to match the active filters
    setFilters((prevFilters) => ({
      ...prevFilters,
      language: { ...prevFilters.language, ...activeFilters.language },
      genre: { ...prevFilters.genre, ...activeFilters.genre },
      format: { ...prevFilters.format, ...activeFilters.format },
      isAvailable: activeFilters.isAvailable,
      priceRange: activeFilters.priceRange,
    }));
  }, [activeFilters]);

  const handleCheckboxChange = (category, option) => (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [option]: event.target.checked,
      },
    }));
  };

  const handleFieldChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const resetFilters = () => {
    setFilters(initialState);
  };

  const renderCheckboxes = (category, options) => (
    <Stack>
      <Typography
        variant="h6"
        sx={{ textTransform: "capitalize", fontWeight: "bold" }}
      >
        {category}
      </Typography>
      {options.map((option) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={filters[category][option]}
              onChange={handleCheckboxChange(category, option)}
              name={`${category}.${option}`}
            />
          }
          label={option}
          key={option}
        />
      ))}
      <Divider sx={{ my: 2 }} />
    </Stack>
  );

  const sidebarContent = (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          width: "250px",
          position: "sticky",
          top: 8,
          height: "fit-content",
          ml: 1,
        }}
      >
        {renderCheckboxes("language", languageOptions)}
        {renderCheckboxes("genre", genreOptions)}
        {renderCheckboxes("format", formatOptions)}

        {/* Price Range Input Fields */}

        <Stack direction="row" sx={{ mb: 3 }}>
          <TextField
            variant="standard"
            type="number"
            label="Min Price"
            value={filters.priceRange[0]}
            onChange={(e) =>
              handleFieldChange("priceRange", [
                e.target.value,
                filters.priceRange[1],
              ])
            }
            inputProps={{
              step: 1,
              min: 0,
              max: 10000000,
              type: "number",
            }}
            sx={{ mr: 2 }}
          />
          <Typography variant="subtitle2" sx={{ my: "auto" }}>
            to
          </Typography>
          <TextField
            variant="standard"
            type="number"
            label="Max Price"
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFieldChange("priceRange", [
                filters.priceRange[0],
                e.target.value,
              ])
            }
            inputProps={{
              step: 1,
              min: 0,
              max: 10000000,
              type: "number",
            }}
            sx={{ ml: 2 }}
          />
        </Stack>

        <FormControlLabel
          control={
            <Checkbox
              checked={filters.isAvailable}
              onChange={(e) =>
                handleFieldChange("isAvailable", e.target.checked)
              }
              name="availability"
            />
          }
          label="Available Only"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={filters.isNew}
              onChange={(e) => handleFieldChange("isNew", e.target.checked)}
              name="isNew"
              size="medium"
            />
          }
          label="New Only"
        />

        <Typography
          variant="button"
          onClick={resetFilters}
          sx={{ cursor: "pointer", mt: 2 }}
        >
          Reset Filters
        </Typography>
      </Box>
  );

  return isMobile ? (
    <Drawer
      anchor="right"
      open={isSidebarVisible}
      onClose={toggleSidebar}
      variant={isMobile ? "temporary" : "permanent"}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", sm: "none" }, // hides the sidebar on mobile when not active
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 300 },
      }}
    >
      {sidebarContent}
    </Drawer>
  ) : (
    <>{sidebarContent}</>
  );
};

export default Sidebar;
