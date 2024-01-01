import { grey } from "@mui/material/colors";


  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            drawerrGrey: {
              main: grey[300],
            },
          }
        : {
            drawerrGrey: {
              main: grey[700],
            },
          }),
    },
  });


export default getDesignTokens;

