import React, { useState } from "react";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Container } from "@mui/system";

import {
  Alert,
  Box,
  Stack,
  Link,
  InputAdornment,
  IconButton,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";

import useAuth from "../hooks/useAuth";

import { GOOGLE_CLIENT_ID } from "../app/config";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import apiService from "../app/apiService";

import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const defaultValues = {
  email: "admin@coderschool.vn",
  password: "1234",
};

function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Helmet>
        <title>Đăng nhập | Chợ đất Tây Nguyên</title>
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
          <Typography color="primary">Đăng nhập</Typography>
        </Breadcrumbs>
      </Box>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors?.responseError && (
            <Alert severity="error">{errors?.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Bạn chưa có tài khoản
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Tạo tài khoản ngay
            </Link>
          </Alert>
          <FTextField
            name="email"
            label="Email của bạn"
            className="box-field"
          />
          <FTextField
            name="password"
            label="Mật khẩu của bạn"
            className="box-field"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff color="info" />
                    ) : (
                      <Visibility color="info" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to="#"
              color="#FFF"
            >
              Quên mật khẩu?
            </Link>
          </Box>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            fullWidth
            size="large"
            variant="contained"
            color="secondary"
          >
            ĐĂNG NHẬP
          </LoadingButton>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const token = credentialResponse.credential;

                try {
                  const response = await apiService.post("/oauth", {
                    token,
                  });
                  if (response.status === 200) {
                    const { email, name, picture } = response.data;
                    try {
                      await auth.loginWithGoogle(
                        {
                          email,
                          name,
                          picture,
                        },
                        () => {
                          navigate("/", { replace: true });
                        }
                      );
                    } catch (error) {
                      toast.error("Login Error");
                      navigate("/login");
                    }

                    navigate("/", { replace: true });
                  } else {
                    toast.error("Login Error");
                    navigate("/login");
                  }
                } catch (error) {
                  console.log("Error during Google Login:", error);
                  toast.error("Login Error");
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              width="400"
              logo_alignment="center"
              theme="outlined"
            />
          </GoogleOAuthProvider>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
