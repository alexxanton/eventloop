"use client";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { CNavbar } from "./CNavbar";

export function CLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "*": {
            transition: "background-color 0.5s ease",
          },
        },
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
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "*": {
            transition: "background-color 0.5s ease",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline/>
        <CNavbar theme={theme} toggleTheme={toggleTheme} />
        <Box component="main" sx={{ p: 3, width: "100%" }}>
          <Toolbar/>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
