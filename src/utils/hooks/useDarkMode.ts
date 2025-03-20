import { useTheme } from "@mui/material";

export const useDarkMode = () => useTheme().palette.mode === "dark";
