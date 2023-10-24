import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSingleUserByAdmin, getAllUsersByAdmin } from "./userSlice";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Link,
  // Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import UserFavoritePosts from "./UserFavoritePosts";

// import UserTable from "./UserTable";

function UserControlByAdmin() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const [open, setOpen] = useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleDeleteUser = () => {
  //   dispatch(deleteSingleUserByAdmin(user._id));
  //   setOpen(false);
  // };

  useEffect(() => {
    dispatch(getAllUsersByAdmin({ page: page + 1, limit: rowsPerPage }));
  }, [page, rowsPerPage, dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Trang Quản lý người dùng
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="column" alignItems="center">
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {user.count > 1
                ? `Có ${user.count} Users được tìm thấy`
                : user.count === 1
                ? `Có 1 User được tìm thấy`
                : "Không tìm thấy User nào"}
            </Typography>

            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon": {
                  display: { xs: "none", md: "block" },
                },
              }}
              component="div"
              count={user.count ? user.count : 0}
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
                      width: { xs: "none", sm: "20%", fontWeight: "bold" },
                    }}
                  >
                    Tên người dùng
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", sm: "7%" },
                      fontWeight: "bold",
                    }}
                  >
                    Vai trò
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", md: "table-cell" },
                      fontWeight: "bold",
                    }}
                  >
                    Số điện thoại
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", md: "table-cell" },
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", sm: "25%" },
                      fontWeight: "bold",
                    }}
                  >
                    Đang quan tâm
                  </TableCell>
                  <TableCell
                    sx={{
                      width: { xs: "none", md: "table-cell" },
                      fontWeight: "bold",
                    }}
                  >
                    Xóa người dùng
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.users?.map((user) => {
                  return (
                    <TableRow key={user._id} hover>
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          alt={user.name}
                          src={user.avatar}
                          sx={{ mr: 2 }}
                        />
                        <Link
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                          component={RouterLink}
                          to={`/users/${user._id}`}
                        >
                          {user.name}
                        </Link>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {user.role}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {user.phoneNumber}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {user.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        <UserFavoritePosts user={user} />
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
                          onClick={() =>
                            dispatch(deleteSingleUserByAdmin(user._id))
                          }
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

export default UserControlByAdmin;
