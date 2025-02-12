"use client";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import { useState } from "react";

export function CNavbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppBar component="nav" color="secondary">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          sx={{ color: "white", mr: 2 }}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "white" }}
        >
          EventLoop
        </Typography>
        <IconButton
          size="large"
          edge="start"
          sx={{ color: "white", mr: 2 }}
          aria-label="menu"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
