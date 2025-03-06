import { Box, Typography } from "@mui/material";
// Importing SVG logos
import Slogo1 from "../assets/Slogo1.svg";
import Slogo2 from "../assets/Slogo2.svg";
import Slogo3 from "../assets/Slogo3.svg";
import Slogo4 from "../assets/Slogo4.svg";
import Slogo5 from "../assets/Slogo5.svg";
import Slogo6 from "../assets/Slogo6.svg";
import Slogo7 from "../assets/Slogo7.svg"; 
import Slogo8 from "../assets/Slogo8.png"; 

const sponsors = [
  { id: 1, logo: Slogo1, name: "Technical Partner" },
  { id: 2, logo: Slogo2, name: "Printing Partner" },
  { id: 3, logo: Slogo3, name: "Educationl Partner" },
  { id: 4, logo: Slogo4, name: "Educational Partner" },
  { id: 5, logo: Slogo5, name: "Food Partner" },
  { id: 6, logo: Slogo6, name: "Educational Partner" },
  { id: 7, logo: Slogo7, name: "Media Partner"},
  {id: 8, logo: Slogo8, name: "Technical Partner"},
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
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        >
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "180px",
                height: "220px", // Increased height to accommodate text
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  mt: 1,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {sponsor.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SponsorsSection;
