// import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent } from "@mui/material";
// import * as Yup from "yup";
import {
  FSelect,
  FTextField,
  FormProvider,
  FUploadMultipleImages,
  // FUploadImage,
} from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { createPost } from "./postSlice";
import { useNavigate } from "react-router-dom";
// import PreviewImageUpload from "../../components/PreviewImageUpload";
// import UploadMultipleFiles from "../../components/UploadMultipleFiles";

// const yupSchema = Yup.object().shape({
//   type: Yup.string().required("Chọn loại bất động sản"),
//   district: Yup.string().required("Chọn thành phố/thị xã/huyện"),
//   address: Yup.string().required("Nhập địa chỉ cụ thể"),
//   title: Yup.string().required("Nhập tiêu đề bài viết"),
//   description: Yup.string().required("Nhập mô tả"),
//   acreage: Yup.string().required("Nhập diện tích"),
//   direction: Yup.string().required("Nhập hướng"),
//   price: Yup.string().required("Nhập giá trị"),
//   wish: Yup.string().required("Nhập yêu cầu mong muôn"),
//   image: Yup.array().required("Vui lòng cung cấp hình ảnh"),
// });

function PostForm() {
  const { user } = useAuth();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  // Hàm mở modal xác nhận
  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  // Hàm đóng modal xác nhận
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };
  const defaultValues = {
    type: "residential_land",
    district: "chupah",
    address: "",
    title: "",
    description: "",
    acreage: "",
    direction: "east-south",
    price: "",
    wish: "sell",
    images: [],
    username: user.name || "",
    phoneNumber: user.phoneNumber || "0372757777",
    email: user.email || "",
  };

  const methods = useForm({
    defaultValues,
    // resolver: yupResolver(yupSchema),
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
  } = methods;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(createPost({ ...data }));
    reset();
    navigate("/");
  };

  const onSubmitConfirmed = async () => {
    handleSubmit(onSubmit)();
    handleCloseConfirmation();
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

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          TẠO BÀI ĐĂNG MỚI
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FSelect name="type" label="Loại Bất động sản">
                {[
                  { code: "house", label: "Nhà đất" },
                  { code: "residential_land", label: "Đất thổ cư" },
                  { code: "farm_land", label: "Đất nông nghiệp" },
                  { code: "office", label: "Văn phòng cho thuê" },
                ].map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
              <FSelect name="district" label="Huyện/Thành phố/Thị xã">
                {[
                  { code: "pleiku", label: "TP. Pleiku" },
                  { code: "chupah", label: "Chư Păh" },
                  { code: "chupuh", label: "Chư Pưh" },
                  { code: "chuse", label: "Chư Sê" },
                  { code: "iagrai", label: "Ia Grai" },
                  { code: "ducco", label: "Đức Cơ" },
                  { code: "dakdoa", label: "Đăk Đoa" },
                  { code: "chuprong", label: "Chư Prông" },
                  { code: "mangyang", label: "Mang Yang" },
                  { code: "krongpa", label: "Krông Pa" },
                  { code: "ankhe", label: "Tx. An Khê" },
                  { code: "ayunpa", label: "Tx. AyunPa" },
                  { code: "phuthien", label: "Phú Thiện" },
                  { code: "dakpo", label: "Đăk Pơ" },
                  { code: "kbang", label: "KBang" },
                  { code: "kongchro", label: "Kông Chro" },
                  { code: "iapa", label: "Ia Pa" },
                ].map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
            </Grid>
            <FTextField name="address" label="Địa chỉ" />
            <FTextField name="title" label="Tiêu đề bài đăng" />
            <FTextField name="description" multiline rows={4} label="Mô tả" />
            <FUploadMultipleImages
              name="image"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
            />
            {/* <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          /> */}
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FTextField p={2} name="acreage" label="Diện tích" />
              <FTextField name="price" label="Giá" />
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <FSelect name="direction" label="Chọn hướng">
                {[
                  { code: "east", label: "Đông" },
                  { code: "west", label: "Tây" },
                  { code: "south", label: "Nam" },
                  { code: "north", label: "Bắc" },
                  { code: "east-north", label: "Đông Bắc" },
                  { code: "east-south", label: "Đông Nam" },
                  { code: "west-north", label: "Tây Bắc" },
                  { code: "west-south", label: "Tây Nam" },
                ].map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
              <FSelect name="wish" label="Chọn nhu cầu">
                {[
                  { code: "sell", label: "Bán" },
                  { code: "rent", label: "Cho thuê" },
                ].map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </FSelect>
            </Grid>
            <Typography>THÔNG TIN LIÊN HỆ</Typography>
            <FTextField p={2} name="username" label="Tên người liên hệ" />
            <FTextField p={2} name="phoneNumber" label="Điện thoại liên hệ" />
            <FTextField p={2} name="email" label="Email liên hệ" />

            <LoadingButton
              type="submit"
              variant="contained"
              onClick={handleOpenConfirmation}
              loading={isSubmitting}
            >
              Tạo bài đăng
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogContent>
          <Typography>Bạn đã chắc chắn tạo bài viết?</Typography>
          <Button variant="outlined" onClick={handleCloseConfirmation}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmitConfirmed}
          >
            Xác nhận
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostForm;
