"use client";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useStore } from "@/utils/zustand";
import { CNavbar } from "../ui/CNavbar";

export function CLayout({children}: Readonly<{children: React.ReactNode}>) {
  const { theme } = useStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }
  
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

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex", height: "100vh", overflowY: "hidden" }}>
        <CssBaseline/>
        <CNavbar/>
        <Box component="main" sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Toolbar/>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
