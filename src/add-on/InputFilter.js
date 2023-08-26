import { Box, Container, Grid, MenuItem, Select, Stack } from "@mui/material";
import React from "react";
import SearchInput from "../components/SearchInput";

function InputFilter() {
  return (
    <Container>
      <Box
        sx={{
          borderRadius: "5px",
          height: 120,
          spacing: 2,
          backgroundColor: "primary.light",
          "&:hover": {
            backgroundColor: "primary.lighter",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Stack direction="row">
          <Grid item xs={3} sx={{ flexGrow: 1 }}>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value="type"
              label="Chọn"
            >
              <MenuItem value="Loại hình bất động sản">
                Loại bất động sản
              </MenuItem>
              <MenuItem color="black" value="house">
                Nhà đất
              </MenuItem>
              <MenuItem value="land">Đất thổ cư</MenuItem>
              <MenuItem value="farm">Đất nông nghiệp</MenuItem>
              <MenuItem value="rent">Nhà đất cho thuê</MenuItem>
            </Select>
          </Grid>
          <Grid></Grid>
          <Grid>
            <SearchInput />
          </Grid>
        </Stack>
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Grid item xs={3}>
            Location
          </Grid>
          <Grid item xs={4}>
            Price Rank
          </Grid>
          <Grid item xs={3}>
            Dien tich
          </Grid>
          <Grid item xs={2}>
            Reset Button
          </Grid>
        </Stack>
      </Box>
    </Container>
  );
}

export default InputFilter;
