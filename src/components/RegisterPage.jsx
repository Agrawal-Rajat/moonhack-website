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

    // Check for required fields
    for (let key in formData) {
      if (formData[key] === "") {
        setMessage({ type: "error", text: "All fields are required." });
        setLoading(false);
        return;
      }
    }

    if (!file) {
      setMessage({ type: "error", text: "Payment screenshot is required." });
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

          {/* Payment Screenshot */}
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 2, fontWeight: 600, color: "white" }}>
            Payment Screenshot
          </Typography>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              width: "100%",
              padding: "10px 0px",
              border: "2px solid #ccc",
              borderRadius: "30px",
              backgroundColor: "#f5f5f5",
              fontSize: "16px",
              marginBottom: "15px",
            }}
            required
          />
          {file && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {file.name}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: "30px",
              padding: "15px 20px",
              borderRadius: "30px",
              background: "linear-gradient(90deg, #f4c2c2, #e6b8a2)",
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>

          {/* Message */}
          {message && (
            <Typography variant="body1" sx={{ mt: 2, color: message.type === "error" ? "red" : "green" }}>
              {message.text}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegisterPage;
