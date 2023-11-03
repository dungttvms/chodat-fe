import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMemo } from "react";

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

const provinceList = [
  { code: "", label: "Tỉnh/ Thành phố" },
  { code: "Gia Lai", label: "Gia Lai" },
  { code: "Kon Tum", label: "Kon Tum" },
  { code: "Đăk Lăk", label: "Đăk Lăk" },
  { code: "Đăk Nông", label: "Đăk Nông" },
  { code: "Lâm Đồng", label: "Lâm Đồng" },
];

const directionList = [
  { code: "", label: "Hướng" },
  { code: "Đông", label: "Đông" },
  { code: "Tây", label: "Tây" },
  { code: "Nam", label: "Nam" },
  { code: "Bắc", label: "Bắc" },
  { code: "Đông Bắc", label: "Đông Bắc" },
  { code: "Đông Nam", label: "Đông Nam" },
  { code: "Tây Bắc", label: "Tây Bắc" },
  { code: "Tây Nam", label: "Tây Nam" },
];

const typeList = [
  { code: "", label: "Loại bất động sản" },
  { code: "Đất thổ cư", label: "Đất thổ cư" },
  { code: "Nhà đất thổ cư", label: "Nhà đất thổ cư" },
  { code: "Đất nông nghiệp", label: "Đất nông nghiệp" },
  { code: "Đất rừng", label: "Đất trồng rừng" },
  { code: "Nhà đất cho thuê", label: "Nhà đất cho thuê" },
];
const legalList = [
  { code: "", label: "Tình trạng pháp lý" },
  { code: "Đã có sổ hồng", label: "Đã có sổ hồng" },
  { code: "Không có sổ hồng", label: "Không có sổ hồng" },
];
const statusList = [
  { code: "", label: "Hiện trạng" },
  { code: "Đang bán", label: "Đang bán" },
  { code: "Đã bán", label: "Đã bán" },
];
const toiletList = [
  { code: "", label: "Số toilet" },
  { code: "0", label: "0" },
  { code: "1", label: "1" },
  { code: "2", label: "2" },
  { code: "3", label: "3" },
];
const bedroomList = [
  { code: "", label: "Số phòng ngủ" },
  { code: "0", label: "0" },
  { code: "1", label: "1" },
  { code: "2", label: "2" },
  { code: "3", label: "3" },
  { code: "4", label: "4" },
  { code: "5", label: "5" },
];

function PostCreate() {
  const defaultValues = {
    title: "",
    address: "",
    acreage: "",
    length: "",
    width: "",
    direction: "",
    legal: "",
    status: "",
    type: "",
    province: "",
    images: [],
    legal_images: [],
    price: "",
    toilet: "",
    bedroom: "",
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
    navigate("/HomePage");
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

  const provinceOptions = useMemo(() => {
    return provinceList.map((option) => (
      <option key={option.code} value={option.code}>
        {option.label}
      </option>
    ));
  }, []);

  const directionOptions = useMemo(() => {
    return directionList.map((option) => (
      <option key={option.code} value={option.code}>
        {option.label}
      </option>
    ));
  }, []);
  const typeOptions = useMemo(() => {
    return typeList.map((option) => (
      <option key={option.code} value={option.code}>
        {option.label}
      </option>
    ));
  }, []);
  const legalOptions = useMemo(() => {
    return legalList.map((option) => (
      <option key={option.code} value={option.code}>
        {option.label}
      </option>
    ));
  }, []);
  const statusOptions = useMemo(() => {
    return statusList.map((option) => (
      <option key={option.code} value={option.code}>
        {option.label}
      </option>
    ));
  }, []);
  const toiletOptions = useMemo(() => {
    return toiletList.map((option) => (
      <option key={option.code} value={option.code}>
        {option.label}
      </option>
    ));
  }, []);
  const bedroomOptions = useMemo(() => {
    return bedroomList.map((option) => (
      <option key={option.code} value={option.code}>
        {option.label}
      </option>
    ));
  }, []);

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
              <FSelect name="province">{provinceOptions}</FSelect>
              <FSelect sx={{ ml: 1, mr: 1 }} name="direction">
                {directionOptions}
              </FSelect>
              <FSelect name="type">{typeOptions}</FSelect>
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
              <FSelect sx={{ ml: 1, mr: 1 }} name="legal">
                {legalOptions}
              </FSelect>
              <FSelect name="status">{statusOptions}</FSelect>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FSelect name="toilet">{toiletOptions}</FSelect>
              <FSelect sx={{ ml: 1, mr: 1 }} name="bedroom">
                {bedroomOptions}
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
