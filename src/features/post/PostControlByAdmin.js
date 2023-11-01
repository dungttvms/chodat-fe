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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function PostControlByAdmin() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { posts, totalPosts } = useSelector((state) => state.post);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getAllPosts({ page, limit: rowsPerPage }));
  }, [page, rowsPerPage, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Trang Quản lý Bài đăng
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="column" alignItems="center">
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
                      width: { xs: "none", sm: "25%" },
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
                      Tỉnh
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
                      Diện tích
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
                      Hiện trạng
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
                      Giá
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
                  )}

                  {!isMobile && (
                    <TableCell
                      sx={{
                        width: { xs: "none", md: "10%" },
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Chỉnh sửa
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(posts) ? (
                  posts.map((post) => (
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
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          {post.province}
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          {post.acreage} m2
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          {post.status}
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          {post.price}
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell
                          align="center"
                          sx={{
                            display: {
                              xs: "none",
                              md: "table-cell",
                            },
                          }}
                        >
                          {post.viewsCount}
                        </TableCell>
                      )}
                      <TableCell
                        align="center"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            sx={{ fontSize: "0.6rem" }}
                            size="small"
                            variant="contained"
                            onClick={() =>
                              navigate(`/admin/editPost/${post._id}`)
                            }
                          >
                            SỬA
                          </Button>
                          <Button
                            sx={{ fontSize: "0.6rem", marginLeft: 2 }}
                            size="small"
                            variant="contained"
                            onClick={() => dispatch(deletePost(post._id))}
                          >
                            XÓA
                          </Button>
                        </div>
                      </TableCell>
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

export default PostControlByAdmin;
