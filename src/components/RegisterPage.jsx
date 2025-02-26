import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { gsap } from "gsap";


const RegisterPage = () => {
  const formRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    college: "",
    city: "",
    teamName: "",
    teamMembers: [
      { name: "", contact: "", college: "" },
      { name: "", contact: "", college: "" },
      { name: "", contact: "", college: "" },
      { name: "", contact: "", college: "" },
    ],
    utr: "",
  });

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e, field, index = null) => {
    if (index !== null) {
      const updatedTeam = [...formData.teamMembers];
      updatedTeam[index][field] = e.target.value;
      setFormData({ ...formData, teamMembers: updatedTeam });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    // Create FormData object to send the form data, including the file
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("college", formData.college);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("teamName", formData.teamName);
    formDataToSend.append("utr", formData.utr);

    // Append team members
    formData.teamMembers.forEach((member, index) => {
      formDataToSend.append(`teamMembers[${index}][name]`, member.name);
      formDataToSend.append(`teamMembers[${index}][contact]`, member.contact);
      formDataToSend.append(`teamMembers[${index}][college]`, member.college);
    });

    // Append the uploaded file
    if (file) {
      formDataToSend.append("paymentScreenshot", file);
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: "success", text: "Registration Successful!" });
        setFormData({
          name: "",
          contact: "",
          email: "",
          college: "",
          city: "",
          teamName: "",
          teamMembers: Array(4).fill({ name: "", contact: "", college: "" }),
          utr: "",
        });
        setFile(null);
      } else {
        setMessage({ type: "error", text: "Error saving data. Please try again." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Card ref={formRef} sx={{ maxWidth: 650, margin: "auto", p: 4, boxShadow: 7, borderRadius: 4, background: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" fontWeight={700}>
            Premium Event Registration
          </Typography>

          {/* Personal Details */}
          <TextField label="Name" fullWidth margin="normal" variant="outlined" value={formData.name} onChange={(e) => handleChange(e, "name")} />
          <TextField label="Contact" fullWidth margin="normal" variant="outlined" value={formData.contact} onChange={(e) => handleChange(e, "contact")} />
          <TextField label="Email ID" fullWidth margin="normal" variant="outlined" value={formData.email} onChange={(e) => handleChange(e, "email")} />
          <TextField label="College/School Name" fullWidth margin="normal" variant="outlined" value={formData.college} onChange={(e) => handleChange(e, "college")} />
          <TextField label="City" fullWidth margin="normal" variant="outlined" value={formData.city} onChange={(e) => handleChange(e, "city")} />

          {/* Team Details */}
          <Typography variant="h6" sx={{ mt: 3, fontWeight: 700 }}>
            Team Details
          </Typography>
          <TextField label="Team Name" fullWidth margin="normal" variant="outlined" value={formData.teamName} onChange={(e) => handleChange(e, "teamName")} />

          {formData.teamMembers.map((member, index) => (
            <div key={index}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2 }}>
                Team Member {index + 1}
              </Typography>
              <TextField label="Name" fullWidth margin="normal" variant="outlined" value={member.name} onChange={(e) => handleChange(e, "name", index)} />
              <TextField label="Contact" fullWidth margin="normal" variant="outlined" value={member.contact} onChange={(e) => handleChange(e, "contact", index)} />
              <TextField label="College Name" fullWidth margin="normal" variant="outlined" value={member.college} onChange={(e) => handleChange(e, "college", index)} />
            </div>
          ))}

          {/* Payment Section */}
          <Typography variant="h6" sx={{ mt: 3, fontWeight: 700 }}>
            Payment (Registration Fee: ₹400)
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Scan QR Code for Payment (₹400)
          </Typography>
          
          <Button variant="contained" component="label" fullWidth sx={{ mt: 2, py: 1.5, borderRadius: 3, fontSize: "1rem", fontWeight: 600, backgroundColor: "#1976d2" }}>
            Upload Payment Screenshot
            <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files[0])} />
          </Button>
          {file && (
            <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic", color: "green" }}>
              Uploaded: {file.name}
            </Typography>
          )}
          <TextField label="UTR" fullWidth margin="normal" variant="outlined" value={formData.utr} onChange={(e) => handleChange(e, "utr")} />

          {/* Submit Button */}
          <Button variant="contained" fullWidth sx={{ mt: 3, py: 1.5, borderRadius: 3, fontSize: "1.1rem", fontWeight: 700, backgroundColor: "#388e3c" }} onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>

          {/* Message Display */}
          {message && (
            <Typography variant="body1" sx={{ mt: 2, textAlign: "center", color: message.type === "success" ? "green" : "red" }}>
              {message.text}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegisterPage;
