"use client";
import { AppBar, Box, Divider, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar } from "@mui/material";
import { Menu, AccountCircle, House, Settings } from '@mui/icons-material';
import { useState } from "react";

export function CNavbar() {
  const [open, setOpen] = useState(false);

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
        <Link
          href="/login"
          component="a"
        >
          <IconButton
            size="large"
            edge="start"
            sx={{ color: "white", mr: 2 }}
            aria-label="menu"
          >
            <AccountCircle />
          </IconButton>
        </Link>
      </Toolbar>
      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
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
      </SwipeableDrawer>
    </AppBar>
  );
}
