import { useState, useEffect, useRef } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import gsap from "gsap";

const faqs = [
  { question: " What is MoonHack 2025?", answer: "MoonHack 2025 is a global hackathon where tech enthusiasts build innovative projects and compete for amazing prizes!" },
  { question: " Who can participate?", answer: "Anyone with a passion for technology and problem-solving! Students, professionals, and beginners are welcome." },
  { question: " What are the participation fees?", answer: "Zero! It's completely free to participate and showcase your skills." },
  { question: " Are there any prizes?", answer: "Yes! Winners will receive cash prizes, mentorship, and exclusive internship opportunities." },
  { question: " How do I register?", answer: "Simply click the 'Register Now' button on our homepage to secure your spot!" },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);
  const faqRefs = useRef([]);

  useEffect(() => {
    if (faqRefs.current.length > 0) {
      gsap.fromTo(
        faqRefs.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15 }
      );
    }
  }, []);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* FAQ Heading */}
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textShadow: "0px 0px 15px rgba(255, 215, 0, 0.8)",
            color: "#fff",
          }}
        >
          FAQs
        </Typography>
      </Box>

      {/* FAQ List */}
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}
          ref={(el) => (faqRefs.current[index] = el)}
          sx={{
            mb: 2,
            width: "90%",
            maxWidth: 700,
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            transition: "all 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.05)", boxShadow: "0px 6px 20px rgba(255, 215, 0, 0.6)" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffd700" }} />}
            sx={{
              padding: "16px 24px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.3rem",
            }}
          >
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "#fff", padding: "20px", borderRadius: "0 0 16px 16px" }}>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQSection;
