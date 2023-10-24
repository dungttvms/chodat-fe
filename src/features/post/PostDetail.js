import {
  Card,
  CardHeader,
  Container,
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
import { Helmet } from "react-helmet";

function PostDetail() {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const post = useSelector((state) => state.post.singlePost);
  const images = post?.images?.map((image) => ({
    original: image,
    thumbnail: image,
    originalHeight: 400,
    originalWidth: 700,
    thumbnailHeight: 80,
    thumbnailWidth: 120,
    showNav: true,
    autoPlay: true,
    infinite: true,
    showFullscreenButton: true,
  }));

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
        <Stack spacing={2}>
          <Card>
            <ImageGallery items={images} />
          </Card>
          <CardHeader />
          <Typography>{post.title}</Typography>
          <Typography>Địa chỉ: {post.address}</Typography>
          <Typography>Tỉnh: {post.province}</Typography>
          <Typography>Mô tả chi tiết</Typography>
          <Typography> {post.description}</Typography>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Stack margin={2} direction="row" alignItems="center">
              <LocalHotelIcon
                sx={{ color: "#D2691E", width: "30px", height: "30px", m: 1 }}
              />{" "}
              <span>{post.bedroom}</span>
            </Stack>
            <Stack margin={2} direction="row" alignItems="center">
              <BathtubIcon
                sx={{ color: "#D2691E", width: "30px", height: "30px", m: 1 }}
              />{" "}
              <span>{post.toilet}</span>
            </Stack>
            <Stack direction="row" alignItems="center">
              <DescriptionIcon
                sx={{ color: "#D2691E", width: "30px", height: "30px", m: 1 }}
              />{" "}
              <span>{post.legal}</span>
            </Stack>
            <Stack direction="row" alignItems="center">
              <AttachMoneyIcon
                sx={{ color: "#D2691E", width: "30px", height: "30px", m: 1 }}
              />
              <span>{post.price}</span>
            </Stack>

            <Stack direction="row" alignItems="center">
              <DirectionsIcon
                sx={{ color: "#D2691E", width: "30px", height: "30px", m: 1 }}
              />
              <span> Hướng: {post.direction}</span>
            </Stack>
            <Stack direction="row" alignItems="center">
              <StraightenIcon
                sx={{ color: "#D2691E", width: "30px", height: "30px", m: 1 }}
              />
              <span> Chiều dài: {post.length} m</span>
            </Stack>
            <Stack direction="row" alignItems="center">
              <WidthFullIcon
                sx={{ color: "#D2691E", width: "30px", height: "30px", m: 1 }}
              />
              <span> Chiều rộng: {post.width} m</span>
            </Stack>
            <Stack direction="row" alignItems="center">
              <WidthFullIcon
                sx={{ color: "#D2691E", width: "30px", height: "30px", m: 1 }}
              />
              <span> Diện tích: {post.acreage} m²</span>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Link
                href={`https://www.google.com/maps?q=${post.googleMapLocation}`}
                target="_blank"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "left",
                  textDecoration: "none",
                }}
              >
                <PinDropIcon
                  sx={{ color: "#4285F4", width: "30px", height: "30px" }}
                  style={{ cursor: "pointer" }}
                />
                <span style={{ marginLeft: "8px" }}> Địa chỉ Google map</span>
              </Link>
            </Stack>
            <Stack direction="row" alignItems="center">
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
                  sx={{ color: "#FF0000", width: "30px", height: "30px" }}
                  style={{ cursor: "pointer" }}
                />
                <span style={{ marginLeft: "8px" }}>Xem review YouTube</span>
              </Link>
            </Stack>
            <Stack direction="row" alignItems="center">
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
                  sx={{ color: "#1877F2", width: "30px", height: "30px" }}
                  style={{ cursor: "pointer" }}
                />
                <span style={{ marginLeft: "8px" }}>Xem review Facebook</span>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    );
}

export default PostDetail;
