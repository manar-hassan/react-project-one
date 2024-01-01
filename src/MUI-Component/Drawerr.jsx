import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import { AccountBox, Brightness4, Brightness7 } from "@mui/icons-material";
const Drawerr = ({
  drawerWidth,
  setmyMode,
  blockOrNone,
  drawerType,
  closeDrawer,
  theme
}) => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const myList = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Create", icon: <CreateIcon />, path: "/create" },
    { text: "Profile", icon: <AccountBox />, path: "/profile" },
  ];
  return (
    <Box component="nav">
      <Drawer
        sx={{
          display: { xs: blockOrNone, sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant={drawerType}
        anchor="left"
        open={true}
        onClose={() => {
          closeDrawer();
        }}
      >
        <List>
          <ListItem
            disablePadding
            sx={{ display: "flex", justifyContent: "center", pb: "14px" }}
          >
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "currentMode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                setmyMode(theme.palette.mode === "light" ? "dark" : "light");
              }}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7 sx={{ color: "orange" }} />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
          </ListItem>

          <Divider />
          {myList.map((item) => {
            return (
              <ListItem
              // className="listBg"
                key={item.text}
                disablePadding
                sx={{
                  bgcolor:
                    currentLocation.pathname === item.path
                      ? theme.palette.drawerrGrey.main
                      : null,
                }}
              >
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}

      
        </List>

      </Drawer>
    </Box>
  );
};

export default Drawerr;
