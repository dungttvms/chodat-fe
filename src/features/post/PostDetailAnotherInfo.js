import { Box, Container, Typography } from "@mui/material";

import React from "react";

function PostDetailAnotherInfo({ post }) {
  return (
    <Container>
      <Box>
        <Typography>post.address</Typography>
        <Typography>post.district</Typography>
      </Box>
    </Container>
  );
}

export default PostDetailAnotherInfo;
