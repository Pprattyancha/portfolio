import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Modal,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionIcon from "@mui/icons-material/Description";

import MobileDrawer from "./MobileDrawer";
import { useNavigate, useLocation } from "react-router-dom";
import MenuItems from "../services/MenuItems";
import resume from "../Images/Resume_Prattyancha_Patharkar_MERN_MEAN_5Yrs.pdf";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [openResume, setOpenResume] = useState(false);

  // ✅ Resume handlers
  const handleOpenResume = () => setOpenResume(true);
  const handleCloseResume = () => setOpenResume(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resume;
    link.download = "Prattyancha_Resume.pdf";
    link.click();
  };

  const handleNavigation = (item) => {
    if (location.pathname === item.path && item.section) {
      const el = document.getElementById(item.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(item.path, { state: { section: item.section } });
    }
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={styles.navbar}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 5 } }}>
          <Typography
            className="portfolio-logo"
            onClick={() => handleNavigation({ path: "/", section: "home" })}
          >
            P<span>P</span>
          </Typography>

          {/* Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {MenuItems.map((item) => (
              <Button key={item.section} onClick={() => handleNavigation(item)} sx={{ color: 'white' }}>
                {item.section}
              </Button>
            ))}

            <IconButton href="https://github.com/" target="_blank">
              <GitHubIcon />
            </IconButton>

            <IconButton href="https://linkedin.com/" target="_blank">
              <LinkedInIcon />
            </IconButton>

            <Button
              onClick={handleOpenResume}
              startIcon={<DescriptionIcon />}
              sx={styles.button}
              variant="contained"
            >
              Resume
            </Button>
          </Box>

          {/* Mobile Menu */}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {/* Mobile Drawer */}
      <MobileDrawer
        open={open}
        setOpen={setOpen}
        MenuItems={MenuItems}
        handleNavigation={handleNavigation}
        handleOpenResume={handleOpenResume}
        handleDownload={handleDownload}
      />

      {/* Resume Modal */}
      <Modal open={openResume} onClose={handleCloseResume}>
        <Box sx={styles.modal}>
          <iframe
            src={resume}
            title="Resume"
            style={{ width: "100%", height: "70vh", border: "none" }}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button fullWidth onClick={handleCloseResume}>
              Close
            </Button>

            <Button fullWidth onClick={handleDownload} variant="contained">
              Download
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const styles = {
  navbar: {
    marginBottom: '50%',
    background:
      "linear-gradient(177deg, rgb(35 60 120 / 85%), rgba(200, 214, 235, 0.6))",
    backdropFilter: "blur(18px)",
  },

  button: {
    borderRadius: "40px",
    px: 3,
    background: "linear-gradient(90deg,#6366F1,#8B5CF6)",
  },

  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "95%", md: "70%" },
    p: 2,
    borderRadius: "12px",
    background: "#0f172a",
  },
};

export default NavBar;