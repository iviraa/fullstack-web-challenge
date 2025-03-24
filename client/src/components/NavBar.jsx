import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Box,
  ListItemIcon,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import HamburgerIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { isAuth, logout } = useContext(AuthContext);

  const user = isAuth.user;

  console.log("User:", user);
  const userName = user ? user.username : "";
  const userEmail = user ? user.email : "";

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
    handleCloseMenu();
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
      sx={{ margin: 0, padding: 0 }}
    >
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          tasks
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <HamburgerIcon
            alt={userName}
            sx={{ width: 48, height: 48, padding: 1 }}

          />
        </IconButton>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          sx={{ mt: 1 }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              My Account
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <PersonIcon fontSize="small" />
              <Typography variant="body2">{userName}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {userEmail}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
