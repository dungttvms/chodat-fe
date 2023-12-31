import React from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import GroupIcon from "@mui/icons-material/Group";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import EditNoteIcon from "@mui/icons-material/EditNote";
import UserControlByAdmin from "./UserControlByAdmin";
import PostControlByAdmin from "../post/PostControlByAdmin";
import BlogControlByAdmin from "../blog/BlogControlByAdmin";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBotControl from "./ChatBotControlByAdmin";
import { Helmet } from "react-helmet";

function AdminControlPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("Users_List");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const CONTROL_PANEL_TABS = [
    {
      value: "Users_List",
      icon: <GroupIcon sx={{ fontSize: 24 }} />,
      component: <UserControlByAdmin />,
      title: "Quản lý Người dùng",
    },
    {
      value: "Posts_List",
      icon: <DynamicFeedIcon sx={{ fontSize: 24 }} />,
      component: <PostControlByAdmin />,
      title: "Quản lý Bài đăng",
    },
    {
      value: "Blogs_List",
      icon: <EditNoteIcon sx={{ fontSize: 24 }} />,
      component: <BlogControlByAdmin />,
      title: "Quản lý Blogs",
    },
    {
      value: "Chat_Bot_List",
      icon: <PrecisionManufacturingIcon sx={{ fontSize: 24 }} />,
      component: <ChatBotControl />,
      title: "Quản lý ChatBot",
    },
  ];
  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/NotFoundPage");
    }
  }, [user.role, navigate]);

  return (
    <Container>
      <Helmet>
        <title>Chợ đất Tây Nguyên | Quản trị</title>
      </Helmet>
      <Card
        sx={{
          m: 3,
          position: "relative",
          justifyContent: "center",
          paddingRight: "16px",
          paddingLeft: "16px",
        }}
      >
        <Tabs
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => handleChangeTab(value)}
        >
          {CONTROL_PANEL_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={tab.title}
            />
          ))}
        </Tabs>
      </Card>

      {CONTROL_PANEL_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default AdminControlPanel;
