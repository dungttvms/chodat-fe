import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "./postSlice";
import {
  Box,
  Card,
  Container,
  Stack,
  TablePagination,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Link,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function PostControlByAdmin() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { posts, totalPosts } = useSelector((state) => state.post);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getAllPosts({ page: page + 1, limit: rowsPerPage }));
  }, [page, rowsPerPage, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Trang Quản lý Bài đăng
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="column" alignItems="center">
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalPosts > 1
                ? `Có ${totalPosts} Bất động sản được tìm thấy`
                : totalPosts === 1
                ? `Có 1 Bất động sản được tìm thấy`
                : "Không tìm thấy Bất động sản nào"}
            </Typography>
            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon": {
                  display: { xs: "none", md: "block" },
                },
              }}
              component="div"
              count={totalPosts ? totalPosts : 0}
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
                    }}
                  >
                    Tiêu đề bài viết
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", md: "10%" },
                      fontWeight: "bold",
                    }}
                  >
                    Tỉnh
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", md: "10%" },
                      fontWeight: "bold",
                    }}
                  >
                    Diện tích
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", md: "10%" },
                      fontWeight: "bold",
                    }}
                  >
                    Pháp lý
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", md: "10%" },
                      fontWeight: "bold",
                    }}
                  >
                    Giá
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", md: "10%" },
                      fontWeight: "bold",
                    }}
                  >
                    Lượt xem
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", md: "10%" },
                      fontWeight: "bold",
                    }}
                  >
                    Xóa bài viết
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts?.map((post) => {
                  return (
                    <TableRow key={post._id} hover>
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Link
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                          component={RouterLink}
                          to={`/posts/${post._id}`}
                        >
                          {post.title}
                        </Link>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {post.province}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {post.acreage} m2
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {post.legal}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {post.price}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          display: {
                            xs: "none",
                            md: "table-cell",
                          },
                        }}
                      >
                        {post.viewsCount}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          sx={{ fontSize: "0.6rem" }}
                          size="small"
                          variant="contained"
                          onClick={() => dispatch(deletePost(post._id))}
                        >
                          XÓA
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </Container>
  );
}

export default PostControlByAdmin;
