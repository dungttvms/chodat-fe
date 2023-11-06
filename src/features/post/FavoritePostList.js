import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { getFavoritePosts } from "./postSlice";
import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import PostCard from "./PostCard";

const FavoritePostList = () => {
  const { user } = useAuth();
  const userId = user?._id;
  const dispatch = useDispatch();
  const { favoritePosts } = useSelector((state) => state.post);

  useEffect(() => {
    if (userId) {
      dispatch(getFavoritePosts({ userId }));
    }
  }, [userId, dispatch]);

  return (
    <Container
      maxWidth={false}
      style={{ padding: 0, marginTop: 1, marginBottom: 5 }}
    >
      <Typography
        variant="h5"
        display="flex"
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        CÁC BÀI ĐĂNG YÊU THÍCH CỦA BẠN
      </Typography>
      <Stack sx={{ m: 3, p: 3 }} display="flex">
        <Grid
          container
          alignItems="center"
          justifyContent="space-around"
          spacing={2}
        ></Grid>

        <Card
          sx={{
            p: 2,
            gap: 2,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            backgroundColor: "transparent",
          }}
        >
          {favoritePosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </Card>
      </Stack>
    </Container>
  );
};

export default FavoritePostList;
