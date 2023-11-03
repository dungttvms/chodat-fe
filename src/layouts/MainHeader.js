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
import FavoriteIcon from "@mui/icons-material/Favorite";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Avatar, Divider, Stack, Tooltip, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function MainHeader() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

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
    setTimeout(() => {
      handleCloseUserMenu();
    }, 3000);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = async () => {
    try {
      await logout(() => {
        navigate("/HomePage");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePassword = () => {
    try {
      navigate("/changePassword");
    } catch (error) {
      console.error(error);
    }
  };
  const handleAdminControl = () => {
    try {
      navigate("admin/controlpanel");
    } catch (error) {
      console.error(error);
    }
    handleCloseUserMenu();
  };

  const handleProfile = () => {
    try {
      navigate(`/users/me`);
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePosts = () => {
    try {
      navigate(`/posts/favoritePosts`);
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateNewPost = () => {
    try {
      navigate("/createNewPost");
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  };

  const pages = [
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
  ];
  let settings = [
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
      settings.push({
        title: "Thay đổi mật khẩu",
        action: handlePassword,
        icon: <LockOpenIcon />,
      });
    }

    if (user && user.role === "admin") {
      settings.push(
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

    settings.push({
      title: "Đăng xuất",
      action: handleLogOut,
      icon: <LogoutIcon />,
    });
  }

  settings = settings.filter((item) => item !== null);

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
                        {user.name}
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
