import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  FTextField,
  FormProvider,
  FUploadMultipleImages,
  FUploadMultipleImagesLegal,
} from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";

import { getSinglePost, updateSinglePost } from "./postSlice";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";

const defaultValues = {
  title: "",
  address: "",
  acreage: "",
  length: "",
  width: "",
  direction: "",
  legal: "",
  type: "",
  description: "",
  province: "",
  price: "",
  toilet: "",
  bedroom: "",
  googleMapLocation: "",
  videoFacebook: "",
  videoYoutube: "",
  videoTiktok: "",
  contact_name: "",
  contact_phoneNumber: "",
  status: "",
  images: "",
  legal_images: "",
};

function UpdatePostByAdmin() {
  //==============================
  const isLoading = useSelector((state) => state.post.isLoading);
  const post = useSelector((state) => state.post.singlePost);

  const methods = useForm({
    defaultValues,
  });

  const {
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.postId;

  useEffect(() => {
    if (postId) {
      dispatch(getSinglePost({ postId }));
    }
  }, [dispatch, postId]);

  const onSubmit = (data) => {
    dispatch(updateSinglePost({ data, postId: post._id })).then(reset());
    navigate("/admin/controlPanel");
  };

  //===================

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = acceptedFiles;
      if (files) {
        setValue("images", files);
      }
    },
    [setValue]
  );
  const handleDrop_Legal = useCallback(
    (acceptedFiles) => {
      const files = acceptedFiles;
      if (files) {
        setValue("legal_images", files);
      }
    },
    [setValue]
  );

  if (isLoading) return <LoadingScreen />;
  return (
    <Container>
      <Card sx={{ p: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.primary"
          sx={{
            m: 3,
            p: 3,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          CHỈNH SỬA BÀI ĐĂNG
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FTextField
              name="title"
              label="Tiêu đề bài viết *"
              placeholder={post.title}
            />
            <FTextField
              name="address"
              label="Nhập tên đường, xã, huyện *"
              placeholder={post.address}
            />
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FTextField
                name="province"
                label="Nhập tỉnh/ Thành phố *"
                placeholder={post.province}
              />
              <FTextField
                name="direction"
                label="Nhập hướng *"
                placeholder={post.direction}
              />
              <FTextField
                name="type"
                label="Nhập loại Bất động sản *"
                placeholder={post.type}
              />
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FTextField
                name="acreage"
                label="Diện tích (m2)*"
                placeholder={post.acreage}
              />
              <FTextField
                sx={{ ml: 1, mr: 1 }}
                name="width"
                label="Nhập chiều rộng (m)*"
                placeholder={post.width}
              />
              <FTextField
                name="length"
                label="Nhập chiều dài (m)*"
                placeholder={post.length}
              />
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FTextField
                name="price"
                label="Giá (triệu đồng)*"
                placeholder={post.price}
              />
              <FTextField
                name="legal"
                label="Tình trạng pháp lý"
                placeholder={post.legal}
              />
              <FTextField
                name="status"
                label="Trạng thái"
                placeholder={post.status}
              />
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FTextField
                name="toilet"
                label="Số toilet"
                placeholder={post.toilet}
              />
              <FTextField
                name="bedroom"
                label="Số phòng ngủ"
                placeholder={post.bedroom}
              />

              <FTextField
                p={2}
                name="googleMapLocation"
                label="Nhập địa điểm theo tọa độ Google Map (X-Y)*"
                placeholder={post.googleMapLocation}
              />
            </Grid>
            <FTextField
              name="description"
              multiline
              rows={5}
              label="Mô tả chi tiết về Bất động sản"
              placeholder={post.description}
            />
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FUploadMultipleImages
                sx={{ mr: 1 }}
                name="images"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
              />

              <FUploadMultipleImagesLegal
                sx={{ ml: 1 }}
                name="legal_images"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop_Legal}
              />
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <Grid sx={{ flexDirection: "column", pb: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ pb: 1, pt: 1 }}
                >
                  THÔNG TIN LIÊN HỆ
                </Typography>
                <FTextField
                  sx={{ p: 1 }}
                  name="contact_name"
                  label="Tên người liên hệ"
                  placeholder={post.contact_name}
                />
                <FTextField
                  sx={{ p: 1 }}
                  name="contact_phoneNumber"
                  label="Điện thoại liên hệ"
                  placeholder={post.contact_phoneNumber}
                />
                <FTextField
                  sx={{ p: 1 }}
                  name="email"
                  label="Email"
                  placeholder={post.email}
                />
              </Grid>
              <Grid sx={{ flexDirection: "column", pb: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ pb: 1, pt: 1 }}
                >
                  MẠNG XÃ HỘI
                </Typography>

                <FTextField
                  sx={{ p: 1 }}
                  name="videoYoutube"
                  label="Link YouTube"
                />
                <FTextField
                  sx={{ p: 1 }}
                  name="videoFacebook"
                  label="Link Facebook"
                />
                <FTextField
                  sx={{ p: 1 }}
                  name="videoTiktok"
                  label="Link TikTok"
                />
              </Grid>
            </Grid>

            <LoadingButton
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              loading={isSubmitting}
            >
              Xác nhận cập nhật
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
    </Container>
  );
}

export default UpdatePostByAdmin;
