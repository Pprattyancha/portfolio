import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Rating,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
import NavBar from "./NavBar";

// ✅ Import API functions
import { getReviews, addReview } from "../services/apiList";

const Review = () => {
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);

  // ✅ GET Reviews
  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (_, value) => {
    setForm({ ...form, rating: value });
  };

  // ✅ POST Review
  const handleSubmit = async () => {
    try {
      await addReview(form);

      setForm({ name: "", rating: 0, comment: "" });
      setOpen(false);

      fetchReviews(); // refresh list
    } catch (err) {
      console.error("Error adding review:", err);
    }
  };

  return (
    <>
      <NavBar />

      <Box sx={{ mt: 10, px: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4">Reviews</Typography>

          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={styles.button}
          >
            + Add Review
          </Button>
        </Box>

        {/* Review List */}
        <Box sx={{ mt: 3, display: "grid", gap: 2 }}>
          {reviews.length === 0 ? (
            <Typography>No reviews yet</Typography>
          ) : (
            reviews.map((r, i) => (
              <Card key={i} sx={styles.card}>
                <CardContent>
                  <Typography fontWeight={700}>{r.name}</Typography>

                  <Rating value={r.rating} readOnly />

                  <Typography sx={{ mt: 1 }}>{r.comment}</Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>

      {/* ✅ Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={styles.modal}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Add Review
          </Typography>

          <TextField
            fullWidth
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={styles.input}
          />

          <Box sx={{ mt: 2 }}>
            <Typography sx={{ mb: 1 }}>Rating</Typography>
            <Rating value={form.rating} onChange={handleRating} />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Comment"
            name="comment"
            value={form.comment}
            onChange={handleChange}
            sx={styles.input}
          />

          <Button onClick={handleSubmit} sx={styles.button}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const styles = {
  button: {
    borderRadius: "30px",
    px: 3,
    py: 1,
    fontWeight: 600,
    background: "linear-gradient(90deg,#6366F1,#8B5CF6)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(90deg,#4F46E5,#7C3AED)",
    },
  },

  card: {
    borderRadius: "16px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    color: "#fff",
  },

  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: { xs: "90%", md: "40%" },
    p: 3,
    borderRadius: "20px",

    background:
      "linear-gradient(145deg, rgba(255,255,255,0.35), rgba(255,255,255,0.15))",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",

    border: "1px solid rgba(255,255,255,0.3)",
  },

  input: {
    mt: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      background: "rgba(255,255,255,0.4)",
    },
  },
};

export default Review;