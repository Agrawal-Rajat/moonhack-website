import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

const sponsors = [
  { id: 2, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png", name: "Google" },
  { id: 3, logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", name: "Nike" },
  { id: 4, logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", name: "IBM" },
  { id: 5, logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", name: "Microsoft" },
  { id: 6, logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Intel_logo_2006.svg", name: "Intel" },
];

const SponsorsSection = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrame;

    const moveSlider = () => {
      if (slider) {
        slider.scrollLeft += 1;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(moveSlider);
    };

    animationFrame = requestAnimationFrame(moveSlider);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <Box sx={{ py: 2, textAlign: "center", background: "transparent", overflow: "hidden" }}>
      <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 10,
                fontSize: { xs: "3rem", sm: "4rem", md: "4.3rem" },
                fontFamily: "Impact, sans-serif",
                background: "linear-gradient(90deg, #f4c2c2, #e6b8a2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sponsors
            </Typography>
      <Box
        ref={sliderRef}
        sx={{
          display: "flex",
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            animation: "scroll 20s linear infinite",
            width: "max-content",
          }}
        >
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <Box key={index} sx={{ minWidth: "150px", mx: 3 }}>
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                style={{ maxWidth: "100px", height: "auto", filter: "brightness(0) invert(1)" }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SponsorsSection;
