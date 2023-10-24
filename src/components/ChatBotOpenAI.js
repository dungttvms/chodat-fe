import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { CHATGPT_API_KEY, CHATGPT_URL } from "../app/config";

function ChatBotOpenAI() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Xin chào, Chợ đất Tây Nguyên có thể hỗ trợ gì được cho bạn",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    //Update
    setMessages(newMessages);
    setTyping(true);
    //Process
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessage = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [...apiMessage],
    };

    await fetch(CHATGPT_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + CHATGPT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choises[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choises[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setTyping(false);
      });
  }
  return (
    <div>
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                typing ? (
                  <TypingIndicator content="Chợ đất Gia Lai đang trả lời..." />
                ) : null
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput
              placeholder="Nhập tin nhắn ở đây..."
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default ChatBotOpenAI;
