import React, { useState } from "react";
import Slider from "react-slick";
import { styled } from "@mui/system";

const ImageSlider = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "350px",
  margin: "20px",
  width: "350px",
  overflow: "hidden",

  "& img": {
    width: "75%",
    height: "95%",
    objectFit: "cover",
  },
});

function PostDetailImage({ post }) {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  return (
    <div>
      <Slider
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        centerMode={true}
        centerPadding="0"
      >
        {post.image.map((imageUrl, index) => (
          <ImageSlider key={index}>
            <img src={imageUrl} alt={`Slide ${index}`} />
          </ImageSlider>
        ))}
      </Slider>

      <Slider
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
        accessibility={true}
        adaptiveHeight={true}
        arrows={true}
        autoplaySpeed={3000}
        centerMode={true}
        centerPadding="20px"
      >
        {post.image.map((imageUrl, index) => (
          <div key={index}>
            <img
              height="100px"
              width="100px"
              src={imageUrl}
              alt={`Slide ${index}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default PostDetailImage;
