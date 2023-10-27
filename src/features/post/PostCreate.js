import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FSelect,
  FTextField,
  FormProvider,
  FUploadMultipleImages,
  FUploadMultipleImagesLegal,
  // FUploadImage,
} from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";

import { createNewPost } from "./postSlice";
import { useNavigate } from "react-router-dom";

const createPostSchema = Yup.object().shape({
  title: Yup.string().required("Nhập tiêu đề bài đăng"),
  address: Yup.string().required("Nhập địa chỉ Bất động sản"),
  acreage: Yup.string().required("Nhập diện tích (m2)"),
  length: Yup.string().required("Nhập chiều dài (m)"),
  width: Yup.string().required("Nhập chiều rộng (m)"),
  direction: Yup.string().required("Nhập hướng cửa chính"),
  legal: Yup.string().required("Thông tin pháp lý"),
  status: Yup.string().required("Hiện trạng bất động sản"),
  type: Yup.string().required("Loại bất động sản"),
  description: Yup.string().required("Nhập mô tả chi tiết"),
  province: Yup.string().required("Chọn tỉnh"),
  images: Yup.array().required("Hình ảnh thực tế"),

  price: Yup.string().required("Nhập giá trị"),

  googleMapLocation: Yup.string().required("Nhập tọa độ Google Map (X, Y)"),

  contact_name: Yup.string().required("Tên người liên hệ"),
  contact_phoneNumber: Yup.string().required("Số điện thoại người liên hệ"),
});

function PostCreate() {
  const defaultValues = {
    title: "",
    address: "",
    acreage: "",
    length: "",
    width: "",
    direction: "Đông Nam",
    legal: "Đã có sổ hồng",
    status: "Đang bán",
    type: "Đất thổ cư",

    province: "Gia Lai",
    images: [],
    legal_images: [],
    price: "",
    toilet: "0",
    bedroom: "0",
    videoYoutube: "",
    videoFacebook: "",
    videoTiktok: "",
    googleMapLocation: "",
    contact_name: "",
    contact_phoneNumber: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(createPostSchema),
  });

  const handleDescriptionChange = (event) => {
    const updatedDescription = event.target.value.replace(/\n/g, "<br>");
    methods.setValue("description", updatedDescription);
  };

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
  } = methods;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(createNewPost(data));
    reset();
    navigate("/");
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
          TẠO BÀI ĐĂNG MỚI
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FTextField name="title" label="Tiêu đề bài viết *" />
            <FTextField name="address" label="Nhập tên đường, xã, huyện *" />
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FSelect name="province" label="Tỉnh">
                {[
                  { code: "Gia Lai", label: "Gia Lai" },
                  { code: "Kon Tum", label: "Kon Tum" },
                  { code: "Đăk Lăk", label: "Đăk Lăk" },
                  { code: "Đăk Nông", label: "Đăk Nông" },
                  { code: "Lâm Đồng", label: "Lâm Đồng" },
                ].map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
              <FSelect
                sx={{ ml: 1, mr: 1 }}
                name="direction"
                label="Hướng bất động sản"
              >
                {[
                  { code: "Đông", label: "Đông" },
                  { code: "Tây", label: "Tây" },
                  { code: "Nam", label: "Nam" },
                  { code: "Bắc", label: "Bắc" },
                  { code: "Đông Bắc", label: "Đông Bắc" },
                  { code: "Đông Nam", label: "Đông Nam" },
                  { code: "Tây Bắc", label: "Tây Bắc" },
                  { code: "Tây Nam", label: "Tây Nam" },
                ].map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
              <FSelect name="type" label="Loại bất động sản">
                {[
                  { code: "Đất thổ cư", label: "Đất thổ cư" },
                  { code: "Nhà đất thổ cư", label: "Nhà đất thổ cư" },
                  { code: "Đất nông nghiệp", label: "Đất nông nghiệp" },
                  { code: "Đất rừng", label: "Đất trồng rừng" },
                  { code: "Nhà đất cho thuê", label: "Đất cho thuê" },
                ].map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FTextField name="acreage" label="Diện tích (m2)*" />
              <FTextField
                sx={{ ml: 1, mr: 1 }}
                name="width"
                label="Nhập chiều rộng (m)*"
              />
              <FTextField name="length" label="Nhập chiều dài (m)*" />
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FTextField name="price" label="Giá (triệu đồng)*" />
              <FSelect sx={{ ml: 1, mr: 1 }} name="legal" label="Pháp lý">
                {[
                  { code: "Đã có sổ hồng", label: "Đã có sổ hồng" },
                  { code: "Không có sổ hồng", label: "Không có sổ hồng" },
                ].map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
              <FSelect name="status" label="Trạng thái">
                {[
                  { code: "Đang bán", label: "Đang bán" },
                  { code: "Đã bán", label: "Đã bán" },
                ].map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FSelect name="toilet" label="Số nhà vệ sinh">
                {[
                  { code: "0", label: "0" },
                  { code: "1", label: "1" },
                  { code: "2", label: "2" },
                  { code: "3", label: "3" },
                ].map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
              <FSelect
                sx={{ ml: 1, mr: 1 }}
                name="bedroom"
                label="Số phòng ngủ"
              >
                {[
                  { code: "0", label: "0" },
                  { code: "1", label: "1" },
                  { code: "2", label: "2" },
                  { code: "3", label: "3" },
                  { code: "4", label: "4" },
                  { code: "5", label: "5" },
                ].map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
              <FTextField
                p={2}
                name="googleMapLocation"
                label="Nhập địa điểm theo tọa độ Google Map (X-Y)*"
              />
            </Grid>
            <FTextField
              name="description"
              multiline
              rows={5}
              label="Mô tả chi tiết về Bất động sản"
              onChange={handleDescriptionChange}
              value={methods.watch("description")}
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
                />
                <FTextField
                  sx={{ p: 1 }}
                  name="contact_phoneNumber"
                  label="Điện thoại liên hệ"
                />
                <FTextField
                  sx={{ p: 1 }}
                  name="email"
                  value="info@chodattaynguyen.com"
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
              Tạo bài đăng
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
    </Container>
  );
}

export default PostCreate;
