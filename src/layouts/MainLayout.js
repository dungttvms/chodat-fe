import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import AlertMsg from "../components/AlertMsg";
import MainHeader from "./MainHeader";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh", minWidth: "100vh", padding: 0, m: 0 }}>
      <MainHeader />

      <AlertMsg />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
