import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Box,
  Breadcrumbs,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import HomeIcon from "@mui/icons-material/Home";
import { Helmet } from "react-helmet";
// import "./Field.css";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên của bạn"),
  phoneNumber: Yup.string()
    .matches(/^(09|08|07|05|03)\d{8}$/, "Vui lòng nhập số điện thoại hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  email: Yup.string()
    .email("Invalid email")
    .required("Vui lòng nhập Email của bạn"),
  passwordConfirmation: Yup.string()
    .required("Vui lòng nhập xác nhận mật khẩu")
    .oneOf([Yup.ref("password")], "Xác nhận mật khẩu không đúng"),
});

const defaultValues = {
  name: "",
  phoneNumber: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};
function RegisterPage() {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(
    false
  );

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let { name, email, phoneNumber, password } = data;

    try {
      await auth.register({ name, email, phoneNumber, password }, () => {
        navigate("/HomePage", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Helmet>
        <title>Đăng ký | Chợ đất Tây Nguyên</title>
      </Helmet>
      <Box
        sx={{ position: "absolute", left: "5%", top: "5%" }}
        name="breadcrumbs"
      >
        <Breadcrumbs
          color="primary"
          m={1}
          separator="›"
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center", color: "primary" }}
            href="/"
          >
            <HomeIcon sx={{ color: "primary", mr: 0.5 }} fontSize="inherit" />
            Home Page
          </Link>
          <Typography color="primary">Đăng ký</Typography>
        </Breadcrumbs>
      </Box>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ color: "#ffffff" }}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert security="info">
            Bạn đã có tài khoản? {""}
            <Link varial="subtitles2" component={RouterLink} to="/login">
              Đăng nhập ngay
            </Link>
          </Alert>

          <FTextField
            margin="1rem 0"
            padding="1rem"
            name="name"
            className="box-field"
            label="Tên của bạn"
          />
          <FTextField
            margin="1rem 0"
            padding="1rem"
            name="phoneNumber"
            label="Số điện thoại"
            className="box-field"
          />
          <FTextField
            margin="1rem 0"
            padding="1rem"
            name="email"
            label="Địa chỉ Email"
            className="box-field"
          />
          <FTextField
            margin="1rem 0"
            padding="1rem"
            name="password"
            label="Mật khẩu"
            className="box-field"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordConfirmation"
            label="Xác nhận mật khẩu"
            className="box-field"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                    edge="end"
                  >
                    {showPasswordConfirmation ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            ĐĂNG KÝ NGAY
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default RegisterPage;
