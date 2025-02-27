import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import "./RegisterPage.css";

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
    member2Name: "",
    member2Contact: "",
    member2College: "",
    member3Name: "",
    member3Contact: "",
    member3College: "",
    member4Name: "",
    member4Contact: "",
    member4College: "",
    utr: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    // Reset previous errors
    setErrors({});

    let newErrors = {};

    // Check for required fields
    for (let key in formData) {
      if (formData[key] === "") {
        newErrors[key] = "This field is required";
      }
    }

    if (!file) {
      newErrors.file = "Payment screenshot is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("college", formData.college);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("teamName", formData.teamName);
    formDataToSend.append("utr", formData.utr);

    // Append individual team member data (excluding member1)
    formDataToSend.append("member2Name", formData.member2Name);
    formDataToSend.append("member2Contact", formData.member2Contact);
    formDataToSend.append("member2College", formData.member2College);
    formDataToSend.append("member3Name", formData.member3Name);
    formDataToSend.append("member3Contact", formData.member3Contact);
    formDataToSend.append("member3College", formData.member3College);
    formDataToSend.append("member4Name", formData.member4Name);
    formDataToSend.append("member4Contact", formData.member4Contact);
    formDataToSend.append("member4College", formData.member4College);

    // Append the uploaded file only if a file is selected
    formDataToSend.append("paymentScreenshot", file);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      console.log(result);

      if (result.message === "Registration successful!") {
        setMessage({ type: "success", text: "Registration Successful!" });
        setFormData({
          name: "",
          contact: "",
          email: "",
          college: "",
          city: "",
          teamName: "",
          member2Name: "",
          member2Contact: "",
          member2College: "",
          member3Name: "",
          member3Contact: "",
          member3College: "",
          member4Name: "",
          member4Contact: "",
          member4College: "",
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
      <Card ref={formRef} sx={{ maxWidth: 650, margin: "auto", p: 4, boxShadow: 10, borderRadius: 8, backgroundColor: "transparent" }}>
        <CardContent>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 3,
              mt: 4,
              fontSize: { xs: "3rem", sm: "4rem", md: "4.3rem" },
              fontFamily: "Impact, sans-serif",
              background: "linear-gradient(90deg, #f4c2c2, #e6b8a2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Registration
          </Typography>

          {/* Personal Details */}
          <TextField
            label="Team Leader Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={(e) => handleChange(e, "name")}
            required
            error={!!errors.name}
            helperText={errors.name}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "30px",
              boxShadow: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
          />
          <TextField
            label="Contact"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.contact}
            onChange={(e) => handleChange(e, "contact")}
            required
            error={!!errors.contact}
            helperText={errors.contact}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "30px",
              boxShadow: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
          />
          <TextField
            label="Email ID"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={(e) => handleChange(e, "email")}
            required
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "30px",
              boxShadow: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
          />
          <TextField
            label="College/School Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.college}
            onChange={(e) => handleChange(e, "college")}
            required
            error={!!errors.college}
            helperText={errors.college}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "30px",
              boxShadow: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.city}
            onChange={(e) => handleChange(e, "city")}
            required
            error={!!errors.city}
            helperText={errors.city}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "30px",
              boxShadow: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
          />

          {/* Team Details */}
          <Typography variant="h6" sx={{ mt: 3, fontWeight: 700, color: "White" }}>
            Team Details
          </Typography>
          <TextField
            label="Team Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.teamName}
            onChange={(e) => handleChange(e, "teamName")}
            required
            error={!!errors.teamName}
            helperText={errors.teamName}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "30px",
              boxShadow: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
          />

          {/* Team Member Inputs (2-4) */}
          {['member2', 'member3', 'member4'].map((member, index) => (
            <div key={member}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2, color: "White" }}>
                Team Member {index + 2}
              </Typography>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formData[`${member}Name`]}
                onChange={(e) => handleChange(e, `${member}Name`)}
                required
                error={!!errors[`${member}Name`]}
                helperText={errors[`${member}Name`]}
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "30px",
                  boxShadow: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                }}
              />
              <TextField
                label="Contact"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formData[`${member}Contact`]}
                onChange={(e) => handleChange(e, `${member}Contact`)}
                required
                error={!!errors[`${member}Contact`]}
                helperText={errors[`${member}Contact`]}
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "30px",
                  boxShadow: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                }}
              />
              <TextField
                label="College Name"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formData[`${member}College`]}
                onChange={(e) => handleChange(e, `${member}College`)}
                required
                error={!!errors[`${member}College`]}
                helperText={errors[`${member}College`]}
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "30px",
                  boxShadow: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                }}
              />
            </div>
          ))}

          {/* UTR and File Upload */}
          <TextField
            label="UTR Number"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.utr}
            onChange={(e) => handleChange(e, "utr")}
            required
            error={!!errors.utr}
            helperText={errors.utr}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "30px",
              boxShadow: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
            style={{
              padding: "10px",
              borderRadius: "30px",
              border: "2px solid #ccc",
              background: "#f5f5f5",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
              display: "block",
              marginTop: "16px",
              width: "100%",
            }}
          />
          {errors.file && <Typography color="error">{errors.file}</Typography>}

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              marginTop: "16px",
              borderRadius: "30px",
              fontWeight: "bold",
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>

          {/* Success/Error Message */}
          {message && (
            <Typography
              variant="body1"
              sx={{
                marginTop: "20px",
                color: message.type === "success" ? "green" : "red",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {message.text}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegisterPage;
