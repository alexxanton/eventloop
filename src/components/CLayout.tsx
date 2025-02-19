"use client";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { CNavbar } from "./CNavbar";
import { useStore } from "@/app/zustand";



export function CLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, toggleTheme } = useStore();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#6200E8",
      },
      secondary: {
        main: "#B892F2",
      },
    },
    
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#6200E8",
      },
      secondary: {
        main: "#B892F2",
      },
    },
    
  });

  if (theme === "") return null;

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline/>
        <CNavbar/>
        <Box component="main" sx={{ p: 3, width: "100%" }}>
          <Toolbar/>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
