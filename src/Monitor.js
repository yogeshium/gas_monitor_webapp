import React, { useEffect, useState } from "react";
import { database } from "./firebase";
import { onValue, ref } from "firebase/database";
import FacilityCard from "./components/FacilityCard";
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function Monitor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const query = ref(database, "all");
    return onValue(query, (snapshot) => {
      const output = snapshot.val();

      if (snapshot.exists()) {
        const newData = [];
        Object.values(output).map((d, idx) => {
          const obj = {
            name: `Facility ${idx + 1}`,
            gases: [
              {
                name: "Hydrogen",
                concentration: d.hydrogen,
                unit: "ppm",
              },
              {
                name: "Carbon Monoxide",
                concentration: d.carbonMonoxide,
                unit: "ppm",
              },
              {
                name: "LPG",
                concentration: d.lpg,
                threshold: 20,
                unit: "ppm",
              },
              { name: "Smoke",
                concentration: d.smoke,
                unit: "ppm",
              },
            ],
          };
          if(d.lpg > 20) sendNotification();
          newData.push(obj);
        });
        console.log(newData);
        setData(newData);
      }
    });
  }, []);

  const sendNotification = () => {
    axios.post('http://localhost:3000/send', {
      message: "send notification",
    })
    .then(response => {
      console.log('Notification sent:', response.data);
    })
    .catch(error => {
      console.error('Error sending notification:', error);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gas Concentration Monitor
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" mb={4}>
            Multi-Facility Gas Concentration Monitor
          </Typography>
          <Grid container spacing={4}>
            {data.map((facility, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FacilityCard facility={facility} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Monitor;