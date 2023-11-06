import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { deleteSingleBlog, getAllBlogs } from "./blogSlice";

function BlogControlByAdmin() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const { blogs, totalBlogs } = useSelector((state) => state.blog);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    dispatch(getAllBlogs({ page: page + 1, limit: rowsPerPage }));
  }, [page, rowsPerPage, dispatch]);

  const formattedTotalBlogs = useMemo(() => {
    if (totalBlogs > 1) {
      return `Có ${totalBlogs} Bài viết được tìm thấy`;
    } else if (totalBlogs === 1) {
      return `Có 1 Bài viết được tìm thấy`;
    } else {
      return "Không tìm thấy Bài viết nào";
    }
  }, [totalBlogs]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Trang Quản lý Blogs
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="column" alignItems="center">
            <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
              {formattedTotalBlogs}
            </Typography>
            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon": {
                  display: { xs: "none", md: "block" },
                },
              }}
              component="div"
              count={totalBlogs ? totalBlogs : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 15]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </Stack>
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: { xs: "none", sm: "30%" },
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Tiêu đề bài viết
                  </TableCell>
                  {!isMobile && (
                    <TableCell
                      sx={{
                        width: { xs: "none", md: "10%" },
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Thể loại
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell
                      sx={{
                        width: { xs: "none", md: "10%" },
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Lượt xem
                    </TableCell>
                  )}{" "}
                  {!isMobile && (
                    <TableCell
                      sx={{
                        width: { xs: "none", sm: "10%" },
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Xóa bài đăng
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(blogs) ? (
                  blogs?.map((blog) => (
                    <TableRow key={blog._id} hover>
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <RouterLink to={`/blogs/${blog._id}`}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {blog.title.slice(0, 50)}...
                          </Typography>
                        </RouterLink>
                      </TableCell>
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          {blog.type}
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          {blog.readCount}
                        </TableCell>
                      )}{" "}
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            sx={{ fontSize: "0.6rem" }}
                            size="small"
                            variant="contained"
                            onClick={() => dispatch(deleteSingleBlog(blog._id))}
                          >
                            XÓA
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography variant="subtitle">
                        Không có dữ liệu Bài đăng
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </Container>
  );
}

export default BlogControlByAdmin;
