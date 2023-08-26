import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import Logo from "../components/Logo";

import ListIcon from "@mui/icons-material/List";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Divider, Stack, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function MainHeader() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logout, isAuthenticated, user } = useAuth();
  const favoritePostCount = user?.favoritePostList?.length;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = async () => {
    try {
      await logout(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePassword = () => {
    // Navigate to the change password page
    try {
      navigate("/changePassword");
    } catch (error) {
      console.error(error);
    }
  };

  // const handleCancelPassword = () => {
  //   try {
  //     toast.message("You can not change password with Google Account ");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleProfile = () => {
    try {
      navigate(`/users/${user._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePosts = () => {
    try {
      navigate(`/posts/${user._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleScrollToBlogList = () => {
    const blogListSection = document.getElementById("blog-list-section");
    if (blogListSection) {
      blogListSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePhongThuyClick = () => {
    const currentPath = window.location.pathname;
    console.log(currentPath);

    if (currentPath === "/") {
      handleScrollToBlogList();
    } else {
      navigate("/");

      const delayTime = 1000;
      setTimeout(() => {
        handleScrollToBlogList();
      }, delayTime);
    }
  };

  const pages = [
    {
      title: "CHỢ ĐẤT GIA LAI",
      action: () => navigate("/"),
    },
    {
      title: "GIỚI THIỆU",
      action: () => navigate("/introduce"),
    },
    {
      title: "TIN TỨC",
      action: () => navigate("/news"),
    },

    {
      title: "PHONG THỦY",
      action: handlePhongThuyClick,
    },
    {
      title: "LIÊN HỆ",
      action: () => navigate("/contact"),
    },
  ];
  const settings = [
    {
      title: "Quản lý tin đăng",
      action: handlePosts,
      icon: <ListIcon />,
    },
    {
      title: "Thông tin tài khoản",
      action: handleProfile,
      icon: <AccountBoxIcon />,
    },
    {
      title: "Thay đổi mật khẩu",
      // action: user.isGoogleAuth ? handleCancelPassword : handleCancelPassword,
      action: handlePassword,
      icon: <LockOpenIcon />,
    },
    {
      title: "Đăng xuất",
      action: handleLogOut,
      icon: <LogoutIcon />,
    },
  ];

  return (
    <AppBar position="sticky">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <Logo sx={{ width: "80px", height: "80px" }} />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
                ml: 5,
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={page.action}
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.lighter",
                      borderRadius: "4px",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    textAlign="center"
                    sx={{ fontSize: "18px" }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                variant="contained"
                key={page.title}
                onClick={page.action}
                sx={{ my: 2, color: "white" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          {isAuthenticated ? (
            <Stack direction="row" spacing={2}>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <Typography
                    sx={{ display: "flex", alignItems: "center", p: 2 }}
                  >
                    <FavoriteIcon onClick={() => navigate("/favoritePost")} />
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "16px",
                      }}
                    >
                      {favoritePostCount}
                    </Typography>
                    <NotificationsNoneIcon
                      sx={{ marginLeft: 2, marginRight: 2 }}
                    />
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "16px",
                        }}
                      >
                        {user.name}
                      </Typography>
                    </IconButton>
                  </Typography>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <>
                      <MenuItem key={setting.title} onClick={setting.action}>
                        {setting.icon}
                        <Typography textAlign="center">
                          {setting.title}
                        </Typography>
                      </MenuItem>
                      <Divider sx={{ boderyStyle: "dashed" }} />
                    </>
                  ))}
                </Menu>
              </Box>
              <Button
                onClick={() => navigate("/createPost")}
                variant="contained"
                sx={{ m: 2 }}
              >
                Đăng tin
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button onClick={() => navigate("/login")} variant="contained">
                Đăng nhập
              </Button>
              <Button onClick={() => navigate("/register")} variant="contained">
                Đăng ký
              </Button>
              <Button
                onClick={() => navigate("/createPost")}
                variant="contained"
              >
                Đăng tin
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainHeader;
