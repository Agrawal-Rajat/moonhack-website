import { Box, Typography } from "@mui/material";

const sponsors = [
  { id: 1, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png", name: "Google" },
  { id: 2, logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", name: "Nike" },
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
              "100%": { transform: "translateX(-25%)" }, // Adjusted for smooth scrolling
            },
          }}
        >
          {[...Array(6)].flatMap(() => sponsors).map((sponsor, index) => (
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
