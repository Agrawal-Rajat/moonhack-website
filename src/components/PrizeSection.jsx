import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import TrophyIcon from "../assets/trophy.png"; 
import heroImage from "../assets/heroImage.png";

const PrizeSection = () => {
  const sectionRef = useRef(null);
  const prizeRef = useRef(null);
  const goodiesRef = useRef(null);
  const internshipRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      [prizeRef.current, goodiesRef.current, internshipRef.current],
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.4,
      }
    );
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 4,
        py: 8,
        px: 4,
        background: `url(${heroImage}) center/cover no-repeat`,
        borderRadius: "25px",
        boxShadow: "0px 0px 30px rgba(173, 216, 230, 0.6)", // Sky blue glow
        maxWidth: "900px",
        mx: "auto",
        my: 10,
        position: "relative",
        overflow: "hidden",
        border: "2px solid rgba(173, 216, 230, 0.5)", // Soft blue border
      }}
    >
      {/* 🏆 Trophy Image */}
      <img
        src={TrophyIcon}
        alt="Trophy"
        style={{
          width: "100px",
          marginBottom: "-10px",
          filter: "drop-shadow(0px 0px 15px rgba(173, 216, 230, 1))",
        }}
      />

      {/* 🏅 Grand Prizes */}
      <Typography
        ref={prizeRef}
        variant="h2"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "2.8rem", sm: "4rem" },
          fontFamily: "Poppins, sans-serif",
          background: "linear-gradient(90deg, #E6E6FA, #87CEEB)", // Lavender to sky blue
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0px 0px 20px rgba(173, 216, 230, 0.8)", // Sky blue glow
          letterSpacing: "1px",
        }}
      >
        Grand Prizes & Goodies Worth <span style={{ color: "#FFD700", fontSize: "5rem", fontWeight: "bold", textShadow: "0px 0px 25px #FFD700" }}>₹1,00,000 </span> 
      </Typography>

      {/* 🚀 Internship Opportunities */}
      <Typography
        ref={internshipRef}
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.8rem", sm: "2.5rem" },
          background: "linear-gradient(90deg, #87CEEB, #E6E6FA)", // Sky blue to lavender
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          textShadow: "0px 0px 20px rgba(173, 216, 230, 0.8)", // Soft glow
          fontFamily: "Poppins, sans-serif",
        }}
      >
        + Exclusive Internship Opportunities 🚀
      </Typography>
    </Box>
  );
};

export default PrizeSection;
