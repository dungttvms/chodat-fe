import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import cattuong from "../images/partner/cattuong.jpg";
import cityland from "../images/partner/cityland.jpg";
import duchung from "../images/partner/duchung.jpg";
import hausland from "../images/partner/hausland.jpg";
import Kimtinh from "../images/partner/Kimtinh.jpg";
import sadec from "../images/partner/sadec.jpg";
import saigonreal from "../images/partner/saigonreal.jpg";
import spland from "../images/partner/spland.jpg";
import trustland from "../images/partner/trustland.jpg";
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
      <Typography>ĐỐI TÁC THƯƠNG MẠI</Typography>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        partialVisible={true}
        responsive={responsive}
        ssr={true}
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
        itemClass="carousel-item-padding-40-px"
      >
        <div>
          <img height="150" width="200" src={cattuong} alt="Cattuong" />
        </div>
        <div>
          <img height="150" width="200" src={cityland} alt="Cityland" />
        </div>
        <div>
          <img height="150" width="200" src={duchung} alt="Duchung" />
        </div>
        <div>
          <img height="150" width="200" src={hausland} alt="Hausland" />
        </div>
        <div>
          <img height="150" width="200" src={Kimtinh} alt="Kimtinh" />
        </div>
        <div>
          <img height="150" width="200" src={sadec} alt="Sadec" />
        </div>
        <div>
          <img height="150" width="200" src={saigonreal} alt="Saigonreal" />
        </div>
        <div>
          <img height="150" width="200" src={spland} alt="SPLand" />
        </div>
        <div>
          <img height="150" width="200" src={trustland} alt="Trustland" />
        </div>
      </Carousel>
    </Container>
  );
};

export default PartnerCarousel;
