"use client";
import { AppBar, Box, Divider, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Menu, DarkMode, LightMode, House, Settings } from '@mui/icons-material';
import { useState } from "react";
import { useStore } from "@/app/zustand";

export function CNavbar() {
  const { theme, toggleTheme } = useStore();
  const [open, setOpen] = useState(false);

  const toggleThemes = () => {
    toggleTheme();
    useStore
  };

  const toggleSidebar = (open: boolean) => {
    setOpen(open);
  };

  return (
    <AppBar component="nav" color="secondary">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          sx={{ color: "white", mr: 2 }}
          aria-label="menu"
          onClick={() => toggleSidebar(true)}
        >
          <Menu />
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
          onClick={toggleThemes}
        >
          {theme !== "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleSidebar(false)}>
          <List>
            {["Home", "Settings", "New event", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <House /> : <Settings />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </AppBar>
  );
}
