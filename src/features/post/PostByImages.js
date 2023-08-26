import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URL } from "../../app/config";

import CHUSE from "../../images/ChuSe.jpg";
import CHUPAH from "../../images/Chupah.jpg";
import DUCCO from "../../images/DucCo.jpg";
import IAGRAI from "../../images/Iagrai.jpg";
import PLEIKU from "../../images/Pleiku.jpg";

const ImageStyled = styled("div")({
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "100%",
  borderRadius: "5%",
  cursor: "pointer", // Add cursor pointer
});

const TypographyStyled = styled("p")({
  top: 12,
  left: 12,
  color: "#123456",
  padding: "8px",
  width: "100%",
  textAlign: "left",
});

function PostByImages() {
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleImageClick = (slug) => {
    navigate(`/${slug}`); // Navigate to the corresponding slug
  };

  return (
    <Container>
      <Typography variant="h5">TIN ĐĂNG THEO ĐỊA ĐIỂM</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ImageStyled
            onClick={() => handleImageClick("chu-pah")}
            height="425px"
            width="530px"
          >
            <img src={`${FRONTEND_URL}${CHUPAH}`} alt="Chợ đất Chư Păh" />

            <Typography variant="h6" component="div">
              <TypographyStyled>Chợ đất Chư Păh</TypographyStyled>
            </Typography>
          </ImageStyled>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {[
              { image: PLEIKU, name: "Chợ đất Pleiku", slug: "pleiku" },
              { image: DUCCO, name: "Chợ đất Đức Cơ", slug: "duc-co" },
              { image: CHUSE, name: "Chợ đất Chư Sê", slug: "chu-se" },
              { image: IAGRAI, name: "Chợ đất Ia Grai", slug: "ia-grai" },
            ].map((item, index) => (
              <Grid item xs={6} key={index} position="relative">
                <ImageStyled
                  onClick={() => handleImageClick(item.slug)} // Handle image click
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "90%",
                      borderRadius: "3%",
                    }}
                  />
                  <TypographyStyled position="absolute">
                    {item.name}
                  </TypographyStyled>
                </ImageStyled>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PostByImages;
