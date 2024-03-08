import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to handle selection
  const handleSelect = (event, newValue) => {
    setSelectedOption(newValue);
  };

  // Function to clear the input field
  const clearInput = () => {
    setInputValue('');
    setSelectedOption(null); // Clear selection if needed
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={suggestions}
      getOptionLabel={(option) => option.title || ''}
      value={selectedOption}
      onChange={handleSelect}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          InputLabelProps={{
            style: { top: '-3px' },
          }}
          InputProps={{
            ...params.InputProps,
            style: { padding: '3px 8px', borderRadius: '16px', boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", },
            endAdornment: (
              <>
                {inputValue && (
                  <ClearIcon
                    onClick={() => {
                      setInputValue('');
                    }}
                    sx={{ cursor: 'pointer'}}
                  />
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBar;
