import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import "./BlankLayout.css";

function BlankLayout() {
  return (
    <Container className="blank-layout">
      <Stack minHeight="100vh" justifyContent="center" alignItems="center">
        <Logo sx={{ width: 300, height: 200, mb: 5 }} />
        <Outlet />
      </Stack>
    </Container>
  );
}

export default BlankLayout;
