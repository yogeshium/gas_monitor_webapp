import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Message = ({ notification }) => {
  return (
    <Paper elevation={3} sx={{ 
      p: 2, 
      borderRadius: 2,
      backgroundColor: 'background.paper',
      transition: 'box-shadow 0.3s ease-in-out',
      '&:hover': {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
    }}>
      <Box id="notificationHeader" display="flex" alignItems="center" mb={1}>
        {notification.image && (
          <Box id="imageContainer" mr={2}>
            <img src={notification.image} alt="Notification" style={{ width: 60, height: 60, borderRadius: '50%' }} />
          </Box>
        )}
        <Typography variant="h6" fontWeight="bold" color="primary">
          {notification.title}
        </Typography>
      </Box>
      <Typography id="notificationBody" variant="body1" color="text.secondary">
        {notification.body}
      </Typography>
    </Paper>
  );
};

export default Message;