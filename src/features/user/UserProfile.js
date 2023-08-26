import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import UserChangePassword from "./UserChangePassword";

function UserProfile() {
  const user = useSelector((state) => state.user.user);
  console.log("user", user);

  const [isGoogleAuthUser, setIsGoogleAuthUser] = useState(false);

  useEffect(() => {
    if (user && user.isGoogleAuth) {
      setIsGoogleAuthUser(true);
    } else {
      setIsGoogleAuthUser(false);
    }
  }, [user]);

  return (
    <Box>
      {isGoogleAuthUser ? (
        <Typography>
          Bạn đã đăng nhập bằng Google Auth. Tính năng thay đổi mật khẩu không
          khả dụng.
        </Typography>
      ) : (
        <UserChangePassword />
      )}
    </Box>
  );
}

export default UserProfile;
