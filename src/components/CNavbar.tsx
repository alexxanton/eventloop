"use client";
import { AppBar, Box, IconButton, Link, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';

type CProps = {
  theme: string;
  toggleTheme: () => void;
};

export function CNavbar({theme, toggleTheme}: CProps) {
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
        <Link
          href="/"
          variant="h6"
          component="a"
          underline="hover"
          sx={{ color: "white" }}
        >
          EventLoop
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          edge="start"
          sx={{ color: "white", mr: 2 }}
          aria-label="menu"
          onClick={toggleTheme}
        >
          {theme !== "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
