<<<<<<< HEAD:src/features/post/PostListByImages.js
import { Container } from "@mui/material";
=======
import { Container, Typography } from "@mui/material";
>>>>>>> 77f249606d78a41ad6a8368c9638bb00e0eb42d7:src/features/post/PostByImages.js
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD:src/features/post/PostListByImages.js
=======
import CHUSE from "../../images/ChuSe.jpg";
import CHUPAH from "../../images/Chupah.jpg";
import DUCCO from "../../images/DucCo.jpg";
import IAGRAI from "../../images/Iagrai.jpg";
import PLEIKU from "../../images/Pleiku.jpg";
>>>>>>> 77f249606d78a41ad6a8368c9638bb00e0eb42d7:src/features/post/PostByImages.js

import kontum from "../../images/province_images/kontum.jpg";
import gialai from "../../images/province_images/gia lai.jpg";
import daklak from "../../images/province_images/dak lak.png";
import daknong from "../../images/province_images/dak nong.jpg";
import lamdong from "../../images/province_images/lam dong.jpg";

function PostListByImages({ deviceType }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 20,
    },
  };

  const navigate = useNavigate();

  const provinces = [
    {
      name: "kontum",
      title: "Kon Tum",
      image: kontum,
    },
    {
      name: "gialai",
      title: "Gia Lai",
      image: gialai,
    },
    {
      name: "daklak",
      title: "Đăk Lăk",
      image: daklak,
    },
    {
      name: "daknong",
      title: "Đăk Nông",
      image: daknong,
    },
    {
      name: "lamdong",
      title: "Lâm Đồng",
      image: lamdong,
    },
  ];

  return (
    <Container sx={{ p: 3 }}>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        partialVisible={false}
        responsive={responsive}
        ssr={true}
        focusOnSelect={true}
        centerMode={true}
        infinite={true}
        autoPlay={deviceType !== "mobile" ? true : false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-20-px"
      >
        {provinces.map((province, index) => (
          <div
            key={index}
            onClick={() => navigate(`/posts?province=${province.name}`)}
            style={{
              position: "relative",
              cursor: "pointer",
              margin: "10px",
              transition: "opacity 0.3s, transform 0.3s", // Thêm hiệu ứng cho hover
              "&:hover": {
                opacity: 0.8, // Giảm độ trong suốt khi hover
                transform: "scale(1.05)", // Phóng to hình ảnh khi hover
              },
            }}
          >
            <img
              height="200"
              width="250"
              src={province.image}
              alt={province.name}
            />
            <span
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: "5px",
                fontSize: "12px",
              }}
            >
              {`Chợ đất ${province.title}`}
            </span>
          </div>
        ))}
      </Carousel>
    </Container>
  );
}

export default PostListByImages;
