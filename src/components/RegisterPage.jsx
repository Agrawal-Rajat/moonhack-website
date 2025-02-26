import React, { useState } from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
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
      // Updating team member details
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

    // Form validation
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
    <Container maxWidth="sm" sx={{ minHeight: "100vh", padding: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <motion.div className="register-form" style={{ width: "100%" }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 4, fontSize: { xs: "2rem", sm: "3rem" }, textAlign: "center" }}>
          MoonHack Registration
        </Typography>

        {/* Personal Details */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Name" variant="outlined" value={formData.name} onChange={(e) => handleInputChange(e, "name")} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Contact" variant="outlined" value={formData.contact} onChange={(e) => handleInputChange(e, "contact")} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Email ID" variant="outlined" value={formData.email} onChange={(e) => handleInputChange(e, "email")} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="College/School Name" variant="outlined" value={formData.college} onChange={(e) => handleInputChange(e, "college")} />
          </Grid>
        </Grid>

        {/* Team Details */}
        <Typography variant="h6" sx={{ marginTop: 3, fontWeight: "bold", mb: 2 }}>Team Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Team Name" variant="outlined" value={formData.teamName} onChange={(e) => handleInputChange(e, "teamName")} />
          </Grid>
          {[0, 1, 2].map((index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <TextField fullWidth label={`Team Member ${index + 2}`} variant="outlined" value={formData.teamMembers[index].name} onChange={(e) => handleInputChange(e, "name", index)} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Contact" variant="outlined" value={formData.teamMembers[index].contact} onChange={(e) => handleInputChange(e, "contact", index)} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="College Name" variant="outlined" value={formData.teamMembers[index].college} onChange={(e) => handleInputChange(e, "college", index)} />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

        {/* Payment Section */}
        <Typography variant="h6" sx={{ marginTop: 3, fontWeight: "bold", mb: 2 }}>Payment (Registration Fee: ₹400)</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField fullWidth label="UTR Number" variant="outlined" value={formData.utrNumber} onChange={(e) => handleInputChange(e, "utrNumber")} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label" fullWidth>
              Upload Payment Screenshot
              <input type="file" hidden onChange={handleScreenshotUpload} />
            </Button>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Registration"}
        </Button>

        {message && <Typography sx={{ color: "red", mt: 2 }}>{message}</Typography>}
      </motion.div>
    </Container>
  );
};

export default RegisterPage;
