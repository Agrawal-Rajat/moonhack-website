import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const ProblemStatement = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: 4,
        background: "linear-gradient(135deg, #1e1e2f 30%, #3a3a4f 100%)",
        borderRadius: "20px",
        boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.1)",
        maxWidth: "90%",
        mx: "auto",
        color: "#fff",
        textAlign: "center",
      }}
    >
      {/* 🚀 HEADER */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textShadow: "0px 0px 20px rgba(255, 215, 0, 0.8)",
          color: "#FFD700",
          mb: 5,
        }}
      >
        🚀 Techno Clubs: A Digital Leap into the Future! 🌐
      </Typography>

      {/* 🌟 GRID STRUCTURE */}
      <Grid container spacing={3} justifyContent="center">
        {sections.map((section, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                  p: 3,
                  borderRadius: "12px",
                  boxShadow: "0px 0px 15px rgba(255, 215, 0, 0.3)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: section.color,
                      mb: 2,
                    }}
                  >
                    {section.icon} {section.title}
                  </Typography>
                  <Typography variant="body1">{section.content}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* 🚀 CALL TO ACTION */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mt: 5,
          textShadow: "0px 0px 20px rgba(255, 255, 255, 0.9)",
          color: "#00FFAA",
        }}
      >
        🚀 Hackers, are you ready to build the future of Techno Clubs? 🔥
      </Typography>
    </Box>
  );
};

// 📌 SECTION DATA (MODULAR DESIGN)
const sections = [
  {
    icon: "🎯",
    title: "The Challenge",
    content:
      "Techno Clubs struggle with outdated systems. Managing IEEE, ACM, AWS, GDG, and STIC chapters is chaotic. It's time to change that.",
    color: "#FF5733",
  },
  {
    icon: "💡",
    title: "The Vision",
    content:
      "A one-stop digital platform that automates club operations. Memberships, events, credits, and resources—all in one place!",
    color: "#00FFCC",
  },
  {
    icon: "🛠️",
    title: "What We’re Building",
    content:
      "A smart web platform to centralize memberships, automate event management, track credits, and enhance documentation.",
    color: "#FFAA00",
  },
  {
    icon: "🌍",
    title: "The Impact",
    content:
      "This is more than a tool—it's the operating system for the future of student tech leadership, setting new standards for collaboration.",
    color: "#FFD700",
  },
];

export default ProblemStatement;
