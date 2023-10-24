import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

function BlankLayout() {
  return (
    <Container sx={{ p: 0, m: 0, border: 0, height: "100vh" }}>
      <Stack minHeight="100vh" justifyContent="center" alignItems="center">
        <Logo sx={{ width: 300, height: 200, mb: 8 }} />
        <Outlet />
      </Stack>
    </Container>
  );
}

export default BlankLayout;
