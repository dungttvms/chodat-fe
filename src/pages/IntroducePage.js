import React from "react";
import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

function IntroducePage() {
  return (
    <Container>
      <Helmet>
        <title>Giới thiệu | Chợ đất Gia Lai</title>
      </Helmet>
      <Typography
        variant="h4"
        sx={{ m: 3, textAlign: "center", fontWeight: "bold" }}
      >
        VỀ CHÚNG TÔI
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        GIỚI THIỆU VỀ CHODATGIALAI.COM
      </Typography>
      <Typography
        sx={{ textAlign: "justify", marginLeft: "auto", marginRight: "auto" }}
      >
        chodatgialai.com là website số 1 về bất động sản tại Việt Nam(*) giúp
        những người tìm kiếm bất động sản tìm được ngôi nhà của mình với hàng
        triệu tin đăng bất động sản mỗi tháng và những thông tin, tư vấn giúp họ
        có thể tự tin hơn mỗi khi ra quyết định liên quan tới bất động sản.
        chodatgialai.com cũng là nền tảng công nghệ và đối tác tin cậy đối với
        các cá nhân, doanh nghiệp kinh doanh bất động sản và các chủ đầu tư
        trong việc truyền thông, nghiên cứu thị trường dựa trên các dữ liệu lớn
        (big data) trực tuyến và cung cấp các ứng dụng, giải pháp bán hàng và
        quản lý bán hàng, marketing trong lĩnh vực bất động sản.
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        (*) Theo kết quả báo cáo điều tra thị trường “Property Portal Usage
        2021” ngày 17/08/21 của Kadence International.
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, mt: 2, fontWeight: "bold" }}>
        GIỚI THIỆU CÔNG TY TNHH CODERSCHOOL
      </Typography>
      <Typography
        sx={{ textAlign: "justify", marginLeft: "auto", marginRight: "auto" }}
      >
        Nguồn nhân lực lập trình viên chất lượng tại khu vực châu Á nói chung và
        Việt Nam nói riêng vẫn đang trong tình trạng thiếu hụt. CoderSchool mong
        muốn giải quyết vấn đề này với những khóa học dễ tiếp cận và chất lượng.
        <br />
        Từ 2015, CoderSchool đã giúp hàng ngàn học viên từ đủ các ngành nghề bắt
        đầu sự nghiệp mới trong ngành Tech.
        <br />
        CoderSchool mang đến cho học viên giáo trình thực tế chuẩn Silicon
        Valley và luôn được cập nhật kết hợp với phương pháp học trực tuyến hiệu
        quả cùng Mentor. Trên hành trình thực hiện mục tiêu của mình.
        <br />
        CoderSchool vui mừng được được đồng hành bởi những quỹ đầu tư Monk's
        Hill Ventures, TRIVE, Iterative, XA Network, và iSeed Ventures.
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, mt: 2, fontWeight: "bold" }}>
        CÁC SẢN PHẨM/DỊCH VỤ
      </Typography>
      <Typography
        sx={{ textAlign: "justify", marginLeft: "auto", marginRight: "auto" }}
      >
        - Dịch vụ truyền thông trên nền tảng website https://chodatgialai.com:
        <br />
        + Tin đăng
        <br />
        + Banner
        <br />
        + Bài PR
        <br />
        - FastKey
        <br />
        - Giải pháp công nghệ dành riêng cho doanh nghiệp bất động sản (chủ đầu
        tư, sàn giao dịch) <br />
        - Các sự kiện trong ngành bất động sản: <br />
        + Hội nghị Bất động sản Việt Nam (Viet Nam Real Estate Summit - VRES)
        <br />
        + Giải thưởng Bất động sản Việt Nam CoderSchool (CoderSchool Vietnam
        Property Awards - VPA) <br />
        + Các sự kiện và chương trình đào tạo đồng hành cùng nhà môi giới bất
        động sản (Expert Talk, Expert Coaching…) <br />
        - Giải pháp và dữ liệu nghiên cứu thị trường <br />
        - Giải thưởng Bất động sản Việt Nam CoderSchool (CoderSchool Vietnam
        Property Awards - VPA) <br />
        - Sản xuất nội dung với nhiều định dạng khác nhau như video, bài viết,
        bài viết long-form, phỏng vấn chuyên sâu... <br />- Tư vấn và thực hiện
        các kế hoạch truyền thông, marketing trong lĩnh vực bất động sản
      </Typography>
    </Container>
  );
}

export default IntroducePage;
