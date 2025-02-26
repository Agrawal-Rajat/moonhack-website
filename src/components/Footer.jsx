import { useEffect, useRef } from "react";
import { Box, Container, Typography, IconButton, Grid, Divider } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import gsap from "gsap";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <Box
      ref={footerRef}
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.3)",
        color: "#fff",
        textAlign: "center",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{ flexDirection: { xs: "column", md: "row" } }}>
          {/* Contact Section */}
          <Grid item xs={12} md={6} sx={{ mb: { xs: 4, md: 0 }, textAlign: { xs: "left", md: "left" } }}>
            <Typography
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
              Contact Us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton sx={{ color: "#ffd700" }}>
                  <Email />
                </IconButton>
                <Typography variant="body1">info.moonhack@gmail.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton sx={{ color: "#ffd700" }}>
                  <Phone />
                </IconButton>
                <Typography variant="body1">+91 89233 75255</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton sx={{ color: "#ffd700" }}>
                  <LocationOn />
                </IconButton>
                <Typography variant="body1">Medicaps University, Indore, India</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Google Map Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 200, sm: 250 },
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.8781155707075!2d75.80101442530194!3d22.62102622945728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962f958dcb7169d%3A0xd877c12078e50f0f!2sMedi-Caps%20University!5e0!3m2!1sen!2sin!4v1740489403551!5m2!1sen!2sin"
                allowFullScreen
              />
            </Box>
          </Grid>
        </Grid>

        {/* Divider for Separation */}
        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.2)" }} />

        {/* Bottom Bar */}
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} MoonHack | All Rights Reserved
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
