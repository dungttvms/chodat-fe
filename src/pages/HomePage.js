import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Helmet } from "react-helmet";
import ImgPage from "../images/background.png";
import Lazy from "../layouts/LazyPage";
import PostList from "../features/post/PostList";
import PostByImages from "../features/post/PostByImages";
import BlogList from "../features/blog/BlogList";
import PostSearch from "../features/post/PostSearch";
import PartnerCarousel from "./PartnerCarousel";
import CellPhone from "../components/CellPhone";
import CustomChatBot from "../components/ChatBot";

function HomePage() {
  return (
    <Container
      maxWidth="false"
      style={{
        padding: 0,
        margin: 0,
        backgroundImage: `url(${ImgPage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Helmet>
        <title>Trang chủ | Chợ đất Gia Lai</title>
      </Helmet>

      <Lazy />
      <PostSearch />
      <PostList />
      <PostByImages />
      <div id="blog-list-section">
        <BlogList />
      </div>
      <PartnerCarousel />
      <Box>
        <CellPhone />
        <CustomChatBot />
      </Box>
      <Stack style={{ mt: 10 }}>
        <Box sx={{ m: 3, padding: 3, borderRadius: "4px" }}>
          <Box sx={{ marginTop: 3, marginBottom: 3 }}></Box>
        </Box>
      </Stack>
    </Container>
  );
}

export default HomePage;
