import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { addContact } from "../services/apiList"; // 👈 import your API

const Contact = () => {
  // ✅ State for form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addContact(formData); // 👈 API CALL

      alert("Message sent successfully ✅");

      // reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={lightGlassNavbar}>
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",
          alignItems: "center",
          py: 8,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.37)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: "#0a0c0d",
                letterSpacing: "1px",
              }}
            >
             Let's Connect
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}
              />

              <TextField
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: "10px",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow:
                    "0 4px 20px rgba(99,102,241,0.5)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow:
                      "0 6px 25px rgba(139,92,246,0.7)",
                  },
                }}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    color: "#131414",
    "& fieldset": {
      borderColor: "rgba(13, 2, 2, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "#6366f1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8b5cf6",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(17, 17, 17, 0.6)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#8b5cf6",
  },
};
const lightGlassNavbar = {
  minHeight: "84vh",
  background:
    "linear-gradient(177deg, rgba(129, 166, 227, 0.25), rgba(243, 236, 236, 0.15))",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
    opacity: 0.7,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
    opacity: 0.7,
  },
};

export default Contact;