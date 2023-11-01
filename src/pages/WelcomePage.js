import React, { useEffect, useState } from "react";
import background from "../images/Welcome.png";
import background2 from "../images/Welcome2.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { getViewerCount } from "../features/user/userSlice";

const welcomePageStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const buttonContainerStyle = {
  position: "absolute",
  left: "50%",
  top: "85%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "none",
  padding: "20px",
  borderRadius: "10px",
};

function WelcomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backgroundImage = isMobile ? background2 : background;

  return (
    <div
      style={{
        ...welcomePageStyle,
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div style={buttonContainerStyle}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(getViewerCount());
            navigate("/HomePage");
          }}
        >
          TRUY CẬP WEBSITE
        </Button>
      </div>
    </div>
  );
}

export default WelcomePage;
