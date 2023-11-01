import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFilterBlogs } from "./blogSlice";
import {
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import BlogCard from "./BlogCard";

function BlogFilteredList() {
  const [page, setPage] = useState(1);
  const params = useParams();
  const type = params.type;

  const { filteredBlogs, totalBlogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilterBlogs({ page, type }));
  }, [dispatch, page, type]);

  const totalPages = totalBlogs ? Math.ceil(totalBlogs / 10) : 1;

  const handlePageChange = (e, page) => {
    setPage(page);
  };

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
        CÓ {totalBlogs} BÀI VIẾT VỀ {type.toLocaleUpperCase()} ĐƯỢC TÌM THẤY
      </Typography>
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
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
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

export default BlogFilteredList;
