import {
  Box,
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
  Button,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChatBot, getChatBot } from "./userSlice";
import { fDateTimeNoHour } from "../../utils/formatTime";
import LoadingScreen from "../../components/LoadingScreen";

function ChatBotControlByAdmin() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const chatBots = useSelector((state) => state?.user?.chatBot);
  const totalChatBot = useSelector((state) => state?.user?.totalChatBot);
  const chatBotLoading = useSelector((state) => state?.isLoading);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getChatBot());
  }, [page, rowsPerPage, dispatch]);
  if (!chatBotLoading && !chatBots) return <LoadingScreen />;
  if (!chatBotLoading && chatBots)
    return (
      <Container>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Trang Quản lý Chat Bot
        </Typography>
        <Card sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Stack spacing={2} direction="column" alignItems="center">
              <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
                {totalChatBot > 1
                  ? `Có ${totalChatBot} người dùng được tìm thấy`
                  : totalChatBot === 1
                  ? `Có 1 người dùng được tìm thấy`
                  : "Không tìm thấy người dùng nào"}
              </Typography>
              <TablePagination
                sx={{
                  "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon": {
                    display: { xs: "none", md: "block" },
                  },
                }}
                component="div"
                count={totalChatBot ? totalChatBot : 0}
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
                      Tên người dùng
                    </TableCell>
                    {!isMobile && (
                      <TableCell
                        sx={{
                          width: { xs: "none", md: "15%" },
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Số điện thoại
                      </TableCell>
                    )}
                    {!isMobile && (
                      <TableCell
                        sx={{
                          width: { xs: "none", md: "30%" },
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Nhu cầu
                      </TableCell>
                    )}
                    {!isMobile && (
                      <TableCell
                        sx={{
                          width: { xs: "none", md: "15%" },
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Ngày xem
                      </TableCell>
                    )}
                    <TableCell
                      sx={{
                        width: { xs: "none", sm: "10%" },
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Xóa người dùng
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(chatBots) ? (
                    chatBots.map((chatBot) => (
                      <TableRow key={chatBot._id} hover>
                        <TableCell
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {chatBot.username}
                          </Typography>
                        </TableCell>
                        {!isMobile && (
                          <TableCell
                            align="center"
                            sx={{ display: { xs: "none", md: "table-cell" } }}
                          >
                            {chatBot.phoneNumber}
                          </TableCell>
                        )}
                        {!isMobile && (
                          <TableCell
                            align="center"
                            sx={{ display: { xs: "none", md: "table-cell" } }}
                          >
                            {chatBot.province}
                          </TableCell>
                        )}
                        {!isMobile && (
                          <TableCell
                            align="center"
                            sx={{ display: { xs: "none", md: "table-cell" } }}
                          >
                            {fDateTimeNoHour(chatBot.createdAt)}
                          </TableCell>
                        )}
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
                            onClick={() => dispatch(deleteChatBot(chatBot._id))}
                          >
                            XÓA
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography variant="subtitle">
                          Không có dữ liệu Chat Bot
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

export default ChatBotControlByAdmin;
