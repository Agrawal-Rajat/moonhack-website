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
    member1Name: "",
    member1Contact: "",
    member1College: "",
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

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("college", formData.college);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("teamName", formData.teamName);
    formDataToSend.append("utr", formData.utr);

    // Append individual team member data
    formDataToSend.append("member1Name", formData.member1Name);
    formDataToSend.append("member1Contact", formData.member1Contact);
    formDataToSend.append("member1College", formData.member1College);
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
          member1Name: "",
          member1Contact: "",
          member1College: "",
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

          {/* Team Member 1 */}
          <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2 }}>
            Team Member 1
          </Typography>
          <TextField label="Name" fullWidth margin="normal" variant="outlined" value={formData.member1Name} onChange={(e) => handleChange(e, "member1Name")} />
          <TextField label="Contact" fullWidth margin="normal" variant="outlined" value={formData.member1Contact} onChange={(e) => handleChange(e, "member1Contact")} />
          <TextField label="College Name" fullWidth margin="normal" variant="outlined" value={formData.member1College} onChange={(e) => handleChange(e, "member1College")} />

          {/* Team Member 2 */}
          <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2 }}>
            Team Member 2
          </Typography>
          <TextField label="Name" fullWidth margin="normal" variant="outlined" value={formData.member2Name} onChange={(e) => handleChange(e, "member2Name")} />
          <TextField label="Contact" fullWidth margin="normal" variant="outlined" value={formData.member2Contact} onChange={(e) => handleChange(e, "member2Contact")} />
          <TextField label="College Name" fullWidth margin="normal" variant="outlined" value={formData.member2College} onChange={(e) => handleChange(e, "member2College")} />

          {/* Team Member 3 */}
          <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2 }}>
            Team Member 3
          </Typography>
          <TextField label="Name" fullWidth margin="normal" variant="outlined" value={formData.member3Name} onChange={(e) => handleChange(e, "member3Name")} />
          <TextField label="Contact" fullWidth margin="normal" variant="outlined" value={formData.member3Contact} onChange={(e) => handleChange(e, "member3Contact")} />
          <TextField label="College Name" fullWidth margin="normal" variant="outlined" value={formData.member3College} onChange={(e) => handleChange(e, "member3College")} />

          {/* Team Member 4 */}
          <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 2 }}>
            Team Member 4
          </Typography>
          <TextField label="Name" fullWidth margin="normal" variant="outlined" value={formData.member4Name} onChange={(e) => handleChange(e, "member4Name")} />
          <TextField label="Contact" fullWidth margin="normal" variant="outlined" value={formData.member4Contact} onChange={(e) => handleChange(e, "member4Contact")} />
          <TextField label="College Name" fullWidth margin="normal" variant="outlined" value={formData.member4College} onChange={(e) => handleChange(e, "member4College")} />

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
