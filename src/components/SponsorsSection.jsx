import { Box, Typography, Grid, Card, CardMedia } from "@mui/material";

const sponsors = [
  { id: 2, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png", name: "Google" },
  { id: 3, logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", name: "Nike" },
  { id: 4, logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", name: "IBM" },
];

const SponsorsSection = () => {
  return (
    <Box
      sx={{
        py: 8,
        textAlign: "center",
        background: "radial-gradient(circle at center, #1e293b 30%, #0d1117 90%)",
        mx: "auto",
        maxWidth: "100%",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: 6,
          textShadow: "0px 0px 20px rgba(255, 215, 0, 0.8)",
          color: "#fff",
        }}
      >
        Our Sponsors & Partners
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {sponsors.map((sponsor) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={sponsor.id}>
            <Card
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                borderRadius: "12px",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 0px 15px rgba(255, 215, 0, 0.5)",
                },
              }}
            >
              <CardMedia
                component="img"
                src={sponsor.logo}
                alt={sponsor.name}
                sx={{ maxWidth: "100px", height: "auto", filter: "brightness(0) invert(1)" }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SponsorsSection;
