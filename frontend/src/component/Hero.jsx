import React from "react";
import profileImg from '../Images/photo.jpeg'
import { Box } from "@mui/material";
const Hero = () => {
  return (

    <Box style={styles.wrapper}>
      <Box>
        <h1>Hi, I'm Prattyancha Patharkar</h1>
        <h2>Software Developer</h2>
        <p>Building scalable, data-driven applications and craft high-quality user experiences.
          <br />
          Focused on performance, clean architecture, and delivering products that truly scale.</p>
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
};

export default Hero;