import React, { useCallback, useMemo } from "react";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "./userSlice";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, FTextField, FUploadAvatar } from "../../components/form";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { fData } from "../../utils/numberFormat";

const updateCurrentUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .matches(/^(09|08|07|05|03)\d{8}$/, "Vui lòng nhập số điện thoại hợp lệ")
    .required("Phone Number is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);

  const defaultValues = useMemo(
    () => ({
      name: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      avatar: user?.avatar || "",
    }),
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(updateCurrentUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    try {
      dispatch(updateCurrentUser({ userId: user._id, ...data }));
      navigate("/HomePage");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDropAvatar = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatar",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  if (isLoading || !user) return <LoadingScreen />;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
              <FUploadAvatar
                name="avatar"
                accept=".jpeg, .jpg, .png"
                maxSize={3145728}
                onDrop={handleDropAvatar}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
              <Typography
                sx={{ p: 2, fontWeight: "bold", textTransform: "uppercase" }}
              >
                {user.name}
              </Typography>
              <Typography>{user.email}</Typography>
              <Typography>{user.phoneNumber}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography
                sx={{ p: 3, fontWeight: "bold", color: "main.primary" }}
              >
                CẬP NHẬT THÔNG TIN
              </Typography>
              <Box sx={{ display: "grid", rowGap: 3, columnGap: 3 }}>
                <FTextField name="name" label="Tên người dùng" />
                <FTextField name="phoneNumber" label="Số điện thoại" />
                <FTextField name="Email" label="Email *" value={user.email} />
                <FTextField name="role" label="Vai trò *" value={user.role} />
                <Typography variant="h7">(*): Không thay đổi được</Typography>
              </Box>
              <Stack spacing={{ p: 3 }} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || isLoading}
                >
                  Lưu thay đổi
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
}

export default UserProfile;
