"use client";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useStore } from "@/utils/zustand";

export default function Login() {
  const { theme, toggleTheme } = useStore();
  
  return (
    <Box>
      <IconButton
        size="large"
        edge="start"
        sx={{ color: "white", mr: 2 }}
        aria-label="menu"
        onClick={toggleTheme}
      >
        {theme !== "dark" ? <DarkMode sx={{color: "#181414"}} /> : <LightMode />}
      </IconButton>
    </Box>
  );
}
