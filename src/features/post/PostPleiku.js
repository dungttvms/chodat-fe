import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Card, Grid, Pagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./postSlice";
import { NUMBER_POSTS_OF_LIMIT } from "../../app/config";
import { Helmet } from "react-helmet";

const PostPleiku = () => {
  const [page, setPage] = useState(1);
  const { posts, totalPosts } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts({ page }));
  }, [dispatch, page]);

  const filteredPosts = posts.filter((post) => post.district === "pleiku");

  const totalPages = Math.ceil(totalPosts / NUMBER_POSTS_OF_LIMIT);

  const handlePageChange = (e, page) => {
    setPage(page);
  };

  return (
    <>
      <Helmet>Chợ đất Pleiku</Helmet>
      <Grid
        sx={{ display: "flex", justifyContent: "space-around", color: "#fff" }}
      >
        <Typography font-weight="bold" font-size="48px">
          BẤT ĐỘNG SẢN THÀNH PHỐ PLEIKU
        </Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{
            color: "#FFFFFF",
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
          filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <Typography>Sorry, Not found any post in this district</Typography>
        )}
      </Card>
    </>
  );
};

export default PostPleiku;
