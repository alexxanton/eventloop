"use client";
import { AppBar, Avatar, Box, Divider, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Menu, House, Settings, Event, ConfirmationNumber, DarkMode, LightMode } from "@mui/icons-material";
import { useState } from "react";
import { useStore } from "@/utils/zustand";
import React from "react";
import { keyframes } from "@emotion/react";

const sections = [
  {name: "Home", link: "/", icon: House},
  {name: "Settings", link: "/login", icon: Settings},
  {name: "Search Events", link: "/events", icon: Event},
  {name: "My Tickets", link: "/tickets", icon: ConfirmationNumber },
];

const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export function CNavbar() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(hover: hover) and (pointer: fine)");
  const { userUrl, theme, toggleTheme } = useStore();
  const themeMui = useTheme();
  const isMobile = useMediaQuery(themeMui.breakpoints.down("sm"));

  const toggleSidebar = (open: boolean) => {
    setOpen(open);
  };

  if (isMobile) return null;

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
            <Avatar src={userUrl} sx={{ outline: "2px solid white" }} />
          </IconButton>
        </Link>
      </Toolbar>
      <SwipeableDrawer
        open={open}
        disableSwipeToOpen={isDesktop}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        PaperProps={{
          sx: {
            background: theme === "dark"
              ? "linear-gradient(195deg, #1a1a1a 30%, #2a2a2a 90%)"
              : "linear-gradient(195deg, #f8f9fa 30%, #ffffff 90%)",
            "&:before": {
              content: "''",
              position: "absolute",
              top: -50,
              left: -20,
              width: "120px",
              height: "120px",
              background: themeMui.palette.primary.light,
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              opacity: 0.1,
              animation: `${rotate} 20s linear infinite`
            },
          }
        }}
      >
        <Box sx={{
          width: 250,
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: "''",
            position: "absolute",
            top: "20%",
            left: "60%",
            width: "80px",
            height: "80px",
            background: themeMui.palette.primary.main,
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
            opacity: 0.08,
            transform: "rotate(45deg)",
            zIndex: 0
          },
          "&:after": {
            content: "''",
            position: "absolute",
            bottom: "10%",
            left: "10%",
            width: "60px",
            height: "60px",
            background: themeMui.palette.secondary.main,
            clipPath: "circle(40% at 50% 50%)",
            opacity: 0.1,
            animation: `${floating} 6s ease-in-out infinite`
          }
        }}>
          <List sx={{ position: "relative", zIndex: 1 }}>
            {sections.map((section, index) => (
              <ListItem disablePadding key={index}>
                <Link component="a" href={section.link} sx={{
                  width: "100%",
                  textDecoration: "none",
                  color: theme === "dark" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: theme === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)"
                  }
                }}>
                  <ListItemButton>
                    <ListItemIcon sx={{
                      color: theme === "dark" ? "primary.light" : "primary.main",
                      minWidth: "40px !important"
                    }}>
                      {React.createElement(section.icon)}
                    </ListItemIcon>
                    <ListItemText
                      primary={section.name}
                      sx={{
                        "& .MuiTypography-root": {
                          fontWeight: 500,
                          letterSpacing: "0.5px"
                        }
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}

            {/* Theme Toggle Button */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={toggleTheme}
                sx={{
                  background: `linear-gradient(45deg,
                    ${themeMui.palette.primary.main} 20%,
                    ${themeMui.palette.secondary.main} 100%)`,
                  color: "white !important",
                  mt: 2,
                  mx: 2,
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme === "dark"
                      ? "0 4px 15px rgba(0,0,0,0.3)"
                      : "0 4px 15px rgba(0,0,0,0.2)"
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit !important", minWidth: "40px !important" }}>
                  {theme === "dark" ? <LightMode /> : <DarkMode />}
                </ListItemIcon>
                <ListItemText
                  primary={theme === "dark" ? "Light Mode" : "Dark Mode"}
                  sx={{ "& .MuiTypography-root": { fontWeight: 600 } }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider sx={{
            borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            mx: 2
          }}/>
        </Box>
      </SwipeableDrawer>
    </AppBar>
  );
}
