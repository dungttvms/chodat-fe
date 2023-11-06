import React, { useState, useMemo, useCallback } from "react";
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

  const slider1Settings = useMemo(
    () => ({
      asNavFor: nav2,
      centerMode: true,
      centerPadding: "0",
    }),
    [nav2]
  );

  const slider2Settings = useMemo(
    () => ({
      asNavFor: nav1,
      slidesToShow: 3,
      swipeToSlide: true,
      focusOnSelect: true,
      accessibility: true,
      adaptiveHeight: true,
      arrows: true,
      autoplaySpeed: 3000,
      centerMode: true,
      centerPadding: "20px",
    }),
    [nav1]
  );

  const renderImageSliders = useCallback(() => {
    return post?.image?.map((imageUrl, index) => (
      <ImageSlider key={index}>
        <img src={imageUrl} alt={`Slide ${index}`} />
      </ImageSlider>
    ));
  }, [post?.image]);

  const renderThumbnailSliders = useCallback(() => {
    return post.image.map((imageUrl, index) => (
      <div key={index}>
        <img
          height="100px"
          width="100px"
          src={imageUrl}
          alt={`Slide ${index}`}
        />
      </div>
    ));
  }, [post.image]);

  return (
    <div>
      <Slider {...slider1Settings} ref={(slider1) => setNav1(slider1)}>
        {renderImageSliders()}
      </Slider>

      <Slider {...slider2Settings} ref={(slider2) => setNav2(slider2)}>
        {renderThumbnailSliders()}
      </Slider>
    </div>
  );
}

export default PostDetailImage;
