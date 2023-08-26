import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput({ handleSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={searchQuery}
        placeholder="Tìm kiếm nhà đất của bạn ..."
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{
          width: 700,
          background: "none",
          borderColor: "primary.main",
          "&:hover": {
            borderColor: "primary.main",
            "& fieldset": {
              borderColor: "primary.main",
            },
          },
          "& fieldset": {
            borderColor: "primary.main",
          },
          "& input::placeholder": {
            color: "primary.main",
          },
        }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                aria-label="Search here..."
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchInput;
