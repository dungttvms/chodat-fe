import React from "react";
import { Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

function IntroducePage() {
  return (
    <Container>
      <Helmet>
        <title>Giới thiệu | Chợ đất Tây Nguyên</title>
      </Helmet>
      <Typography
        variant="h4"
        sx={{ m: 3, textAlign: "center", fontWeight: "bold" }}
      >
        GIỚI THIỆU VỀ CHODATTAYNGUYEN.COM
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        1. Tổng quan:
      </Typography>
      <Typography sx={{ textAlign: "justify" }}>
        chodattaynguyen.com là nơi hội tụ các thông tin về bất động sản tại khu
        vực Tây Nguyên, bao gồm các loại tài sản như đất đai, nhà ở, căn hộ,
        trang trại, vườn, đồi núi và nhiều loại bất động sản khác. Với sự phát
        triển nhanh chóng, chúng tôi cung cấp một nền tảng hiện đại để bạn dễ
        dàng tìm kiếm và đăng tin mua/bán bất động sản tại khu vực Tây Nguyên.
      </Typography>

      <Typography variant="h5" sx={{ mb: 2, mt: 2, fontWeight: "bold" }}>
        2. Đa dạng và độc đáo:
      </Typography>
      <Typography sx={{ textAlign: "justify" }}>
        Chúng tôi hiểu rằng mỗi bất động sản ở Tây Nguyên có một sự độc đáo
        riêng. Từ những cánh đồng xanh ngút ngàn ở Đắk Lắk, những trang trại
        tĩnh lặng ở Kon Tum, đến những căn hộ hiện đại tại Pleiku - chúng tôi
        cung cấp một loạt các loại tài sản đa dạng để bạn lựa chọn.
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, mt: 2, fontWeight: "bold" }}>
        3. Thông tin chi tiết:
      </Typography>
      <Typography sx={{ textAlign: "justify" }}>
        Mỗi danh mục bất động sản được cung cấp trên trang web
        chodattaynguyen.com đi kèm với thông tin chi tiết về mô tả, giá cả, kích
        thước, vị trí và hình ảnh. Bạn có thể dễ dàng tìm hiểu chi tiết về từng
        tài sản trước khi liên hệ với người bán hoặc chủ sở hữu.
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, mt: 2, fontWeight: "bold" }}>
        4. Đội ngũ hỗ trợ:
      </Typography>
      <Typography sx={{ textAlign: "justify" }}>
        Chúng tôi luôn sẵn sàng hỗ trợ bạn trong việc tìm kiếm và giao dịch bất
        động sản. Đội ngũ hỗ trợ của chúng tôi sẽ hỗ trợ bạn trong mọi bước của
        quá trình - từ tìm kiếm đến đàm phán và thủ tục pháp lý.
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, mt: 2, fontWeight: "bold" }}>
        5. Đăng tin miễn phí:
      </Typography>
      <Typography sx={{ textAlign: "justify" }}>
        Chúng tôi cung cấp dịch vụ đăng tin miễn phí để giúp bạn đưa thông tin
        về tài sản của bạn lên trang web và tiếp cận một lượng lớn người tìm
        kiếm.
        <br /> Chodattaynguyen.com là nơi tuyệt vời để bạn bắt đầu tìm kiếm bất
        động sản tại khu vực Tây Nguyên, cũng như để đăng tin nếu bạn muốn bán
        hoặc cho thuê tài sản của mình. Hãy khám phá trang web của chúng tôi và
        khám phá những cơ hội độc đáo mà khu vực Tây Nguyên có thể mang lại cho
        bạn.
      </Typography>
    </Container>
  );
}

export default IntroducePage;

// import React, { useState } from "react";
// import { Container, Typography, Button } from "@mui/material";
// import { Helmet } from "react-helmet";
// import { Editor, EditorState, RichUtils } from "draft-js";
// import "draft-js/dist/Draft.css";

// function IntroducePage() {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const handleEditorChange = (state) => {
//     setEditorState(state);
//   };

//   const handleKeyCommand = (command, state) => {
//     const newState = RichUtils.handleKeyCommand(state, command);
//     if (newState) {
//       setEditorState(newState);
//       return "handled";
//     }
//     return "not-handled";
//   };

//   const toggleInlineStyle = (style) => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, style));
//   };

//   return (
//     <Container>
//       <Helmet>
//         <title>Giới thiệu | Chợ đất Tây Nguyên</title>
//       </Helmet>
//       <Typography
//         variant="h4"
//         sx={{ m: 3, textAlign: "center", fontWeight: "bold" }}
//       >
//         GIỚI THIỆU VỀ CHODATTAYNGUYEN.COM
//       </Typography>

//       <Button onClick={() => toggleInlineStyle("BOLD")}>Bold</Button>
//       <Button onClick={() => toggleInlineStyle("ITALIC")}>Italic</Button>
//       <Button onClick={() => toggleInlineStyle("UNDERLINE")}>Underline</Button>

//       <div
//         style={{
//           border: "1px solid #ddd",
//           minHeight: "6em",
//           cursor: "text",
//           padding: "10px",
//           marginTop: "10px",
//         }}
//       >
//         <Editor
//           editorState={editorState}
//           onChange={handleEditorChange}
//           handleKeyCommand={handleKeyCommand}
//         />
//       </div>
//     </Container>
//   );
// }

// export default IntroducePage;
