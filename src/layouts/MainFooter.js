import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MailIcon from "@mui/icons-material/Mail";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FormCollectEmail from "../components/FormCollectEmail";
import { useNavigate } from "react-router-dom";

const ICON_LINK = [
  {
    name: "twitter",
    icon: (
      <Link
        href="https://tiktok.com/@chodattaynguyen.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon sx={{ color: "#1DA1F2", width: "40px", height: "40px" }} />
      </Link>
    ),
  },
  {
    name: "facebook",
    icon: (
      <Link
        href="https://facebook.com/ChoDatTayNguyen"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon
          sx={{ color: "#1877F2", width: "40px", height: "40px" }}
        />
      </Link>
    ),
  },
  {
    name: "youtube",
    icon: (
      <Link
        href="https://www.youtube.com/@Chodat_TayNguyen"
        target="_blank"
        rel="noopener noreferrer"
      >
        <YouTubeIcon sx={{ color: "#FF0000", width: "40px", height: "40px" }} />
      </Link>
    ),
  },
  {
    name: "instagram",
    icon: (
      <Link
        href="https://facebook.com/ChoDatTayNguyen"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon
          sx={{ color: "#E4405F", width: "40px", height: "40px" }}
        />
      </Link>
    ),
  },
];

const styles = {
  contactStyle: {
    display: "flex",
    alignItems: "center",
    color: "primary.light",
  },
};

function MainFooter() {
  const navigate = useNavigate();
  const handleChangPage = () => {
    navigate("/regulation");
  };

  const footerLinks = [
    { text: "Quy định đăng tin", onClick: handleChangPage },
    { text: "Quy chế hoạt động", onClick: handleChangPage },
    { text: "Điều khoản bảo mật", onClick: handleChangPage },
    { text: "Góp ý, báo lỗi", onClick: handleChangPage },
  ];

  return (
    <Container maxWidth="lg" sx={{ pt: 3 }}>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Stack spacing={1}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textAlign: "left" }}
            >
              CHỢ ĐẤT TÂY NGUYÊN
            </Typography>
            {footerLinks.map((link, index) => (
              <Typography
                key={index}
                variant="subtitle2"
                color="primary.light"
                sx={{ textAlign: "left", cursor: "pointer" }}
                onClick={link.onClick}
              >
                {link.text}
              </Typography>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack spacing={1}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textAlign: "left" }}
            >
              LIÊN HỆ
            </Typography>
            <Box sx={styles.contactStyle}>
              <AddBusinessIcon />
              <Typography ml={1} variant="subtitle2">
                Nghĩa Hưng, Chư Păh, Gia Lai
              </Typography>
            </Box>
            <Box sx={styles.contactStyle}>
              <ContactPhoneIcon />
              <Typography ml={1} variant="subtitle2">
                +84 372 75 7777
              </Typography>
            </Box>
            <Box sx={styles.contactStyle}>
              <MailIcon />
              <Typography ml={1} variant="subtitle2">
                info@chodattaynguyen.com
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack spacing={1}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ textAlign: "left" }}
            >
              KẾT NỐI VỚI CHÚNG TÔI
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <Stack mt={1} spacing={3} direction="row" name="link">
                {ICON_LINK.map((value) => (
                  <Tooltip
                    sx={{
                      "&:hover": {
                        opacity: [0.9, 0.8, 0.7],
                        cursor: "pointer",
                      },
                    }}
                    key={value.name}
                    title={value.name}
                    enterDelay={500}
                    leaveDelay={200}
                  >
                    {value.icon}
                  </Tooltip>
                ))}
              </Stack>
            </Box>
            <Box>
              <FormCollectEmail />
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ my: 1 }}
      >
        {`Copyright © `}
        <Link color="inherit" href="https://chodattaynguyen.com">
          www.chodattaynguyen.com
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ my: 1 }}
      >
        Website đang trong quá trình xây dựng và hoàn thiện
      </Typography>
    </Container>
  );
}

export default MainFooter;
