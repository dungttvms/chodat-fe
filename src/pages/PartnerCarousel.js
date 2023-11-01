import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Smartvina from "../images/partner_images/Smartvina.jpg";
import Capitalland from "../images/partner_images/Capitalland.png";
import DLGL from "../images/partner_images/Duc Long.jpg";
import HAGL from "../images/partner_images/HAGL Logo.png";
import HungThinh from "../images/partner_images/Hung Thinh.jpg";
import Masterise from "../images/partner_images/Masterise-Homes.png";
import QCGL from "../images/partner_images/Quoc Cuong.png";
import TrungNguyen from "../images/partner_images/Trung Nguyen.jpg";
import VinHomes from "../images/partner_images/VinHome.png";
import { Container, Stack, Typography } from "@mui/material";

const partnerImages = [
  { src: Smartvina, alt: "Smartvina" },
  { src: Capitalland, alt: "Capitalland" },
  { src: DLGL, alt: "DLGL" },
  { src: HAGL, alt: "HAGL" },
  { src: HungThinh, alt: "HungThinh" },
  { src: Masterise, alt: "Masterise" },
  { src: QCGL, alt: "QCGL" },
  { src: TrungNguyen, alt: "TrungNguyen" },
  { src: VinHomes, alt: "VinHomes" },
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
