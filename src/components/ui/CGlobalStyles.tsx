import { GlobalStyles } from "@mui/material";

export const CGlobalStyles = () => (
  <GlobalStyles styles={{
    "*::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "*::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#B892F2",
      borderRadius: "4px",
    },
    "*": {
      scrollbarColor: "#B892F2 transparent", // Firefox
      scrollbarWidth: "thin",
    },
  }} />
);
