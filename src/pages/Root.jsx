import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Appbar from "../MUI-Component/Appbar";
import Drawerr from "../MUI-Component/Drawerr";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const drawerWidth = 240;
const Root = () => {
  const [mode, setmyMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "light"
      : localStorage.getItem("currentMode") === "light"
      ? "light"
      : "dark"
  );
  const darkTheme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            createBtn: {
              main: "#647488",
            },
            drawerrGrey: {
              main: grey[300],
            },
          }
        : {
            createBtn: {
              main: "#teal",
            },
            drawerrGrey: {
              main: grey[700],
            },
          }),
    },
  });
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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <Appbar
        {...{drawerWidth,showDrawer}}
        />
        <Drawerr
        {...{drawerWidth,setmyMode,blockOrNone,drawerType,closeDrawer}}
        />

        <Box
          sx={{
            ml: { sm: `${drawerWidth}px` },
            mt: "27px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Root;
