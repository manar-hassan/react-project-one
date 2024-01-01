import { HourglassBottom } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <Box>
    <Typography
      className="typoColor"
      mt="30px"
      textAlign="center"
      variant="h4"
      sx={{ my: "50%" }}
    >
      Loading...
      <HourglassBottom sx={{ fontSize: "30px" }} color="warning" />
    </Typography>
  </Box>
  );
}

export default Loading;
