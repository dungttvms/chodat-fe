import React, { useEffect, useState, useMemo } from "react";
import PostCard from "./PostCard";
import { Box, Card, Container, Grid, Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "./postSlice";
import { NUMBER_POSTS_OF_LIMIT } from "../../app/config";

const PostList = () => {
  const [page, setPage] = useState(1);
  const { posts, totalPosts } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts({ page }));
  }, [dispatch, page]);

  const totalPages = useMemo(() => {
    return totalPosts ? Math.ceil(totalPosts / NUMBER_POSTS_OF_LIMIT) : 1;
  }, [totalPosts]);

  const handlePageChange = (e, page) => {
    setPage(page);
  };

  return (
    <Container
      maxWidth={false}
      style={{ padding: 0, marginTop: 1, marginBottom: 5 }}
    >
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
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </Card>
        <Box display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{
              color: "#FFFFFF",
              "& .MuiPaginationItem-root": {
                color: "#FFFFFF",
              },
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default PostList;
