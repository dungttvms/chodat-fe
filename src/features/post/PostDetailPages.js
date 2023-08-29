import { Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import PostDetailImage from "./PostDetailImage";
import PostDetailInfo from "./PostDetailInfo";
import PostDetailDescription from "./PostDetailDescription";
import PostDetailAnotherInfo from "./PostDetailAnotherInfo";
import UserOwner from "../user/UserOwner";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "./postSlice";

function DetailPages() {
  const { postId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSinglePost({ postId }));
  });
  const post = useSelector((state) => state.post.singlePost);

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
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <UserOwner />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default DetailPages;
