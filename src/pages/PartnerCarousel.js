import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Smartvina from "../images/partner_images/Smartvina.jpg";
import Phucminh from "../images/partner_images/Phucminh.jpg";
import Aic from "../images/partner_images/Aic.jpg";
import techpro from "../images/partner_images/techpro.png";
import asic from "../images/partner_images/asic.jpg";
import dragon from "../images/partner_images/dragon.jpg";
import gga from "../images/partner_images/gga.jpg";
import loctroi from "../images/partner_images/loctroi.jpg";
import nsj from "../images/partner_images/nsj.png";
import { Container, Stack, Typography } from "@mui/material";

const partnerImages = [
  { src: Smartvina, alt: "Smartvina" },
  { src: Phucminh, alt: "Phucminh" },
  { src: Aic, alt: "Aic" },
  { src: techpro, alt: "techpro" },
  { src: asic, alt: "asic" },
  { src: dragon, alt: "dragon" },
  { src: gga, alt: "gga" },
  { src: loctroi, alt: "loctroi" },
  { src: nsj, alt: "nsj" },
];
const PartnerCarousel = ({ deviceType }) => {
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

  return (
    <Container>
      <Stack>
        <Typography
          variant="h5"
          marginBottom={5}
          fontWeight="bold"
          color="#ffffff"
        >
          ĐỐI TÁC PHÁT TRIỂN
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
          {partnerImages.map((image, index) => (
            <div key={index}>
              <img height="200" width="250" src={image.src} alt={image.alt} />
            </div>
          ))}
        </Carousel>
      </Stack>
    </Container>
  );
};

export default PartnerCarousel;
