import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import GasDisplay from "./GasDisplay";

export default function FacilityCard({ facility }) {
  return (
    <Card elevation={3} sx={{
      borderRadius: 4,
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
      },
    }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center">
            <Typography variant="h5" fontWeight="bold" sx={{ mr: 1 }}>
              🏭
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="primary">
              {facility.name}
            </Typography>
          </Box>
        }
        sx={{
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      />
      <CardContent>
        <Grid container spacing={3}>
          {facility.gases.map((gas, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <GasDisplay gas={gas} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}