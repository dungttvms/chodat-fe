import { Container, Typography } from "@mui/material";
import React from "react";

function PostDetailInfo({ post }) {
  return (
    <Container>
      <Typography variant="h4"> {post.title}</Typography>
    </Container>
  );
}

export default PostDetailInfo;
