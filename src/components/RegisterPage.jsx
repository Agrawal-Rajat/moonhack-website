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
    teamMembers: Array(3).fill({ name: "", contact: "", college: "" }),
    utrNumber: "",
  });

  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (event, field, index = null) => {
    if (index !== null) {
      const updatedMembers = [...formData.teamMembers];
      updatedMembers[index] = { ...updatedMembers[index], [field]: event.target.value };
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
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "teamMembers") {
        formDataToSend.append(key, value);
      }
    });
    
    formData.teamMembers.forEach((member, index) => {
      formDataToSend.append(`teamMember${index + 2}_name`, member.name);
      formDataToSend.append(`teamMember${index + 2}_contact`, member.contact);
      formDataToSend.append(`teamMember${index + 2}_college`, member.college);
    });

    formDataToSend.append("screenshot", screenshot);

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
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
            MoonHack Registration
          </Typography>

          {/* Personal Details */}
          <Grid container spacing={2}>
            {["name", "contact", "email", "college"].map((field) => (
              <Grid item xs={field === "college" ? 12 : 6} key={field}>
                <TextField fullWidth label={field.charAt(0).toUpperCase() + field.slice(1)} variant="outlined" value={formData[field]} onChange={(e) => handleInputChange(e, field)} />
              </Grid>
            ))}
          </Grid>

          {/* Team Details */}
          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", mb: 2 }}>Team Details</Typography>
          <TextField fullWidth label="Team Name" variant="outlined" value={formData.teamName} onChange={(e) => handleInputChange(e, "teamName")} />
          {formData.teamMembers.map((member, index) => (
            <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
              {["name", "contact", "college"].map((field, idx) => (
                <Grid item xs={idx === 0 ? 12 : 6} key={field}>
                  <TextField fullWidth label={`Team Member ${index + 2} ${field.charAt(0).toUpperCase() + field.slice(1)}`} variant="outlined" value={member[field]} onChange={(e) => handleInputChange(e, field, index)} />
                </Grid>
              ))}
            </Grid>
          ))}

          {/* Payment Section */}
          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", mb: 2 }}>Payment (Registration Fee: ₹400)</Typography>
          <TextField fullWidth label="UTR Number" variant="outlined" value={formData.utrNumber} onChange={(e) => handleInputChange(e, "utrNumber")} />
          <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Payment Screenshot
            <input type="file" hidden onChange={handleScreenshotUpload} />
          </Button>

          {/* Submit Button */}
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>
          {message && <Typography sx={{ color: "red", mt: 2, textAlign: "center" }}>{message}</Typography>}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default RegisterPage;
