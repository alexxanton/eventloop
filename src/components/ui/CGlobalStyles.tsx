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
      backgroundColor: "black",
      borderRadius: "4px",
    },
    "*": {
      scrollbarColor: "black transparent", // Firefox
      scrollbarWidth: "thin",
    },
  }} />
);
