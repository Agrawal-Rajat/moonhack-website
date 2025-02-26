import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import gsap from "gsap";

const menuItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Timeline", id: "timeline" },
  { label: "Guidelines", id: "guidelines" },
  { label: "Sponsors", id: "sponsors" },
  { label: "FAQs", id: "faqs" },
  { label: "Contact Us", id: "contact" },
];

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const registerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      registerRef.current,
      { scale: 1 },
      {
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut",
      }
    );

    // Cracker animation
    const sparkles = gsap.timeline({ repeat: -1, delay: 0.5 });
    sparkles
      .to(registerRef.current, {
        boxShadow: "0px 0px 10px 2px rgba(255, 215, 0, 0.7)",
        duration: 0.3,
      })
      .to(registerRef.current, {
        boxShadow: "0px 0px 15px 5px rgba(255, 140, 0, 0.8)",
        duration: 0.2,
      })
      .to(registerRef.current, {
        boxShadow: "0px 0px 5px 2px rgba(255, 215, 0, 0.5)",
        duration: 0.3,
      });
  }, []);

  const navigate = useNavigate(); // Get navigate function

  const scrollToSection = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: true }); // Redirect to home
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300); // Delay scrolling to allow navigation
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Navbar */}
      <AppBar
        position="fixed"
        sx={{
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "40px",
          padding: "5px 20px",
          width: "90%",
          maxWidth: "900px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
          zIndex: 10,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  transition: "0.3s",
                  "&:hover": { color: "#f39c12", transform: "scale(1.05)" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Register Button */}
          <Button
            ref={registerRef}
            sx={{
              color: "#fff",
              backgroundColor: "#f39c12",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "0.85rem",
              borderRadius: "20px",
              padding: "5px 15px",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#e67e22",
                transform: "scale(1.15)",
                boxShadow: "0px 0px 20px rgba(255, 165, 0, 0.9)",
              },
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { md: "none", xs: "block" }, color: "#fff" }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#222",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ width: "250px", textAlign: "center", padding: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setOpenDrawer(false);
                }}
                sx={{
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={() => navigate("/register")}
              sx={{
                backgroundColor: "#f39c12",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "10px",
                margin: "10px auto",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#e67e22",
                  transform: "scale(1.05)",
                },
              }}
            >
              <ListItemText primary="Register" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
