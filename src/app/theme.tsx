'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    // mode: "dark",
    primary: {
      main: "#6200E8",
    },
    secondary: {
      main: "#B892F2",
    },
  },
});

export default theme;
