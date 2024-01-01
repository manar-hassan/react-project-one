import { Box, Typography } from '@mui/material';
import React from 'react';
import Error from "@mui/icons-material/Error";


const ErrorComponent = () => {
  return (
    <Box>
        <Typography
          className="typoColor"
          mt="30px"
          textAlign="center"
          variant="h4"
          sx={{ my: "50%" }}
        >
          Error
          <Error sx={{ fontSize: "30px" }} color="error" />
        </Typography>
      </Box>
  );
}

export default ErrorComponent;
