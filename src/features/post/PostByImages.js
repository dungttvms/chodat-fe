import { Container, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import CHUSE from "../../images/ChuSe.jpg";
import CHUPAH from "../../images/Chupah.jpg";
import DUCCO from "../../images/DucCo.jpg";
import IAGRAI from "../../images/Iagrai.jpg";
import PLEIKU from "../../images/Pleiku.jpg";

function PostByImages({ deviceType }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };
  const navigate = useNavigate();

  const images = [
    { src: CHUSE, slug: "chu-se", title: "huyện Chư Sê" },
    { src: CHUPAH, slug: "chu-pah", title: "huyện Chư Păh" },
    { src: PLEIKU, slug: "pleiku", title: "TP. Pleiku" },
    { src: DUCCO, slug: "duc-co", title: "huyện Đức Cơ" },
    { src: IAGRAI, slug: "ia-grai", title: "huyện Ia Grai" },
  ];

  return (
    <Container>
      <Typography Container variant="h5" fontWeight="bold" color="#ffffff">
        TIN ĐĂNG THEO ĐỊA ĐIỂM
      </Typography>
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
        {images.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/district?q=${item.slug}`)}
            style={{
              width: "250px",
              height: "200px",
              margin: "20px",
              backgroundImage: `url(${item.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
              position: "relative",
            }}
            className="image-box"
          >
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
              className="image-text"
            >
              {`Chợ đất ${item.title}`}
            </span>
          </div>
        ))}
      </Carousel>
    </Container>
  );
}

export default PostByImages;
