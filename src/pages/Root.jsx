import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import Appbar from "../MUI-Component/appbar/Appbar";
import Drawerr from "../MUI-Component/Drawerr";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import getDesignTokens from "../styles/myTheme";

const drawerWidth = 240;
const Root = () => {

  const [mode, setmyMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "light"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);


  const [blockOrNone, setblockOrNone] = useState("none");
  const [drawerType, setdrawerType] = useState("permanent");
  const showDrawer = () => {
    setblockOrNone("block");
    setdrawerType("temporary");
  };
  const closeDrawer = () => {
    setblockOrNone("none");
    setdrawerType("permanent");
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={theme.palette.mode}>
        <Appbar {...{ drawerWidth, showDrawer }} />
        <Drawerr
          {...{
            drawerWidth,
            setmyMode,
            blockOrNone,
            drawerType,
            closeDrawer,
            theme
          }}
        />

        <Box
          sx={{
            ml: { sm: `${drawerWidth}px` },
            mt: "27px",
            display: "flex",
            justifyContent: "center",
          }}
        >
        
          <Outlet/>

          
          
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Root;
