import { Container, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";

function ContactPage() {
  return (
    <Container>
      <Helmet>Chợ đất Gia Lai | Thông tin liên hệ</Helmet>
      <Typography
        variant="h4"
        sx={{ m: 3, textAlign: "center", fontWeight: "bold" }}
      >
        THÔNG TIN LIÊN HỆ
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold", ml: 3 }}>
        CHỢ ĐẤT GIA LAI
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", m: 3, mb: 1 }}>
        Trụ sở chính Gia Lai
      </Typography>
      <Typography sx={{ ml: 3 }}>
        Số 99 đường Lê Lợi, Xã Nghĩa Hưng, Huyện Chư Păh, Tỉnh Gia Lai
        <br /> Điện thoại: (+84) 372 75 7777 | (+84) 906 814 777 <br />
        Tổng đài CSKH: 1900 969659
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", m: 3, mb: 1 }}>
        Chi nhánh TP. Hồ Chí Minh
      </Typography>
      <Typography sx={{ ml: 3 }}>
        Số 130/13 Trần Thái Tông, phường 15, Quận Tân Bình, TP. Hồ Chí Minh.
        <br /> Điện thoại: (+84) 372 75 7777 | (+84) 906 814 777 <br />
        Tổng đài CSKH: 1900 969659
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", m: 3, mb: 1 }}>
        Chi nhánh Quảng Nam
      </Typography>
      <Typography sx={{ ml: 3 }}>
        Số 08, đường Hồ Nghinh, phường Tân Thạnh, TP. Tam Kỳ, Tỉnh Quảng Nam
        <br /> Điện thoại: (+84) 372 75 7777 | (+84) 906 814 777 <br />
        Tổng đài CSKH: 1900 969659
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: "bold", m: 3, mb: 1 }}>
        Chi nhánh Đăk Lăk{" "}
      </Typography>
      <Typography sx={{ ml: 3 }}>
        Số 129 đường Lê Duẩn, Thị trấn Phước An, Huyện Krông Păk, Tỉnh Đăk Lắk
        <br /> Điện thoại: (+84) 372 75 7777 | (+84) 906 814 777 <br />
        Tổng đài CSKH: 1900 969659
      </Typography>
    </Container>
  );
}

export default ContactPage;
