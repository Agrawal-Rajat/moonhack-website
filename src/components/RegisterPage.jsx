import React, { useState } from "react";
import { Container, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    teamName: "",
    teamMembers: [{ name: "", contact: "", college: "" }],
    utrNumber: "",
  });

  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (event, field, index = null) => {
    if (index !== null) {
      const updatedMembers = [...formData.teamMembers];
      updatedMembers[index][field] = event.target.value;
      setFormData({ ...formData, teamMembers: updatedMembers });
    } else {
      setFormData({ ...formData, [field]: event.target.value });
    }
  };

  const handleScreenshotUpload = (event) => {
    setScreenshot(event.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    if (!formData.name || !formData.email || !formData.contact || !screenshot) {
      setMessage("All fields and payment screenshot are required!");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("college", formData.college);
    formDataToSend.append("teamName", formData.teamName);
    formDataToSend.append("utrNumber", formData.utrNumber);
    formDataToSend.append("screenshot", screenshot);

    formData.teamMembers.forEach((member, index) => {
      formDataToSend.append(`teamMember${index + 2}_name`, member.name);
      formDataToSend.append(`teamMember${index + 2}_contact`, member.contact);
      formDataToSend.append(`teamMember${index + 2}_college`, member.college);
    });

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Registration Successful!");
      } else {
        setMessage(result.error || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh", padding: 3, display: "flex", justifyContent: "center" }}>
      <motion.div className="register-form" style={{ width: "100%" }}>
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: "#1E1E2E", // Dark blue shade
            color: "#ffffff",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "#FFD700" }}>
            MoonHack Registration
          </Typography>

          {/* Personal Details */}
          <Grid container spacing={2}>
            {[
              { label: "Name", field: "name" },
              { label: "Contact", field: "contact" },
              { label: "Email ID", field: "email" },
              { label: "College/School Name", field: "college" },
            ].map((input, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  fullWidth
                  label={input.label}
                  variant="outlined"
                  value={formData[input.field]}
                  onChange={(e) => handleInputChange(e, input.field)}
                  InputProps={{
                    sx: {
                      borderRadius: "25px",
                      backgroundColor: "#2E2E3E",
                      color: "#ffffff",
                      "& fieldset": { borderColor: "#FFD700" },
                      "& input": { color: "#ffffff" },
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>

          {/* Team Details */}
          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", mb: 2, color: "#FFD700" }}>
            Team Details
          </Typography>
          <TextField
            fullWidth
            label="Team Name"
            variant="outlined"
            value={formData.teamName}
            onChange={(e) => handleInputChange(e, "teamName")}
            InputProps={{
              sx: {
                borderRadius: "25px",
                backgroundColor: "#2E2E3E",
                color: "#ffffff",
                "& fieldset": { borderColor: "#FFD700" },
                "& input": { color: "#ffffff" },
              },
            }}
          />

          {[0, 1, 2].map((index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
              {["name", "contact", "college"].map((field) => (
                <Grid item xs={field === "name" ? 12 : 6} key={field}>
                  <TextField
                    fullWidth
                    label={`Team Member ${index + 2} ${field}`}
                    variant="outlined"
                    value={formData.teamMembers[index]?.[field] || ""}
                    onChange={(e) => handleInputChange(e, field, index)}
                    InputProps={{
                      sx: {
                        borderRadius: "25px",
                        backgroundColor: "#2E2E3E",
                        color: "#ffffff",
                        "& fieldset": { borderColor: "#FFD700" },
                        "& input": { color: "#ffffff" },
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ))}

          {/* Payment Section */}
          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", mb: 2, color: "#FFD700" }}>
            Payment (Registration Fee: ₹400)
          </Typography>
          <TextField
            fullWidth
            label="UTR Number"
            variant="outlined"
            value={formData.utrNumber}
            onChange={(e) => handleInputChange(e, "utrNumber")}
            InputProps={{
              sx: {
                borderRadius: "25px",
                backgroundColor: "#2E2E3E",
                color: "#ffffff",
                "& fieldset": { borderColor: "#FFD700" },
                "& input": { color: "#ffffff" },
              },
            }}
          />
          <Button variant="contained" component="label" fullWidth sx={{ mt: 2, borderRadius: "25px", backgroundColor: "#FFD700", color: "#1E1E2E" }}>
            Upload Payment Screenshot
            <input type="file" hidden onChange={handleScreenshotUpload} />
          </Button>

          {/* Submit Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, borderRadius: "25px", backgroundColor: "#FFD700", color: "#1E1E2E", fontWeight: "bold", fontSize: "1.1rem" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>
          {message && <Typography sx={{ color: "red", mt: 2, textAlign: "center" }}>{message}</Typography>}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default RegisterPage;
