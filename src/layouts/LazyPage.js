import { Box, Container, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Lazy_1 from "../images/Lazy_1.png";
import Lazy_2 from "../images/Lazy_2.png";
import Lazy_3 from "../images/Lazy_3.png";
import Lazy_4 from "../images/Lazy_4.png";
import Lazy_5 from "../images/Lazy_5.png";
import Lazy_6 from "../images/Lazy_6.png";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

function Lazy() {
  const images = [Lazy_1, Lazy_2, Lazy_3, Lazy_4, Lazy_5, Lazy_6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleButtonClickNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleButtonClickPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleButtonClickNext();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  });

  const customIconStyles = {
    fontSize: "100px",
    color: "orange",
    transition: "color 0.3s, box-shadow 0.3s",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
  };

  const currentImage = images[currentImageIndex];

  return (
    <Container
      maxWidth={false}
      style={{ padding: 0, marginTop: 1, marginBottom: 5 }}
    >
      <Box
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <img
          width="100%"
          height="auto"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={currentImage}
          alt="Lazy"
        />

        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <IconButton onClick={handleButtonClickPrevious} sx={customIconStyles}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton onClick={handleButtonClickNext} sx={customIconStyles}>
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
}

export default Lazy;
