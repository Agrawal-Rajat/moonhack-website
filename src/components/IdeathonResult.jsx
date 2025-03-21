import React, { useEffect, useRef } from "react";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { motion } from "framer-motion";
import gsap from "gsap";

const teamNames = [
  "DevStrikers", "Debug Dev", "Spark Creators", "Ctrl Alt Defeat", "Deep Thinkers",
  "StartwithSmall", "Bro Coders", "Laksha", "OmniVisionaries", "Team Midnight Hackers",
  "Collabrators", "DeBugWiser", "Medhax", "Bug Busters", "Titanium", "ByteSquad",
  "High Notes", "TechTitans", "Karma_Devs", "Code Bytes", "Stellar Sync 5.0",
  "CodeChronicles", "Hack-elite", "Int Main", "Crack Coders", "Pathfinder", "The Crafters"
];

const IdeathonResult = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 20 }}>
      
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: { xs: "3rem", sm: "4rem", md: "4.3rem" },
            fontFamily: "Impact, sans-serif",
            background: "linear-gradient(90deg, #f4c2c2, #e6b8a2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Ideathon Winner and Moonhack Finalists
        </Typography>
      
      <Grid container spacing={3} ref={containerRef} justifyContent="center">
        {teamNames.map((team, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ borderRadius: 3, boxShadow: 4, bgcolor: "#1e1e1e", color: "#fff" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={500}>
                    {team}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default IdeathonResult;
