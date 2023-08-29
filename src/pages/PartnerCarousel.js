import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Smartvina from "../images/partner/Smartvina.jpg";
import Phucminh from "../images/partner/Phucminh.jpg";
import Aic from "../images/partner/Aic.jpg";
import techpro from "../images/partner/techpro.png";
import asic from "../images/partner/asic.jpg";
import dragon from "../images/partner/dragon.jpg";
import gga from "../images/partner/gga.jpg";
import loctroi from "../images/partner/loctroi.jpg";
import nsj from "../images/partner/nsj.png";
import { Container, Typography } from "@mui/material";

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
      <Typography variant="h5" fontWeight="bold" color="#ffffff">
        ĐỐI TÁC THƯƠNG MẠI
      </Typography>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        partialVisible={false}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={deviceType !== "mobile" ? true : false}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div>
          <img height="200" width="250" src={Smartvina} alt="Smartvina" />
        </div>
        <div>
          <img height="200" width="250" src={Phucminh} alt="Phucminh" />
        </div>
        <div>
          <img height="200" width="250" src={Aic} alt="Aic" />
        </div>
        <div>
          <img height="200" width="250" src={techpro} alt="techpro" />
        </div>
        <div>
          <img height="200" width="250" src={asic} alt="asic" />
        </div>
        <div>
          <img height="200" width="250" src={dragon} alt="dragon" />
        </div>
        <div>
          <img height="200" width="250" src={gga} alt="gga" />
        </div>
        <div>
          <img height="200" width="250" src={loctroi} alt="loctroi" />
        </div>
        <div>
          <img height="200" width="250" src={nsj} alt="nsj" />
        </div>
      </Carousel>
    </Container>
  );
};

export default PartnerCarousel;
