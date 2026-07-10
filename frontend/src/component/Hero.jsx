import React from "react";
import profileImg from '../Images/photo.jpeg'
import { Box } from "@mui/material";
import '../styles/glass.css';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
const Hero = () => {
  return (

    <Box style={styles.wrapper}>
      <Box>
        <h1>Hi, I'm Prattyancha Patharkar</h1>
        <h2>Software Developer</h2>
        <p>Building scalable, data-driven applications and craft high-quality user experiences.
          <br />
          Focused on performance, clean architecture, and delivering products that truly scale.</p>
        <br />
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=prattyancha009@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bounce-btn"
        >
          <MailOutlineOutlinedIcon style={{ fontSize: "28px" }} />
          <span>Lets Connect</span>
        </a>
      </Box>
      <Box style={styles.imgWrapper}>
        <img
          src={profileImg}
          alt="profile"
          style={styles.img}
        />
      </Box>
    </Box>

  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  imgWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  img: {
    width: "300px",
    borderRadius: "50px",
    objectFit: "cover",
    alignItems: "center",
    /* soften edges */
    backgroundColor: "#f0f2f5",

    /* smooth blending */
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",

    /* fade edges into background */
    maskImage: `
  linear-gradient(to top, black 79%, transparent 100%),
  linear-gradient(to bottom, black 75%, transparent 100%),
  linear-gradient(to left, black 85%, transparent 100%),
  linear-gradient(to right, black 85%, transparent 100%)
`,
    WebkitMaskImage: `
  linear-gradient(to top, black 79%, transparent 100%),
  linear-gradient(to bottom, black 75%, transparent 100%),
  linear-gradient(to left, black 85%, transparent 100%),
  linear-gradient(to right, black 85%, transparent 100%)
`,
    maskComposite: "intersect",
    WebkitMaskComposite: "destination-in",
  },
  btn: {
    background: "#ef4444",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
  },
  button: {
    mt: 5,
    ml: 1,
    borderRadius: "40px",
    px: 3,
    py: 1,
    textTransform: "none",
    fontWeight: 700,
    background: "linear-gradient(90deg,#6366F1,#8B5CF6)",
    "&:hover": {
      background: "linear-gradient(90deg,#4F46E5,#7C3AED)",
    },
  },
};

export default Hero;