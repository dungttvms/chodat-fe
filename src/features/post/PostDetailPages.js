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
import LoadingScreen from "../../components/LoadingScreen";

function DetailPages() {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const post = useSelector((state) => state.post.singlePost);
  const postLoading = useSelector((state) => state.post.isLoading);

  useEffect(() => {
    dispatch(getSinglePost({ postId }));
  }, [dispatch, postId]);

  if (!postLoading && !post) return <LoadingScreen />;

  if (!postLoading && post)
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

  if (postLoading && !post) return <div>loading...</div>;
}

export default DetailPages;
