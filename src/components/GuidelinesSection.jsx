import { useEffect, useRef, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import gsap from "gsap";

const guidelines = [
  {
    title: "Team Formation",
    description: "Participants must register as teams, with each team consisting of 4 members.",
  },
  {
    title: "Project Scope",
    description:
      "Teams can work on any project within the given theme or problem statement.",
  },
  {
    title: "Time Limit",
    description: "The Hackathon will have a specific time limit. It is a 24 Hour Hackathon",
  },
  {
    title: "Code Ownership",
    description: "All code must be original and created during the Hackathon.",
  },
  {
    title: "Collaboration",
    description: "Teams can collaborate with mentors but not with other teams.",
  },
  {
    title: "Presentation",
    description: "Each team must present their project to the judging panel.",
  },
  {
    title: "Judging Criteria",
    description:
      "Judging is based on innovation, technical execution, and user experience.",
  },
  {
    title: "Fair Play",
    description:
      "Cheating, plagiarism, or unfair practices result in immediate disqualification.",
  },
  {
    title: "No Smoking and Alcohol",
    description:
      "The event is smoke-free and alcohol-free for a safe and inclusive environment.",
  },
  {
    title: "NO Refund Policy",
    description:
      "If you are not selected in Ideathon Round, No refund will be initiated.",
  },
  {
    title: "Code of Conduct",
    description: "Participants must adhere to professionalism and respect.",
  },
  {
    title: "Prizes and Awards",
    description: "Winners receive cash prizes, mentorships, and more.",
  },
];

const GuidelinesSection = () => {
  const guidelineRefs = useRef([]);
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    gsap.fromTo(
      guidelineRefs.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15 }
    );
  }, []);

  return (
    <Container sx={{ py: 6 }}>
      {/* Heading */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2.8rem", sm: "3.8rem", md: "4.3rem" },
            fontFamily: "Impact, sans-serif",
            background: "linear-gradient(90deg, #f4c2c2, #e6b8a2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          GuideLines
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#ccc" }}>
          Follow these rules to ensure a fair and competitive event.
        </Typography>
      </Box>

      {/* Different layouts for mobile and PC */}
      {isMobile ? (
        // Accordion for Mobile View
        <Box>
          {guidelines.map((item, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={() => setExpanded(expanded === index ? false : index)}
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0px 2px 10px rgba(255, 215, 0, 0.3)",
                mb: 1,
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#ffd700" }} />}
              >
                <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "#ddd" }}>
                  {item.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        // Grid Layout for Desktop View
        <Grid container spacing={3} justifyContent="center">
          {guidelines.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              ref={(el) => (guidelineRefs.current[index] = el)}
            >
              <Card
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0px 0px 15px rgba(255, 215, 0, 0.4)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 20px rgba(255, 215, 0, 0.6)",
                  },
                }}
              >
                <CardContent
                  sx={{ textAlign: "center", color: "#fff", padding: "20px" }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 1, color: "#ffd700" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ddd" }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default GuidelinesSection;
