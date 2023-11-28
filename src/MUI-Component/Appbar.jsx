import { AppBar, Avatar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
const Appbar = ({ drawerWidth,showDrawer }) => {
  return (
    <div>
      <AppBar
        position="static"
        sx={{
          ml: { sm: `${drawerWidth}px` },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar>
          <IconButton onClick={() => {
            showDrawer();
          }} sx={{mr:"9px",display:{sm:"none"}}}>
            <MenuIcon/>
          </IconButton>
          <Link
            href="/"
            underline="none"
            color="inherit"
            sx={{ flexGrow: 1, "&:hover": { fontSize: 16.5 } }}
          >
            expendence
          </Link>
          <Typography color="inherit" mr={2}>
            Manar Hassan
          </Typography>
          <Avatar
            alt="Cindy Baker"
            src="  https://mui.com/static/images/avatar/3.jpg"
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
