import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box>
      <Typography variant="h4" color={"error"}>
        There is no design yet
        <br />
        <br />
        Please try again later...
      </Typography>
    </Box>
  );
};

export default NotFound;
