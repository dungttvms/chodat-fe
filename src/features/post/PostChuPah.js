import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import {
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./postSlice";
import { NUMBER_POSTS_OF_LIMIT } from "../../app/config";
import { Helmet } from "react-helmet";

const PostChuPah = () => {
  const [page, setPage] = useState(1);
  const { posts } = useSelector((state) => state.post);
  console.log(posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts({ page }));
  }, [dispatch, page]);

  const filteredPosts = posts.filter((post) => post.district === "chupah");
  console.log(filteredPosts);
  const totalChuPahPosts = filteredPosts.length;

  const totalPages = Math.ceil(totalChuPahPosts / NUMBER_POSTS_OF_LIMIT);
  const startIndex = (page - 1) * NUMBER_POSTS_OF_LIMIT;
  const endIndex = startIndex + NUMBER_POSTS_OF_LIMIT;
  const handlePageChange = (e, page) => {
    setPage(page);
  };

  return (
    <Container
      maxWidth={false}
      style={{ padding: 0, marginTop: 1, marginBottom: 5 }}
    >
      <Helmet>Chợ đất Chư Păh</Helmet>
      <Stack sx={{ m: 3, p: 3 }} display="flex">
        <Grid
          container
          alignItems="center"
          justifyContent="space-around"
          spacing={2}
        >
          <Typography fontWeight="bold" fontSize="36px" color="#ffffff">
            BẤT ĐỘNG SẢN HUYỆN CHƯ PĂH
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{
              color: "#123456",
              "& .MuiPaginationItem-root": {
                color: "#123456",
              },
            }}
          />
        </Grid>

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
          {filteredPosts.length > 0 ? (
            filteredPosts
              .slice(startIndex, endIndex)
              .map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <Typography>Sorry, Not found any post in this district</Typography>
          )}
        </Card>
      </Stack>
    </Container>
  );
};

export default PostChuPah;
