"use client";
import { AppBar, Avatar, Box, Divider, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, useMediaQuery } from "@mui/material";
import { Menu, House, Settings, Event, ConfirmationNumber  } from '@mui/icons-material';
import { useState } from "react";
import { useDarkMode } from "@/utils/hooks/useDarkMode";
import React from "react";
import { useStore } from "@/utils/zustand";

const sections = [
  {name: "Home", link: "/", icon: House},
  {name: "Settings", link: "/login", icon: Settings},
  {name: "Search Events", link: "/events", icon: Event},
  {name: "My Tickets", link: "/tickets", icon: ConfirmationNumber },
];

export function CNavbar() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(hover: hover) and (pointer: fine)");
  const isDarkMode = useDarkMode();
  const { userUrl } = useStore();

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
            edge="start"
            sx={{ color: "white"}}
            aria-label="menu"
          >
            <Avatar src={userUrl} />
          </IconButton>
        </Link>
      </Toolbar>
      <SwipeableDrawer
        open={open}
        disableSwipeToOpen={isDesktop}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleSidebar(false)}>
          <List>
            {sections.map((section, index) => (
              <Link component="a" href={section.link} key={index} sx={{ color: isDarkMode ? "white" : "black" }} underline="none">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {React.createElement(section.icon)}
                    </ListItemIcon>
                    <ListItemText primary={section.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </Box>
      </SwipeableDrawer>
    </AppBar>
  );
}
