import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import apiService from "../../app/apiService";

const VerifyEmailTokenPage = () => {
  const { token } = useParams();

  const [verificationStatus, setVerificationStatus] = useState("");

  useEffect(() => {
    async function verifyToken() {
      try {
        await apiService.get(`users/verify-email/${token}`);
        setVerificationStatus("Email verified successfully!");
      } catch (error) {
        setVerificationStatus("Failed to verify email.");
      }
    }
    verifyToken();
  }, [token]);

  return (
    <div>
      <Typography variant="h5">{verificationStatus}</Typography>
    </div>
  );
};

export default VerifyEmailTokenPage;
