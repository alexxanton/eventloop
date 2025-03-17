import { useTheme } from "@mui/material";

export const isDarkModeOn = () => useTheme().palette.mode === "dark";
