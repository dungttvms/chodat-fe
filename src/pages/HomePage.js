import React from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import ImgPage from "../images/background.png";
import Lazy from "../layouts/LazyPage";
import CellPhone from "../components/CellPhone";
import CustomChatBot from "../components/ChatBot";
import PostList from "../features/post/PostList";
import PostListByImages from "../features/post/PostListByImages";
import PartnerCarousel from "./PartnerCarousel";
import BlogList from "../features/blog/BlogList";

function HomePage() {
  const isLargeScreen = window.innerWidth >= 1024;

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
        <title>Trang chủ | Chợ đất Tây Nguyên</title>
      </Helmet>
      {isLargeScreen && <Lazy />}
      <Stack sx={{ m: 3, p: 3 }} display="flex">
        {[
          { title: "BẤT ĐỘNG SẢN NỔI BẬT", component: <PostList /> },
          { title: "BẤT ĐỘNG SẢN ĐỊA PHƯƠNG", component: <PostListByImages /> },
          { title: "BLOGS CHỢ ĐẤT TÂY NGUYÊN", component: <BlogList /> },
        ].map((section, index) => (
          <Grid
            key={index}
            container
            alignItems="center"
            justifyContent="start"
            spacing={2}
          >
            <Typography
              variant="h5"
              marginLeft={10}
              marginTop={5}
              fontWeight="bold"
              color="#ffffff"
            >
              {section.title}
            </Typography>
            {section.component}
          </Grid>
        ))}
      </Stack>
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
