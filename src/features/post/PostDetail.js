import {
  Card,
  CardContent,
  CardHeader,
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
import { Helmet } from "react-helmet";
import "react-image-gallery/styles/css/image-gallery.css";
import useAuth from "../../hooks/useAuth";
import { GOOGLE_MAP_URL } from "../../app/config";
import { fDateTimeNoHour } from "../../utils/formatTime";

function PostDetail() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { user } = useAuth();

  const post = useSelector((state) => state.post.singlePost);

  console.log(post);

  const images = post?.images?.map((image) => ({
    original: image,
    thumbnail: image,
    originalHeight: 400,
    originalWidth: 700,
    thumbnailHeight: 80,
    thumbnailWidth: 120,
  }));
  if (user && user.role === "admin") {
    if (post?.legal_images) {
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
  }
  const postLoading = useSelector((state) => state.post.isLoading);

  useEffect(() => {
    dispatch(getSinglePost({ postId }));
  }, [dispatch, postId]);

  if (postLoading || !post) return <LoadingScreen />;

  if (!postLoading && post)
    return (
      <Container>
        <Helmet>
          <title>{`Chợ đất Tây Nguyên | ${post.type}`}</title>
        </Helmet>
        <Stack spacing={2} sx={{ mt: 3 }}>
          <Grid sx={{ md: 8, sm: 12 }}>
            <ImageGallery
              items={images}
              showFullscreenButton={true}
              autoPlay={false}
              infinite={true}
              showPlayButton={false}
              lazyLoad={true}
            />
          </Grid>

          <CardHeader />
          <Card>
            <Stack>
              <Grid container margin={2} spacing={2}>
                <Typography variant="h4" sx={{ fontWeight: "bold", m: 2 }}>
                  {post.title}
                </Typography>
              </Grid>
              <Grid container margin={1} spacing={2} xs={12} md={6}>
                <Stack margin={1} alignItems="center">
                  <Grid item>
                    <Typography variant="h7" sx={{ fontWeight: "bold", m: 1 }}>
                      Địa chỉ: {post.address}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="h7" sx={{ fontWeight: "bold", m: 2 }}>
                      Tỉnh: {post.province}
                    </Typography>{" "}
                  </Grid>
                  <Grid>
                    <Typography variant="h7" sx={{ fontWeight: "bold", m: 2 }}>
                      Ngày đăng: {fDateTimeNoHour(post.createdAt)}
                    </Typography>{" "}
                  </Grid>
                </Stack>
              </Grid>
              <Grid container spacing={2} sx={{ m: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack margin={1} direction="row" alignItems="center">
                    <WidthFullIcon
                      sx={{
                        color: "#D2691E",
                        width: "30px",
                        height: "30px",
                        m: 1,
                      }}
                    />
                    <span> Diện tích: {post.acreage} m²</span>
                  </Stack>
                  <Stack margin={1} direction="row" alignItems="center">
                    <DirectionsIcon
                      sx={{
                        color: "#D2691E",
                        width: "30px",
                        height: "30px",
                        m: 1,
                      }}
                    />
                    <span> Hướng: {post.direction}</span>
                  </Stack>{" "}
                  {user && user.role === "admin" && (
                    <Stack margin={1} direction="row" alignItems="center">
                      <BathtubIcon
                        sx={{
                          color: "#D2691E",
                          width: "30px",
                          height: "30px",
                          m: 1,
                        }}
                      />
                      <span>Số toilet: {post.toilet}</span>
                    </Stack>
                  )}
                  <Stack margin={1} direction="row" alignItems="center">
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
                      <PinDropIcon
                        sx={{
                          color: "#4285F4",
                          width: "30px",
                          height: "30px",
                          ml: 1,
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      <span style={{ marginLeft: "8px" }}>
                        {" "}
                        Địa chỉ Google map
                      </span>
                    </Link>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack margin={1} direction="row" alignItems="center">
                    <StraightenIcon
                      sx={{
                        color: "#D2691E",
                        width: "30px",
                        height: "30px",
                        m: 1,
                      }}
                    />
                    <span> Chiều dài: {post.length} m</span>
                  </Stack>
                  <Stack margin={1} direction="row" alignItems="center">
                    <DescriptionIcon
                      sx={{
                        color: "#D2691E",
                        width: "30px",
                        height: "30px",
                        m: 1,
                      }}
                    />
                    <span>Pháp lý: {post.legal}</span>
                  </Stack>{" "}
                  <Stack margin={1} direction="row" alignItems="center">
                    <TypeSpecimenIcon
                      sx={{
                        color: "#D2691E",
                        width: "30px",
                        height: "30px",
                        m: 1,
                      }}
                    />
                    <span>Loại: {post.type}</span>
                  </Stack>
                  <Stack margin={1} direction="row" alignItems="center">
                    <Link
                      href={`${post.videoYoutube}`}
                      target="_blank"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textDecoration: "none",
                      }}
                    >
                      <YouTubeIcon
                        sx={{
                          color: "#FF0000",
                          width: "30px",
                          height: "30px",
                          ml: 1,
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      <span style={{ marginLeft: "8px" }}>
                        Xem review YouTube
                      </span>
                    </Link>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack margin={1} direction="row" alignItems="center">
                    <WidthFullIcon
                      sx={{
                        color: "#D2691E",
                        width: "30px",
                        height: "30px",
                        m: 1,
                      }}
                    />
                    <span> Chiều rộng: {post.width} m</span>
                  </Stack>
                  <Stack margin={1} direction="row" alignItems="center">
                    <AttachMoneyIcon
                      sx={{
                        color: "#D2691E",
                        width: "30px",
                        height: "30px",
                        m: 1,
                      }}
                    />
                    <span>Giá: {post.price}</span>
                  </Stack>{" "}
                  {user && user.role === "admin" && (
                    <Stack margin={1} direction="row" alignItems="center">
                      <LocalHotelIcon
                        sx={{
                          color: "#D2691E",
                          width: "30px",
                          height: "30px",
                          m: 1,
                        }}
                      />
                      <span>Số phòng ngủ: {post.bedroom}</span>
                    </Stack>
                  )}
                  <Stack margin={1} direction="row" alignItems="center">
                    <Link
                      href={`${post.videoFacebook}`}
                      target="_blank"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textDecoration: "none",
                      }}
                    >
                      <FacebookIcon
                        sx={{
                          color: "#1877F2",
                          width: "30px",
                          height: "30px",
                          ml: 1,
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      <span style={{ marginLeft: "8px" }}>
                        Xem review Facebook
                      </span>
                    </Link>
                  </Stack>
                </Grid>{" "}
              </Grid>

              <CardContent>
                <Typography variant="body1">{post.description}</Typography>
              </CardContent>
            </Stack>
          </Card>
        </Stack>
      </Container>
    );
}

export default PostDetail;
