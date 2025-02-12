'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  colorSchemes: {
    dark: true,
  },
  palette: {
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
        '*': {
          transition: 'all 0.3s ease',
        },
      },
    },
  },
});

export default theme;
