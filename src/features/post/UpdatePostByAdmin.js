import { Card, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMemo } from "react";

import {
  FSelect,
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

const provinceList = [
  { code: "Gia Lai", label: "Gia Lai" },
  { code: "Kon Tum", label: "Kon Tum" },
  { code: "Đăk Lăk", label: "Đăk Lăk" },
  { code: "Đăk Nông", label: "Đăk Nông" },
  { code: "Lâm Đồng", label: "Lâm Đồng" },
];

const directionList = [
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
  { code: "Đất thổ cư", label: "Đất thổ cư" },
  { code: "Nhà đất thổ cư", label: "Nhà đất thổ cư" },
  { code: "Đất nông nghiệp", label: "Đất nông nghiệp" },
  { code: "Đất rừng", label: "Đất trồng rừng" },
  { code: "Nhà đất cho thuê", label: "Nhà đất cho thuê" },
];
const legalList = [
  { code: "Đã có sổ hồng", label: "Đã có sổ hồng" },
  { code: "Không có sổ hồng", label: "Không có sổ hồng" },
];
const statusList = [
  { code: "Đang bán", label: "Đang bán" },
  { code: "Đã bán", label: "Đã bán" },
];
const toiletList = [
  { code: "0", label: "0" },
  { code: "1", label: "1" },
  { code: "2", label: "2" },
  { code: "3", label: "3" },
];
const bedroomList = [
  { code: "0", label: "0" },
  { code: "1", label: "1" },
  { code: "2", label: "2" },
  { code: "3", label: "3" },
  { code: "4", label: "4" },
  { code: "5", label: "5" },
];

function UpdatePostByAdmin() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [uiUpdated, setUIUpdated] = useState(false);

  const post = useSelector((state) => state.post.singlePost);
  useEffect(() => {
    dispatch(getSinglePost({ postId }));
    setUIUpdated(true);
  }, [dispatch, postId]);

  const [defaultValues, setDefaultValues] = useState({
    title: post.title,
    address: post.address,
    acreage: post.acreage,
    length: post.length,
    width: post.width,
    direction: post.direction,
    legal: post.legal,
    status: post.status,
    type: post.type,
    province: post.province,
    images: [],
    legal_images: [],
    price: post.price,
    toilet: post.toilet,
    bedroom: post.bedroom,
    videoYoutube: post.videoYoutube,
    videoFacebook: post.videoFacebook,
    videoTiktok: post.videoTiktok,
    googleMapLocation: post.googleMapLocation,
    contact_name: post.contact_name,
    contact_phoneNumber: post.contact_phoneNumber,
  });
  useEffect(() => {
    setDefaultValues({
      title: post.title,
      address: post.address,
      acreage: post.acreage,
      length: post.length,
      width: post.width,
      direction: post.direction,
      legal: post.legal,
      status: post.status,
      type: post.type,
      province: post.province,
      images: [],
      legal_images: [],
      price: post.price,
      toilet: post.toilet,
      bedroom: post.bedroom,
      videoYoutube: post.videoYoutube,
      videoFacebook: post.videoFacebook,
      videoTiktok: post.videoTiktok,
      googleMapLocation: post.googleMapLocation,
      contact_name: post.contact_name,
      contact_phoneNumber: post.contact_phoneNumber,
    });
    setUIUpdated(true);
  }, [post]);

  const methods = useForm({
    defaultValues,
  });
  console.log(defaultValues);
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

  const onSubmit = async (data) => {
    try {
      dispatch(updateSinglePost({ postId, ...data }));
      reset();
      navigate("/HomePage");
    } catch (error) {
      console.log(error.message);
    }
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
  if (!uiUpdated) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }
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
            <FTextField name="title" label="Tiêu đề bài viết *" />
            <FTextField name="address" label="Nhập tên đường, xã, huyện *" />
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FSelect name="province" label="Tỉnh">
                {provinceOptions}
              </FSelect>

              <FSelect sx={{ ml: 1, mr: 1 }} name="direction" label="Hướng">
                {directionOptions}
              </FSelect>
              <FSelect name="type" label="Loại bất động sản">
                {typeOptions}
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
                {legalOptions}
              </FSelect>
              <FSelect name="status" label="Trạng thái">
                {statusOptions}
              </FSelect>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FSelect name="toilet" label="Số nhà vệ sinh">
                {toiletOptions}
              </FSelect>
              <FSelect
                sx={{ ml: 1, mr: 1 }}
                name="bedroom"
                label="Số phòng ngủ"
              >
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

export default UpdatePostByAdmin;
