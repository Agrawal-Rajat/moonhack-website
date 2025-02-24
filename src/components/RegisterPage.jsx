import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import './RegisterPage.css'

const RegisterPage = () => {
  const [screenshot, setScreenshot] = useState(null);

  // useEffect(() => {
  //   gsap.from(".register-form", {
  //     opacity: 0,
  //     y: 30,
  //     duration: 1,
  //     ease: "power3.out",
  //   });
  // }, []);

  const handleScreenshotUpload = (event) => {
    setScreenshot(event.target.files[0]);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        color: "#ffffff",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div className="register-form" style={{ width: "100%" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "900",
            fontSize: "3rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            mb: 3,
          }}
        >
          MOONHACK REGISTRATION
        </Typography>

        {/* Personal Details */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Contact"
              variant="outlined"
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email ID"
              variant="outlined"
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="College/School Name"
              variant="outlined"
              sx={inputStyle}
            />
          </Grid>
        </Grid>

        <Typography
          variant="h6"
          sx={{ marginTop: 3, fontWeight: "bold", mb: 2 }}
        >
          Team Details
        </Typography>

        {/* Team Details */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Team Name"
              variant="outlined"
              sx={inputStyle}
            />
          </Grid>
          {[2, 3, 4].map((num) => (
            <React.Fragment key={num}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={`Team Member ${num}`}
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Contact"
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="College Name"
                  variant="outlined"
                  sx={inputStyle}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

        {/* Payment Section */}
        <Typography
          variant="h6"
          sx={{ marginTop: 3, fontWeight: "bold", mb: 2 }}
        >
          Payment (Registration Fee: ₹400)
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/assets/qr-code.png"
              alt="QR Code"
              style={{ width: "120px", borderRadius: "10px" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="body1">
              Scan QR Code & Pay ₹400
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="UTR Number"
              variant="outlined"
              sx={inputStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={buttonStyle}
            >
              Upload Payment Screenshot
              <input type="file" hidden onChange={handleScreenshotUpload} />
            </Button>
          </Grid>
          {screenshot && (
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Screenshot Uploaded: {screenshot.name}
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Submit Button */}
        <Button variant="contained" color="primary" fullWidth sx={buttonStyle}>
          Submit Registration
        </Button>
      </motion.div>
    </Container>
  );
};

// Oval input field styling
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    color: "#ffffff",
    padding: "5px",
    transition: "all 0.3s ease",
    "& fieldset": { borderColor: "#444", transition: "border 0.3s ease" },
    "&:hover fieldset": { borderColor: "#666" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
  "& .MuiInputLabel-root": {
    color: "#bbb",
    transition: "color 0.3s ease",
  },
  "& .MuiInputBase-input": {
    color: "#ffffff",
    padding: "10px 15px",
  },
};

// Smooth button styling
const buttonStyle = {
  backgroundColor: "#1976d2",
  color: "#ffffff",
  fontWeight: "bold",
  borderRadius: "30px",
  textTransform: "uppercase",
  padding: "12px",
  marginTop: "15px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#1565c0",
    transform: "scale(1.02)",
  },
};

export default RegisterPage;
