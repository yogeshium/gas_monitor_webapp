import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";

export default function GasDisplay({ gas }) {
  const isLPG = gas.name.toLowerCase() === 'lpg';
  const isHighLPG = isLPG && gas.concentration > gas.threshold;
  const textColor = isLPG ? (isHighLPG ? 'error.main' : 'success.main') : 'primary.main';
  
  // const progressValue = (gas.concentration / gas.threshold) * 100;

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      p={2} 
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Typography variant="h4" component="div" color={textColor} fontWeight="bold">
        {gas.concentration.toFixed(1)}
      </Typography>
      <Typography variant="caption" component="div" color="text.secondary">
        {gas.unit}
      </Typography>
      
      <Typography variant="body1" color="text.primary" fontWeight="medium" mt={1}>
        {gas.name}
      </Typography>
      
      {isLPG && (
        <Typography 
          variant="caption" 
          color={isHighLPG ? "error.main" : "success.main"}
          fontWeight="bold"
          mt={0.5}
        >
          {isHighLPG ? 'HIGH' : 'Normal'}
        </Typography>
      )}
      
      {/* <Box sx={{ width: '100%', mt: 1 }}>
        <LinearProgress 
          variant="determinate" 
          value={progressValue} 
          color={isHighLPG ? "error" : "primary"}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box> */}
    </Box>
  );
}