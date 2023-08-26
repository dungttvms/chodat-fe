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
// import BCT from "../images/Bo_Cong_Thuong.png";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FormCollectEmail from "../components/FormCollectEmail";

const ICON_LINK = [
  {
    name: "twitter",
    icon: (
      <Link href="#" target="_blank" rel="twitter">
        <TwitterIcon sx={{ color: "#1DA1F2", width: "40px", height: "40px" }} />
      </Link>
    ),
  },
  {
    name: "facebook",
    icon: (
      <Link
        href="https://facebook.com/SmartVina2019"
        target="_blank"
        rel="facebook"
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
      <Link href="#" target="_blank" rel="youtube">
        <YouTubeIcon sx={{ color: "#FF0000", width: "40px", height: "40px" }} />
      </Link>
    ),
  },
  {
    name: "instagram",
    icon: (
      <Link href="#" target="_blank" rel="instagram">
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
    alignContent: "center",
    color: "primary.light",
  },
};

function MainFooter() {
  return (
    <Container maxWidth={false}>
      <Grid>
        <Box
          name="contact"
          sx={{
            height: { xs: 450, md: 180 },
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-evenly",
            p: 1,
          }}
        >
          <Box>
            <Stack spacing={1} name="contact">
              <Typography
                sx={{ display: "flex", justifyContent: "left" }}
                mb={{ sm: 2, xs: 0 }}
                variant="h6"
              >
                CHỢ ĐẤT GIA LAI
              </Typography>
              <Box sx={styles.contactStyle} component="div">
                <Typography ml={1} variant="subtitle2">
                  Thôn 6, Nghĩa Hưng, Chư Păh, Gia Lai
                </Typography>
              </Box>
              <Box sx={styles.contactStyle} component="div">
                <Typography ml={1} variant="subtitle2">
                  0372.75.7777
                </Typography>
              </Box>
              <Box sx={styles.contactStyle} component="div">
                <Typography ml={1} variant="subtitle2">
                  Câu hỏi thường gặp
                </Typography>
              </Box>
              <Box sx={styles.contactStyle} component="div">
                <Typography ml={1} variant="subtitle2">
                  Góp ý, báo lỗi
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box>
            <Stack spacing={1} name="contact">
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                mb={{ sm: 2, xs: 0 }}
                variant="h6"
              >
                LIÊN HỆ
              </Typography>
              <Box sx={styles.contactStyle} component="div">
                <AddBusinessIcon />
                <Typography ml={1} variant="subtitle2">
                  Nghĩa Hưng, Chư Păh, Gia Lai
                </Typography>
              </Box>
              <Box sx={styles.contactStyle} component="div">
                <ContactPhoneIcon />
                <Typography ml={1} variant="subtitle2">
                  +84 372 75 7777
                </Typography>
              </Box>
              <Box sx={styles.contactStyle} component="div">
                <MailIcon />
                <Typography ml={1} variant="subtitle2">
                  info@chodatgialai.com
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box>
            <Stack spacing={1} name="contact">
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                mb={{ sm: 2, xs: 0 }}
                variant="h6"
              >
                KẾT NỐI VỚI CHÚNG TÔI
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
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
          </Box>
        </Box>
      </Grid>
      <Typography variant="body2" color="text.secondary" align="center" p={1}>
        {"Copyright © "}
        <Link color="inherit" href="https://www.chodatgialai.com">
          www.chodatgialai.com
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" p={1}>
        Website đang trong quá trình xây dựng và hoàn thiện
      </Typography>
    </Container>
  );
}

export default MainFooter;
