import { Container, Typography, Grid } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";

function ContactPage() {
  return (
    <Container>
      <Helmet>
        <title>Liên hệ | Chợ đất Tây Nguyên</title>
      </Helmet>

      <Typography
        variant="h4"
        sx={{ m: 3, textAlign: "center", fontWeight: "bold" }}
      >
        THÔNG TIN LIÊN HỆ
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            CHỢ ĐẤT TÂY NGUYÊN
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Trụ sở chính Gia Lai
          </Typography>
          <Typography>
            Số 99 đường Lê Lợi, Xã Nghĩa Hưng, Huyện Chư Păh, Tỉnh Gia Lai
            <br /> Điện thoại: (+84) 372 75 7777 | (+84) 906 814 777 <br />
            Tổng đài CSKH: (+84) 372 75 7777
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Chi nhánh Kon Tum
          </Typography>
          <Typography>
            Thị trấn Đăk Hà, huyện Đăk Hà, tỉnh Kon Tum.
            <br /> Điện thoại: (+84) 972 722 677 | (+84) 906 814 777 <br />
            Tổng đài CSKH: (+84) 372 75 7777
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Chi nhánh Đăk Lăk
          </Typography>
          <Typography>
            Số 129 đường Lê Duẩn, Thị trấn Phước An, Huyện Krông Păk, Tỉnh Đăk
            Lắk
            <br /> Điện thoại: (+84) 908 375 666 | (+84) 906 814 777 <br />
            Tổng đài CSKH: (+84) 372 75 7777
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Chi nhánh Lâm Đồng
          </Typography>
          <Typography>
            Số 08, đường Yersin, TP. Đà Lạt, tỉnh Lâm Đồng
            <br /> Điện thoại: (+84) 98 443 5656 | (+84) 906 814 777 <br />
            Tổng đài CSKH: (+84) 372 75 7777
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactPage;
