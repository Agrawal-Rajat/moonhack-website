import React, { useEffect, useRef } from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProblemStatement = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <Container maxWidth="md" ref={sectionRef} sx={{ mt: 16 }}>
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
              Problem Statement
            </Typography>
      <Paper
        elevation={8}
        sx={{
          padding: 5,
          borderRadius: 4,
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          color: "#ffffff",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
          textAlign: "left", // Left-aligning content
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#ffcc00", textShadow: "2px 2px 10px rgba(255,204,0,0.8)" }}
        >
           Techno Clubs: The Digital Conundrum
        </Typography>
        <Typography variant="h6" paragraph sx={{ color: "#ffcc00" }}>
          🎯 The Grand Challenge:
        </Typography>
        <Typography paragraph>
          Multi-chapter student organizations like IEEE, ACM, AWS, GDG, and STIC suffer from a structurally inefficient ecosystem—fragmented communication silos, disjointed credit systems, tedious event logistics, and unsecured resource allocation. Traditional methodologies fail to scale, leading to administrative bottlenecks and an overall lack of transparency in operations.
        </Typography>
        <Typography variant="h6" paragraph sx={{ color: "#ffcc00" }}>
          💡 The Paradigm Shift:
        </Typography>
        <Typography paragraph>
          Envision a comprehensive digital transformation—a Techno Clubs Portal that intelligently orchestrates club dynamics, eliminating inefficiencies through smart automation, unified collaboration frameworks, and real-time visibility across all activities. This isn’t just an upgrade; it's a fundamental re-engineering of student-led organizations.
        </Typography>
        <Typography variant="h6" paragraph sx={{ color: "#ffcc00" }}>
          🛠 Core Innovations:
        </Typography>
        <Typography paragraph>
          🔹 <strong>Unified Membership Hub</strong> – Seamlessly manage multi-chapter enrollments.<br />
          🔹 <strong>Event Lifecycle Automation</strong> – Optimize event planning, execution, and analysis.<br />
          🔹 <strong>AI-Driven Credit System</strong> – Automate contribution tracking and incentivization.<br />
          🔹 <strong>Secured Resource Governance</strong> – Control access to assets and proprietary materials.<br />
          🔹 <strong>Intelligent Documentation</strong> – Auto-generate reports, minutes, and archival records.<br />
          🔹 <strong>Collaboration Powerhouse</strong> – Integrated digital workspaces for teams & committees.<br />
        </Typography>
        <Typography variant="h6" paragraph sx={{ color: "#ffcc00" }}>
          🌍 The Ultimate Disruption:
        </Typography>
        <Typography paragraph>
          This is not a mere club management tool—it’s the next-generation digital infrastructure for student-driven tech communities. The vision? A self-sustaining, autonomous ecosystem where leadership thrives, innovation scales, and impact magnifies.
        </Typography>
        <Typography variant="h6" paragraph sx={{ color: "#ffcc00" }}>
          📢 Submission Guidelines:
        </Typography>
        <Typography paragraph>
          🔸 <strong>One PPT File Containing:</strong><br />
          1. Title Slide – Project Name, Team Name, and Members<br />
          2. The Problem – Issues faced by multi-chapter tech clubs<br />
          3. The Solution – How the Techno Clubs Portal solves these issues<br />
          4. Features – Key things the portal can do<br />
          5. How It Works – Simple steps from joining to managing events<br />
          6. Why It’s Useful – Benefits for students and club admins<br />
          7. Future Plans – How this can grow and improve<br />
          8. Final Thoughts – Summary<br /><br />
          🔸 <strong>Figma File Submission</strong> – Your design, UI/UX flow, and system architecture.<br />
          🔸 <strong>Recorded Video Presentation</strong> – A concise explanation of your Figma design and the unique value proposition of your solution.
        </Typography>
        
      </Paper>
    </Container>
  );
};

export default ProblemStatement;
