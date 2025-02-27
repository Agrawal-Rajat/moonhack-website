import { Box, Typography } from "@mui/material";
// Importing SVG logos
import Slogo1 from "../assets/Slogo1.svg";
import Slogo2 from "../assets/Slogo2.svg";
import Slogo3 from "../assets/Slogo3.svg";
import Slogo4 from "../assets/Slogo4.svg";
import Slogo5 from "../assets/Slogo5.svg";
import Slogo6 from "../assets/Slogo6.svg";

const sponsors = [
  { id: 1, logo: Slogo1, name: "Abhyudaya" },
  { id: 2, logo: Slogo2, name: "Notebales" },
  { id: 3, logo: Slogo3, name: "Coding Thinker" },
  { id: 4, logo: Slogo4, name: "Tech Sphere" },
  { id: 5, logo: Slogo5, name: "InnovateX" },
  { id: 6, logo: Slogo6, name: "ByteCraft" },
];

const SponsorsSection = () => {
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

      {/* Scrolling Container */}
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        {/* Infinite Scrolling Wrapper */}
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            animation: "scrollAnimation 12s linear infinite",
            "@keyframes scrollAnimation": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" }, // Adjusted for smooth animation
            },
          }}
        >
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "180px",
                height: "180px",
                mx: 4,
                borderRadius: "50%",
                overflow: "hidden", // Ensures a perfect circle
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                style={{
                  width: "100%", // Ensures it fills the wrapper
                  height: "100%",
                  objectFit: "cover", // Prevents stretching
                  borderRadius: "50%", // Ensures circular shape
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SponsorsSection;
