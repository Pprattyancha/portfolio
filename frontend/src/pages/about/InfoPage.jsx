import React from 'react'
import NavBar from '../../component/NavBar'
import { Box, Grid, Typography } from '@mui/material'
import photo from '../../Images/photo.jpeg';
import '../../styles/glass.css';
const InfoPage = () => {
  return (
    <Box>
      <Grid container spacing={3} sx={{ paddingLeft: '10%', paddingRight: '10%' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src={photo}
              alt="Profile"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Box>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h5"
          >
            Prattyancha Patharkar
          </Typography>

          <Typography
            variant="p"
            sx={{
              color: "#4da1cc",
              fontWeight: 600,
            }}
          >
            Frontend Team Lead
          </Typography>
        </Grid>
      </Grid>
      <Box className="marquee" >
        <Typography className="marquee-content">
          Experienced in{"\u00A0\u00A0\u00A0\u00A0"} {"\u00A0\u00A0\u00A0\u00A0"}
          MERN Developer{"\u00A0\u00A0\u00A0\u00A0"}
          React.js Developer{"\u00A0\u00A0\u00A0\u00A0"}
          Frontend Developer{"\u00A0\u00A0\u00A0\u00A0"}
          Full Stack Developer{"\u00A0\u00A0\u00A0\u00A0"}
          Python Developer{"\u00A0\u00A0\u00A0\u00A0"}
          Software Engineer
        </Typography>
      </Box>
    </Box>
  )
}

export default InfoPage