import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import AlertMsg from "../components/AlertMsg";
import MainHeader from "./MainHeader";

function MainLayout() {
  const footerStyles = {
    flexShrink: 0,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  };
  return (
    <Stack sx={{ minHeight: "100vh", minWidth: "100vh", padding: 0, m: 0 }}>
      <MainHeader />

      <AlertMsg />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter sx={footerStyles} />
    </Stack>
  );
}

export default MainLayout;
