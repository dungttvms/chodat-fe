import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import SearchInput from "../../components/SearchInput";

function PostSearch() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        m: 2,
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: 16,
        }}
      >
        An tâm với 100% bất động sản xác thực tại Chợ đất Gia Lai *
      </Typography>
      <Typography
        sx={{
          color: "white",
          fontSize: 24,
        }}
      >
        Lựa chọn căn nhà ưng ý của bạn
      </Typography>

      <SearchInput />
      <Grid container flexDirection="row" justifyContent="center" sx={{ m: 2 }}>
        <Button variant="outlined" sx={{ borderSpacing: 1, m: 1 }}>
          Chư Păh
        </Button>
        <Button variant="outlined" sx={{ borderSpacing: 1, m: 1 }}>
          Pleiku
        </Button>
        <Button variant="outlined" sx={{ borderSpacing: 1, m: 1 }}>
          An Khê
        </Button>
        <Button variant="outlined" sx={{ borderSpacing: 1, m: 1 }}>
          Đăk Đoa
        </Button>
      </Grid>
      <Typography
        sx={{
          color: "white",
          fontSize: 12,
          fontStyle: "italic",
        }}
      >
        Hiện có postCount nhà đất được xác thực
      </Typography>
    </Box>
  );
}

export default PostSearch;
