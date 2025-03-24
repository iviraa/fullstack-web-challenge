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
import MailIcon from "@mui/icons-material/Mail";
import HamburgerIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { isAuth, logout } = useContext(AuthContext);
  const user = isAuth.user;
  const userName = user ? user.username : "";
  const userEmail = user ? user.email : "";

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Open dropdown menu
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Logout user
  const handleLogout = () => {
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

        {/* Menu icon */}
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <HamburgerIcon sx={{ width: 48, height: 48, padding: 1 }} />
        </IconButton>

        {/* Dropdown menu */}
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
            <Box display="flex" alignItems="end" gap={1} mt={1}>
              <PersonIcon fontSize="small" />
              <Typography variant="body2">{userName}</Typography>
            </Box>
            <Box display="flex" alignItems="end" gap={1} mt={1}>
              <MailIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {userEmail}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 1 }} />
          <MenuItem
            onClick={handleLogout}
            sx={{ color: (theme) => theme.palette.error.main }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
