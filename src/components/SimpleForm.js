import React, { Component } from "react";

import styled, { keyframes } from "styled-components";
import ChatBot from "react-simple-chatbot";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentIcon from "../images/customer-service_870175.png";
import Review from "./Review";

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
  animation: ${ChatBotAnim} 1s infinite ease-in-out;
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

class SimpleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChatbot: false,
    };
  }

  toggleChatbot = () => {
    this.setState((prevState) => ({
      showChatbot: !prevState.showChatbot,
    }));
  };

  closeChatbot = () => {
    this.setState({ showChatbot: false });
  };

  render() {
    const { showChatbot } = this.state;

    return (
      <ChatContainer>
        <ChatBox onClick={this.toggleChatbot}>
          <ChatIconStyled>
            <img
              src={SupportAgentIcon}
              alt="Support Agent"
              style={{ height: "60px", width: "60px" }}
            />
          </ChatIconStyled>
        </ChatBox>
        {showChatbot && (
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 9998,
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ChatBot
              steps={[
                {
                  id: "1",
                  message: "Tên của bạn là gì?",
                  trigger: "clientName",
                },
                {
                  id: "clientName",
                  user: true,
                  trigger: "3",
                },
                {
                  id: "3",
                  message:
                    "Chào {previousValue}! Bạn quan tâm đến bất động sản ở tỉnh nào?",
                  trigger: "province",
                },
                {
                  id: "province",
                  options: [
                    { value: "Gia Lai", label: "Gia Lai", trigger: "5" },
                    { value: "Kon Tum", label: "Kon Tum", trigger: "5" },
                    { value: "Đăk Lăk", label: "Đăk Lăk", trigger: "5" },
                    { value: "Đăk Nông", label: "Đăk Nông", trigger: "5" },
                    { value: "Lâm Đồng", label: "Lâm Đồng", trigger: "5" },
                  ],
                },
                {
                  id: "5",
                  message: "Số điện thoại của bạn là bao nhiêu?",
                  trigger: "phoneNumber",
                },
                {
                  id: "phoneNumber",
                  user: true,
                  trigger: "7",
                },
                {
                  id: "7",
                  message: "Cảm ơn bạn! Kiểm tra lại thông tin nhé",
                  trigger: "review",
                },
                {
                  id: "review",
                  component: (
                    <Review
                      clientName={this.state.clientName}
                      province={this.state.province}
                      phoneNumber={this.state.phoneNumber}
                    />
                  ),

                  asMessage: true,
                  trigger: "update",
                },
                {
                  id: "update",
                  message: "Bạn muốn cập nhật lại thông tin gì không?",
                  trigger: "update-question",
                },
                {
                  id: "update-question",
                  options: [
                    { value: "yes", label: "Có", trigger: "update-yes" },
                    { value: "no", label: "Không", trigger: "end-message" },
                  ],
                },
                {
                  id: "update-yes",
                  message: "Bạn muốn update trường thông tin nào?",
                  trigger: "update-fields",
                },
                {
                  id: "update-fields",
                  options: [
                    {
                      value: "clientName",
                      label: "Tên",
                      trigger: "update-clientName",
                    },
                    {
                      value: "province",
                      label: "Tỉnh thành",
                      trigger: "update-province",
                    },
                    {
                      value: "phoneNumber",
                      label: "Số điện thoại",
                      trigger: "update-phoneNumber",
                    },
                  ],
                },
                {
                  id: "update-clientName",
                  update: "clientName",
                  trigger: "7",
                },
                {
                  id: "update-province",
                  update: "province",
                  trigger: "7",
                },
                {
                  id: "update-phoneNumber",
                  update: "phoneNumber",
                  trigger: "7",
                },
                {
                  id: "end-message",
                  message: "Cảm ơn bạn! Chúng tôi sẽ liên hệ bạn sớm nhất!",
                  end: true,
                },
              ]}
            />
            <IconButton
              sx={{
                color: "#ffffff",
                bgcolor: "#d2691e",
                zIndex: 9999,
                left: "-20px",
                top: "-258px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
              onClick={this.closeChatbot}
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </ChatContainer>
    );
  }
}

export default SimpleForm;
