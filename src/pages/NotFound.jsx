import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="h4" color={theme.palette.error.main}>
        There is no design yet
        <br />
        <br />
        Please try again later...
      </Typography>
      
    </Box>
  );
}

export default NotFound;
