import { Box, Typography } from "@mui/material";
// Importing images directly
import SponsorLogo1 from "../assets/SponsorLogo1.png";
import SponsorLogo2 from "../assets/SponsorLogo2.png";
import SponsorLogo3 from "../assets/SponsorLogo3.jpeg";

const sponsors = [
  { id: 1, logo: SponsorLogo1, name: "Abhyudaya" },
  { id: 2, logo: SponsorLogo2, name: "Notebales" },
  { id: 3, logo: SponsorLogo3, name: "Coding Thinker" },
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
            animation: "scrollAnimation 10s linear infinite",
            "@keyframes scrollAnimation": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-33.3%)" }, // Adjusted to fit 3 logos at a time
            },
          }}
        >
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
            <Box key={index} sx={{ minWidth: "180px", mx: 4 }}>
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                style={{
                  maxWidth: "120px", // Fixed size for logos
                  height: "auto",
                  filter: "brightness(0) invert(1)", // Optional styling, adjust as needed
                  objectFit: "contain", // Ensures image doesn't stretch
                  backgroundColor: "transparent", // Ensures no background is applied
                  display: "block", // Prevents extra white space around the image
                  margin: "0 auto", // Centers the image within the container
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
