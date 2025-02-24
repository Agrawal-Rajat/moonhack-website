import { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import gsap from "gsap";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState(""); // Initialize empty state
  const titleRef = useRef(null);
  const countdownRef = useRef(null);
  const buttonRef = useRef(null);

  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-03-22T00:00:00");
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      return "00d 00h 00m 00s";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
  
    requestAnimationFrame(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
      gsap.fromTo(
        countdownRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.5)", delay: 0.3 }
      );
      gsap.fromTo(
        buttonRef.current,
        { y: 20 },
        { y: 0, duration: 1, ease: "power3.out", delay: 0.6, onComplete: () => {
            // Start the glow animation after button appears
            gsap.to(buttonRef.current, {
              boxShadow: "0px 0px 25px rgba(255, 165, 0, 1)", // Glowing effect
              scale: 1.03, // Slight zoom effect
              duration: 1,
              repeat: -1, // Infinite loop
              yoyo: true, // Reverse the animation to create a pulse effect
              ease: "power1.inOut",
            });
          }
        }
      );
    });
  
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  
  

  return (
    <Box
      sx={{
        height: "100vh",
        background: "radial-gradient(circle at center, #1e293b 30%, #0d1117 90%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container sx={{ position: "relative", zIndex: 2 }}>
        {/* Animated Title */}
        <Typography
          ref={titleRef}
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
            mb: 2,
            textShadow: "0px 0px 20px rgba(255, 200, 0, 0.9)",
          }}
        >
          MoonHack 2025 is Almost Here!
        </Typography>

        {/* Countdown Timer */}
        {timeLeft && (
          <Typography
            ref={countdownRef}
            variant="h5"
            sx={{
              mb: 3,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              textShadow: "0px 0px 12px rgba(255, 200, 0, 0.8)",
              fontWeight: "bold",
            }}
          >
            {timeLeft} until launch!
          </Typography>
        )}

        {/* Register Button */}
        <Button
          ref={buttonRef}
          variant="contained"
          sx={{
            fontSize: "1.2rem",
            padding: "14px 28px",
            background: "linear-gradient(90deg, #ff9800, #ff5700)",
            borderRadius: "50px",
            fontWeight: "bold",
            boxShadow: "0px 0px 15px rgba(255, 165, 0, 0.8)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(90deg, #ff7700, #ff3300)",
              boxShadow: "0px 0px 30px rgba(255, 165, 0, 1)",
              transform: "scale(1.05)",
            },
          }}
        >
          Register Now
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;
