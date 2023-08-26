import { Grid, Stack } from "@mui/material";
import React from "react";
import PostDetailImage from "../features/post/PostDetailImage";
import PostDetailInfo from "../features/post/PostDetailInfo";
import PostDetailDescription from "../features/post/PostDetailDescription";
import PostDetailAnotherInfo from "../features/post/PostDetailAnotherInfo";
import UserOwner from "../features/user/UserOwner";

function DetailPages({ post }) {
  console.log(post);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <PostDetailImage post={post} />
            <PostDetailInfo post={post} />
            <PostDetailDescription post={post} />
            <PostDetailAnotherInfo post={post} />
          </Stack>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <UserOwner />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default DetailPages;
