import { TextField, Autocomplete } from "@mui/material";

interface AutocompleteOption {
  label: string;
}

const SearchInput = () => {
  const options: AutocompleteOption[] = [];
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
};

export default SearchInput;
