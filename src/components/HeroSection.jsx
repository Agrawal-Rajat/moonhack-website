import { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { brown } from "@mui/material/colors";
import heroImage from "../assets/heroImage.png";
import logo1 from "../assets/medicapsLogo.png";
import logo2 from "../assets/technoLogo.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("");
  const titleRef = useRef(null);
  const countdownRef = useRef(null);
  const buttonRef = useRef(null);

  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-03-22T00:00:00");
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) return "00d 00h 00m 00s";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    if (titleRef.current && countdownRef.current && buttonRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
      gsap.fromTo(
        countdownRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          delay: 0.3,
        }
      );
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 }
      );
    }

    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        padding: "0 10%",
        background:
          "radial-gradient(circle at center, #1e293b 30%, #0d1117 90%)",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo Section with Oval Border */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "350px",
          height: "80px",
          border: "1px solid white",
          borderRadius: "75px",
          mb: 3,
          padding: "0 10px",
        }}
      >
        <img
          src={logo1}
          alt="Logo 1"
          style={{
            height: "60px",
            maxWidth: "120px",
            objectFit: "contain",
            marginLeft: "14px",
          }}
        />

        {/* Wrapper to properly align "X" */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#aaa", // Grey color
            }}
          >
            X
          </Typography>
        </Box>

        <img
          src={logo2}
          alt="Logo 2"
          style={{
            height: "130px",
            maxWidth: "150px",
            objectFit: "contain",
            marginRight: "5px",
          }}
        />
      </Box>

      {/* Main Title */}
      <Typography
        ref={titleRef}
        variant="h1"
        sx={{
          fontFamily: "Impact, sans-serif",
          fontSize: "5rem",
          fontWeight: "bold",
        }}
      >
        MOONHACK 2025
      </Typography>

      {/* Subheading */}
      <Typography
        variant="subtitle1"
        sx={{ fontSize: "1.2rem", color: "#aaa", mt: 1 }}
      >
        Innovate. Code. Dominate.
      </Typography>

      {/* Countdown Heading */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mt: 3,
          color: "skyblue", // Soft skin-tone gradient
          textAlign: "center",
          fontSize: "1.3rem",
        }}
      >
        The Countdown Begins Now!
      </Typography>

      {/* Countdown Timer */}
      <Typography
        ref={countdownRef}
        variant="h5"
        sx={{
          fontWeight: "bold",
          mt: 2,
          fontSize: "1.5rem",
          color: "pink",
          letterSpacing: "12px",
          textShadow: "0 0 15px rgba(255, 105, 180, 0.8)", // Neon Glow Effect
          textAlign: "center",
          animation: "pulse 1s ease-in-out infinite alternate",
          "@keyframes pulse": {
            "0%": { transform: "scale(1)", opacity: 1 },
            "100%": { transform: "scale(1.1)", opacity: 0.8 },
          },
        }}
      >
        {timeLeft}
      </Typography>

      {/* Register Button */}
      <Button
        ref={buttonRef}
        variant="contained"
        onClick={() => navigate("/register")}
        sx={{
          mt: 4,
          fontSize: "1rem",
          padding: "16px 32px",
          background: "linear-gradient(90deg, #ff9800, #ff5700)",
          borderRadius: "50px",
          fontWeight: "bold",
          "&:hover": { background: "linear-gradient(90deg, #ff7700, #ff3300)" },
        }}
      >
        Register Now
      </Button>
    </Box>
  );
};

export default HeroSection;
