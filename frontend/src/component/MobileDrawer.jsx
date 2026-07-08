import React from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionIcon from "@mui/icons-material/Description";

const MobileDrawer = ({
  open,
  setOpen,
  MenuItems,
  handleNavigation,
  handleOpenResume,
  handleDownload,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
          backgroundColor: "rgba(15,23,42,.55)",
          backdropFilter: "blur(18px)",
          borderLeft: "1px solid rgba(255,255,255,0.15)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
        
        {/* Logo */}
        <Typography
          className="portfolio-logo"
          sx={{ cursor: "pointer", mb: 2 }}
          onClick={() =>
            handleNavigation({ path: "/", section: "home" })
          }
        >
          P<span>P</span>
        </Typography>

        {/* Menu */}
        <List>
          {MenuItems.map((item, index) => (
            <ListItemButton
              key={item.path || index}
              onClick={() => handleNavigation(item)}
              sx={{
                borderRadius: 2,
                mb: 1,
                "&:hover": {
                  background: "rgba(99,102,241,.15)",
                },
              }}
            >
              <ListItemText
                primary={item.label || item.section}
                primaryTypographyProps={{
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          ))}
        </List>

        {/* Bottom Section */}
        <Box
          sx={{
            mt: "auto",
            pt: 3,
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {/* Social Icons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mb: 3,
            }}
          >
            <IconButton
              href="https://github.com/"
              target="_blank"
              sx={{ color: "#fff" }}
            >
              <GitHubIcon />
            </IconButton>

            <IconButton
              href="https://linkedin.com/"
              target="_blank"
              sx={{ color: "#fff" }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>

          {/* Resume Open */}
          <Button
            fullWidth
            variant="contained"
            startIcon={<DescriptionIcon />}
            onClick={() => {
              handleOpenResume(); // ✅ open modal
              setOpen(false);     // ✅ close drawer
            }}
            sx={{
              borderRadius: "40px",
              py: 1.3,
              textTransform: "none",
              fontWeight: 700,
              background: "linear-gradient(90deg,#6366F1,#8B5CF6)",
            }}
          >
            Resume
          </Button>

          {/* Download Resume */}
          <Button
            fullWidth
            onClick={() => {
              handleDownload();
              setOpen(false);
            }}
            sx={{
              mt: 1.5,
              borderRadius: "40px",
              py: 1.2,
              textTransform: "none",
              fontWeight: 600,
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            Download Resume
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;