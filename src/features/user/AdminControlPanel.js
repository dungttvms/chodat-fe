import React from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import GroupIcon from "@mui/icons-material/Group";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import EditNoteIcon from "@mui/icons-material/EditNote";
import UserControlByAdmin from "./UserControlByAdmin";
import PostControlByAdmin from "../post/PostControlByAdmin";
import BlogControlByAdmin from "../blog/BlogControlByAdmin";
import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  ];
  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/NotFoundPage");
    }
  }, [user.role, navigate]);

  return (
    <Container>
      <Card sx={{ m: 3, position: "relative", justifyContent: "center" }}>
        <Tabs
          sx={{
            display: "flex",
            justifyContent: "center",
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
