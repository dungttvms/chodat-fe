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

// const defaultValues = {
//   title: "",
//   address: "",
//   acreage: "",
//   length: "",
//   width: "",
//   direction: "",
//   legal: "",
//   type: "",
//   description: "",
//   province: "",
//   price: "",
//   toilet: "",
//   bedroom: "",
//   googleMapLocation: "",
//   videoFacebook: "",
//   videoYoutube: "",
//   videoTiktok: "",
//   contact_name: "",
//   contact_phoneNumber: "",
//   status: "",
//   images: "",
//   legal_images: "",
// };

function UpdatePostByAdmin() {
  const isLoading = useSelector((state) => state.post?.isLoading);
  const post = useSelector((state) => state.post?.singlePost);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.postId;
  const defaultValues = {
    title: post?.title || "",
    address: post?.address || "",
    acreage: post?.acreage || "",
    length: post?.length || "",
    width: post?.width || "",
    direction: post?.direction || "",
    legal: post?.legal || "",
    type: post?.type || "",
    description: post?.description || "",
    province: post?.province || "",
    price: post?.price || "",
    toilet: post?.toilet || "",
    bedroom: post?.bedroom || "",
    googleMapLocation: post?.googleMapLocation || "",
    videoFacebook: post?.videoFacebook || "",
    videoYoutube: post?.videoYoutube || "",
    videoTiktok: post?.videoTiktok || "",
    contact_name: post?.contact_name || "",
    contact_phoneNumber: post?.contact_phoneNumber || "",
    status: post?.status || "",
    images: "",
    legal_images: "",
  };
  const methods = useForm({
    defaultValues,
  });

  const {
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (postId) {
      dispatch(getSinglePost({ postId }));
    }
  }, [dispatch, postId]);

  const onSubmit = (data) => {
    dispatch(updateSinglePost({ data, postId: post._id })).then(reset());
    navigate("/admin/controlPanel");
  };

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

  const renderTextField = (name, label, placeholder) => {
    return <FTextField name={name} label={label} placeholder={placeholder} />;
  };

  const renderGridRow = (items) => {
    return (
      <Grid sx={{ display: "flex", flexDirection: "row" }}>
        {items.map((item, index) => (
          <FTextField
            key={index}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
          />
        ))}
      </Grid>
    );
  };

  const contactInfo = [
    { name: "contact_name", label: "Tên người liên hệ" },
    { name: "contact_phoneNumber", label: "Điện thoại liên hệ" },
    { name: "email", label: "Email" },
  ];

  const socialMediaLinks = [
    { name: "videoYoutube", label: "Link YouTube" },
    { name: "videoFacebook", label: "Link Facebook" },
    { name: "videoTiktok", label: "Link TikTok" },
  ];

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
            {renderTextField("title", "Tiêu đề bài viết *", post.title)}
            {renderTextField(
              "address",
              "Nhập tên đường, xã, huyện *",
              post.address
            )}
            {renderGridRow([
              {
                name: "province",
                label: "Nhập tỉnh/ Thành phố *",
                placeholder: post.province,
              },
              {
                name: "direction",
                label: "Nhập hướng *",
                placeholder: post.direction,
              },
              {
                name: "type",
                label: "Nhập loại Bất động sản *",
                placeholder: post.type,
              },
            ])}
            {renderGridRow([
              {
                name: "acreage",
                label: "Diện tích (m2)*",
                placeholder: post.acreage,
              },
              {
                name: "width",
                label: "Nhập chiều rộng (m)*",
                placeholder: post.width,
              },
              {
                name: "length",
                label: "Nhập chiều dài (m)*",
                placeholder: post.length,
              },
            ])}
            {renderGridRow([
              {
                name: "price",
                label: "Giá (triệu đồng)*",
                placeholder: post.price,
              },
              {
                name: "legal",
                label: "Tình trạng pháp lý",
                placeholder: post.legal,
              },
              { name: "status", label: "Trạng thái", placeholder: post.status },
            ])}
            {renderGridRow([
              { name: "toilet", label: "Số toilet", placeholder: post.toilet },
              {
                name: "bedroom",
                label: "Số phòng ngủ",
                placeholder: post.bedroom,
              },
              {
                name: "googleMapLocation",
                label: "Nhập địa điểm theo tọa độ Google Map (X-Y)*",
                placeholder: post.googleMapLocation,
              },
            ])}
            {renderTextField(
              "description",
              "Mô tả chi tiết về Bất động sản",
              post.description
            )}
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FUploadMultipleImages
                sx={{ mr: 1 }}
                name="images"
                accept=".jpeg, .jpg, .png"
                maxSize={3145728}
                onDrop={handleDrop}
              />
              <FUploadMultipleImagesLegal
                sx={{ ml: 1 }}
                name="legal_images"
                accept=".jpeg, .jpg, .png"
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
                {contactInfo.map((info, index) => (
                  <FTextField
                    key={index}
                    sx={{ p: 1 }}
                    name={info.name}
                    label={info.label}
                    placeholder={post[info.name]}
                  />
                ))}
              </Grid>
              <Grid sx={{ flexDirection: "column", pb: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ pb: 1, pt: 1 }}
                >
                  MẠNG XÃ HỘI
                </Typography>
                {socialMediaLinks.map((link, index) => (
                  <FTextField
                    key={index}
                    sx={{ p: 1 }}
                    name={link.name}
                    label={link.label}
                    placeholder={post[link.name]}
                  />
                ))}
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
