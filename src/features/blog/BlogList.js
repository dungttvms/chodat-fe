import { Card, Container, Grid, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import BlogCard from "./BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "./blogSlice";
import { NUMBER_BLOGS_OF_LIMIT } from "../../app/config";

function BlogList() {
  const [page, setPage] = useState(1);
  const { blogs, totalBlogs } = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  const totalPages = useMemo(
    () => (totalBlogs ? Math.ceil(totalBlogs / NUMBER_BLOGS_OF_LIMIT) : 1),
    [totalBlogs]
  );

  const handlePageChange = useCallback((e, page) => {
    setPage(page);
  }, []);

  useEffect(() => {
    dispatch(getAllBlogs({ page }));
  }, [dispatch, page]);

  const blogCards = useMemo(() => {
    return blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />);
  }, [blogs]);

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
        >
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
        </Grid>

        <Card
          sx={{
            p: 2,
            gap: 2,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            backgroundColor: "transparent",
          }}
        >
          {blogCards}
        </Card>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "#FFFFFF",
            "& .MuiPaginationItem-root": {
              color: "#FFFFFF",
            },
          }}
        />
      </Stack>
    </Container>
  );
}

export default BlogList;
