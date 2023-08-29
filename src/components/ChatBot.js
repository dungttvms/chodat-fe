import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";

import CloseIcon from "@mui/icons-material/Close";

import SupportAgentIcon from "../images/customer-service_870175.png";
import styled, { keyframes } from "styled-components";

const ChatContainer = styled.div`
  position: relative;
`;
const ChatBotAnim = keyframes`
  0% {
    transform: rotate(0) scale(0.7) skew(1deg);
    opacity: 0.6;
  }
  50% {
    transform: rotate(0) scale(1) skew(1deg);
    opacity: 0.6;
  }
  100% {
    transform: rotate(0) scale(0.7) skew(1deg);
    opacity: 0.6;
  }
`;

const ChatBox = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  animation: ${ChatBotAnim}1s infinite ease-in-out;
`;

const ChatIconStyled = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  margin-right: 5px;
  background-color: #d2691e;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${ChatBotAnim} 1s infinite ease-in-out, shake 0.3s infinite;

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
      transform: translateY(0);
    }
    25% {
      transform: translateX(-3px);
      transform: translateY(-3px);
    }
    50% {
      transform: translateX(3px);
      transform: translateY(3px);
    }
    75% {
      transform: translateX(-3px);
      transform: translateY(-3px);
    }
  }
`;

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
      trigger: "begin1",
    },
    {
      id: "begin1",
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
    <ChatContainer>
      <ChatBox onClick={toggleChatbot}>
        <ChatIconStyled>
          <img
            src={SupportAgentIcon}
            alt="Support Agent"
            style={{ height: "60px", width: "60px" }}
          />
        </ChatIconStyled>
      </ChatBox>
      {showChatbot && (
        <Box
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ChatBot steps={steps} />
          <IconButton
            sx={{
              color: "#ffffff",
              bgcolor: "#d2691e",
              zIndex: 9999,
              left: "-20px",
              top: "-258px",
            }}
            onClick={closeChatbot}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </ChatContainer>
  );
}

export default CustomChatBot;
