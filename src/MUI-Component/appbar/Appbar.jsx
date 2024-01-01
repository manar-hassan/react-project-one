import {
  AppBar,
  Avatar,
  IconButton,
  Link,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "/react/react-project-one/src/firebase/config";
import {  signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Appbar.css';
const Appbar = ({ drawerWidth, showDrawer }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  
  return (
    <div>
      <AppBar
      className="app-bar"
        position="static"
        sx={{
          ml: { sm: `${drawerWidth}px` },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar>
          <IconButton
            onClick={() => {
              showDrawer();
            }}
            sx={{ mr: "9px", display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            href="/"
            underline="none"
            color="inherit"
            sx={{ flexGrow: 1, "&:hover": { fontSize: 16.5 } ,textAlign:"left"}}
          >
            expendence
          </Link>
          {!user && 
            <Button className="button"  variant="contained"  sx={{bgcolor:"white",color:"blue", mr:3}} onClick={() => {
              navigate("/signin")
            }}>
              
              sign-in
            </Button>
          }
            {!user && 
            <Button  className="button" variant="contained"  sx={{bgcolor:"white",color:"blue",mr:3}} onClick={() => {
              navigate("/signup")
            }}>
              sign-up
            </Button>
          }
            {user && 
            <Button  className="button" variant="contained"  sx={{bgcolor:"white",color:"blue",mr:3}} onClick={() => {
              signOut(auth).then(() => {
                navigate("/signin")
              }).catch((error) => {
              });
            }}>
              sign-out
            </Button>
          }
          {user&& <Typography color="inherit" mr={2}>
            {user.displayName}
          </Typography>}

          {user&& <Avatar
            alt={user.displayName}
            src={user.photoURL}
          />}
        
          
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
