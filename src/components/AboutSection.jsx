import { Box, Typography, Grid, Paper } from "@mui/material";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import registerPageBg from "../assets/registerPageBg.png";
import technoTeamImage from "../assets/technoTeamImage.jpeg"; // Ensure the actual image is present
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutSection = () => {
  const titleRef = useRef(null);
  const boxRefs = useRef([]);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    boxRefs.current.forEach((box, i) => {
      gsap.fromTo(
        box,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
        }
      );
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "auto", // Adjust height dynamically instead of 100vh
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", // Aligns content to the top
        // background: `url(${registerPageBg})`,
        backgroundSize: "cover",
        color: "white",
        textAlign: "center",
        px: { xs: 2, sm: 4 },
        py: { xs: 2, sm: 4 }, // Reduced top and bottom padding
        gap: 2, // Adds spacing between components
      }}
    >
      {/* Title */}
      <Typography
        ref={titleRef}
        variant="h2"
        sx={{
          fontWeight: "bold",
          mb: 4,
          fontSize: { xs: "3rem", sm: "4rem", md: "4.3rem" },
          fontFamily: "Impact, sans-serif",
          background: "linear-gradient(90deg, #f4c2c2, #e6b8a2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        About MoonHack 2025
      </Typography>

      {/* Grid Layout */}
      <Grid container spacing={2} sx={{ maxWidth: "1100px" }}>
        {/* Row 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            ref={(el) => (boxRefs.current[0] = el)}
            sx={{
              p: { xs: 2, sm: 3 },
              backdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              textAlign: "left",
              minHeight: "220px",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "pink", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
            >
              🌟 Networking & Growth
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                color: "#aaa",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              MoonHack 2025 provides a platform to connect with tech
              enthusiasts, mentors, and industry leaders. Find career guidance,
              collaborations, and inspiration while networking with top
              professionals.
            </Typography>
          </Paper>
        </Grid>

        {/* Center Image Box */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Paper
            ref={(el) => (boxRefs.current[1] = el)}
            sx={{
              overflow: "hidden",
              borderRadius: "20px",
              height: { xs: "180px", sm: "220px", md: "260px" }, // Reduced size
              width: "90%", // Adjust width slightly for better alignment
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={technoTeamImage}
              alt="Event"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "15px", // Ensure smooth edges
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            ref={(el) => (boxRefs.current[2] = el)}
            sx={{
              p: { xs: 2, sm: 3 },
              backdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              textAlign: "left",
              minHeight: "220px",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "pink", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
            >
              🚀 Innovation & Creativity
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                color: "#aaa",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Compete in AI, blockchain, and cybersecurity challenges. Create
              groundbreaking solutions in an environment that fosters
              experimentation and creativity.
            </Typography>
          </Paper>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} sm={6}>
          <Paper
            ref={(el) => (boxRefs.current[3] = el)}
            sx={{
              p: { xs: 2, sm: 3 },
              backdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              textAlign: "left",
              minHeight: "180px",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "pink", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
            >
              🌕 First-Ever Moonstone Event
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                color: "#aaa",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Medi-Caps University presents an unforgettable experience of
              coding, learning, and community building.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper
            ref={(el) => (boxRefs.current[4] = el)}
            sx={{
              p: { xs: 2, sm: 3 },
              backdropFilter: "blur(8px)",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              textAlign: "left",
              minHeight: "180px",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "pink", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
            >
              🌍 Building a Stronger Community
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                color: "#aaa",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              A space where collaboration and learning fuel innovation. Join us
              and be part of something bigger.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutSection;
