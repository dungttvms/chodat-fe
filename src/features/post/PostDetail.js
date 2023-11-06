import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "./postSlice";
import LoadingScreen from "../../components/LoadingScreen";
import ImageGallery from "react-image-gallery";
import { Helmet } from "react-helmet";
import "react-image-gallery/styles/css/image-gallery.css";
import useAuth from "../../hooks/useAuth";
import { GOOGLE_MAP_URL } from "../../app/config";
import { fDateTimeNoHour } from "../../utils/formatTime";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PinDropIcon from "@mui/icons-material/PinDrop";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import DirectionsIcon from "@mui/icons-material/Directions";
import StraightenIcon from "@mui/icons-material/Straighten";
import WidthFullIcon from "@mui/icons-material/WidthFull";
import BathtubIcon from "@mui/icons-material/Bathtub";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";

function PostDetail() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { user } = useAuth();

  const post = useSelector((state) => state.post.singlePost);

  const images = post?.images?.map((image) => ({
    original: image,
    thumbnail: image,
    originalHeight: 400,
    originalWidth: 700,
    thumbnailHeight: 80,
    thumbnailWidth: 120,
  }));
  if (user && user.role === "admin" && post?.legal_images) {
    post.legal_images.forEach((legal_image) => {
      images.push({
        original: legal_image,
        thumbnail: legal_image,
        originalHeight: 400,
        originalWidth: 700,
        thumbnailHeight: 80,
        thumbnailWidth: 120,
      });
    });
  }

  const postLoading = useSelector((state) => state.post.isLoading);

  useEffect(() => {
    dispatch(getSinglePost({ postId }));
  }, [dispatch, postId]);

  if (postLoading || !post) return <LoadingScreen />;

  return (
    <Container>
      <Helmet>
        <title>{`Chợ đất Tây Nguyên | ${post.type}`}</title>
      </Helmet>
      <Stack spacing={2} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item md={8} sm={12}>
            <ImageGallery
              items={images}
              showFullscreenButton={true}
              autoPlay={false}
              infinite={true}
              showPlayButton={false}
              lazyLoad={true}
            />
          </Grid>

          <Card>
            <Stack>
              <Grid
                container
                margin={1}
                marginLeft={3}
                spacing={2}
                justifyContent="start"
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", m: 1, textTransform: "uppercase" }}
                >
                  {post.title}
                </Typography>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h7" sx={{ fontWeight: "bold", ml: 4 }}>
                      Địa chỉ: {post.address}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h7" sx={{ fontWeight: "bold", ml: 4 }}>
                      Tỉnh: {post.province}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h7" sx={{ fontWeight: "bold", ml: 4 }}>
                      Ngày đăng: {fDateTimeNoHour(post.createdAt)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h7" sx={{ fontWeight: "bold", ml: 4 }}>
                      Người đăng: {post.contact_name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h7" sx={{ fontWeight: "bold", ml: 4 }}>
                      Điện thoại: {post.contact_phoneNumber}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ m: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <DisplayIconTextPair
                    icon={<WidthFullIcon />}
                    text={`Diện tích: ${post.acreage} m²`}
                  />
                  <DisplayIconTextPair
                    icon={<DirectionsIcon />}
                    text={`Hướng: ${post.direction}`}
                  />
                  {user && user.role === "admin" && (
                    <DisplayIconTextPair
                      icon={<BathtubIcon />}
                      text={`Số toilet: ${post.toilet}`}
                    />
                  )}
                  <DisplayIconTextPair
                    icon={<PinDropIcon />}
                    text={
                      <Link
                        href={`${GOOGLE_MAP_URL}${post.googleMapLocation}`}
                        target="_blank"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "left",
                          textDecoration: "none",
                        }}
                      >
                        Địa chỉ Google map
                      </Link>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DisplayIconTextPair
                    icon={<StraightenIcon />}
                    text={`Chiều dài: ${post.length} m`}
                  />
                  <DisplayIconTextPair
                    icon={<DescriptionIcon />}
                    text={`Pháp lý: ${post.legal}`}
                  />
                  <DisplayIconTextPair
                    icon={<TypeSpecimenIcon />}
                    text={`Loại: ${post.type}`}
                  />
                  <DisplayIconTextPair
                    icon={
                      <LinkIcon
                        link={post.videoYoutube}
                        icon={<YouTubeIcon />}
                        text="Xem review YouTube"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <DisplayIconTextPair
                    icon={<WidthFullIcon />}
                    text={`Chiều rộng: ${post.width} m`}
                  />
                  <DisplayIconTextPair
                    icon={<AttachMoneyIcon />}
                    text={`Giá: ${post.price}`}
                  />
                  {user && user.role === "admin" && (
                    <DisplayIconTextPair
                      icon={<LocalHotelIcon />}
                      text={`Số phòng ngủ: ${post.bedroom}`}
                    />
                  )}
                  <DisplayIconTextPair
                    icon={
                      <LinkIcon
                        link={post.videoFacebook}
                        icon={<FacebookIcon />}
                        text="Xem review Facebook"
                      />
                    }
                  />
                </Grid>
              </Grid>

              <CardContent>
                <Typography variant="body1" marginLeft={4}>
                  {post.description
                    .replace(/<br>/g, "\n")
                    .split("\n")
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </Typography>
              </CardContent>
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </Container>
  );
}

function DisplayIconTextPair({ icon, text }) {
  return (
    <Stack margin={1} direction="row" alignItems="center">
      {icon}
      <span>{text}</span>
    </Stack>
  );
}

function LinkIcon({ link, icon, text }) {
  return (
    <Link
      href={link}
      target="_blank"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      {icon}
      <span style={{ marginLeft: "8px" }}>{text}</span>
    </Link>
  );
}

export default PostDetail;
