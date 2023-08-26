import { Box, Container, IconButton } from "@mui/material";
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

function CustomChatBot() {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };
  const steps = [
    {
      id: "Begin",
      message: "Chào mừng bạn đến với Chợ đất Gia Lai",
      trigger: "Require name",
    },
    {
      id: "Require name",
      message: "Vui lòng nhập tên của bạn!",
      trigger: "waiting1",
    },
    {
      id: "waiting1",
      user: true,
      trigger: "NameMessage",
    },
    {
      id: "NameMessage",
      message:
        "Chào {previousValue}, Bạn cần chúng tôi hỗ trợ bạn BÁN hay MUA bất động sản",
      trigger: "issues",
    },
    {
      id: "issues",
      options: [
        { value: "sell", label: "Tôi Cần BÁN", trigger: "sell" },
        { value: "buy", label: "Tôi Cần MUA", trigger: "buy" },
      ],
    },
    {
      id: "sell",
      message:
        "Cảm ơn bạn, bạn vui lòng liên hệ 0372.75.7777 để chúng tôi hỗ trợ bạn đăng tin BÁN bất động sản nhé",
      end: true,
    },
    {
      id: "buy",
      message:
        "Cảm ơn bạn, bạn vui lòng liên hệ 0372.75.7777 để chúng tôi hỗ trợ bạn TÌM KIẾM bất động sản theo yêu cầu nhé",
      end: true,
    },
  ];

  return (
    <Container>
      <Box onClick={toggleChatbot}>
        <ChatIcon />
      </Box>
      {showChatbot && (
        <Box
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ChatBot steps={steps} />
          <IconButton
            sx={{
              top: "-10px",
              right: "-10px",
              color: "gray",
              bgcolor: "white",
              zIndex: 1001,
            }}
            onClick={closeChatbot}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Container>
  );
}

export default CustomChatBot;
