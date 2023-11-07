import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  Container,
  IconButton,
  Typography,
  Stack,
  Tooltip,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../components/Logo";
import ListIcon from "@mui/icons-material/List";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function MainHeader() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px");

  const pages = useMemo(
    () => [
      {
        title: "GIỚI THIỆU",
        action: () => navigate("/introduce"),
      },
      {
        title: "PHONG THỦY",
        action: () => navigate("/blogs/blog/Phong thủy"),
      },
      {
        title: "TIN TỨC",
        action: () => navigate("/blogs/blog/Tin tức"),
      },
      {
        title: "NHÀ ĐẸP",
        action: () => navigate("/blogs/blog/Nhà đẹp"),
      },
      {
        title: "LIÊN HỆ",
        action: () => navigate("/contact"),
      },
    ],
    [navigate]
  );

  const { logout, isAuthenticated, user } = useAuth();

  const favoritePostCount = useMemo(() => user?.favoritePostList?.length, [
    user,
  ]);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleOpenUserMenu = useCallback(
    (event) => {
      setAnchorElUser(event.currentTarget);
      setTimeout(() => {
        handleCloseUserMenu();
      }, 3000);
    },
    [handleCloseUserMenu]
  );

  const handleLogOut = useCallback(async () => {
    try {
      await logout(() => {
        navigate("/HomePage");
      });
    } catch (error) {
      console.error(error);
    }
  }, [logout, navigate]);

  const handlePassword = useCallback(() => {
    try {
      navigate("/changePassword");
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  const handleAdminControl = useCallback(() => {
    try {
      navigate("admin/controlpanel");
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  }, [navigate, handleCloseUserMenu]);

  const handleProfile = useCallback(() => {
    try {
      navigate(`/users/me`);
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  }, [navigate, handleCloseUserMenu]);

  const handlePosts = useCallback(() => {
    try {
      navigate(`/posts/favoritePosts`);
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  }, [navigate, handleCloseUserMenu]);

  const handleCreateNewPost = useCallback(() => {
    try {
      navigate("/createNewPost");
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  }, [navigate, handleCloseUserMenu]);

  const settings = useMemo(() => {
    const settingsArray = [
      {
        title: "Quản lý tin yêu thích",
        action: handlePosts,
        icon: <ListIcon />,
      },
      {
        title: "Thông tin tài khoản",
        action: handleProfile,
        icon: <AccountBoxIcon />,
      },
    ];

    if (isAuthenticated) {
      if (user?.isGoogleAuth === false) {
        settingsArray.push({
          title: "Thay đổi mật khẩu",
          action: handlePassword,
          icon: <LockOpenIcon />,
        });
      }

      if (user && user.role === "admin") {
        settingsArray.push(
          {
            title: "Đăng tin",
            action: handleCreateNewPost,
            icon: <EditNoteIcon />,
          },
          {
            title: "Quản lý Website",
            action: handleAdminControl,
            icon: <AdminPanelSettingsIcon />,
          }
        );
      }

      settingsArray.push({
        title: "Đăng xuất",
        action: handleLogOut,
        icon: <LogoutIcon />,
      });
    }

    return settingsArray;
  }, [
    isAuthenticated,
    user,
    handlePosts,
    handlePassword,
    handleAdminControl,
    handleProfile,
    handleCreateNewPost,
    handleLogOut,
  ]);

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
            {isMobile && (
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
            )}
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
                  pl={1}
                  pr={1}
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
                    component={"span"}
                    variant={"body2"}
                    sx={{ display: "flex", alignItems: "center", p: 2 }}
                  >
                    <FavoriteIcon />
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "16px",
                        ml: 1,
                        mr: 3,
                      }}
                    >
                      {favoritePostCount}
                    </Typography>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "16px",
                        }}
                      >
                        {user?.name}
                      </Typography>
                      <Avatar src={user?.avatar} sx={{ ml: 2 }} />
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
                    <div key={setting.title}>
                      <MenuItem key={setting.title} onClick={setting.action}>
                        {setting.icon}
                        <Typography textAlign="center">
                          {setting.title}
                        </Typography>
                      </MenuItem>
                      <Divider sx={{ boderyStyle: "dashed" }} />
                    </div>
                  ))}
                </Menu>
              </Box>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button onClick={() => navigate("/login")} variant="contained">
                Đăng nhập
              </Button>
              <Button onClick={() => navigate("/register")} variant="contained">
                Đăng ký
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainHeader;
