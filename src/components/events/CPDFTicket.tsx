import { TicketType } from "@/utils/types/types";
import { Box, Theme, Typography } from "@mui/material";
import QRCode from "react-qr-code";

export const CPDFTicket = ({
  ticket,
  theme,
}: {
  ticket: TicketType;
  theme: Theme;
}) => (
  <Box
    id="pdf-content"
    sx={{
      width: "100%",
      height: "100%",
      backgroundColor: "#f4f4f9", // soft background
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      boxSizing: "border-box",
    }}
  >
 <Box
      sx={{
        padding: "16px",
        border: "4px solid #e0d9f8", // decorative light lavender border
        borderRadius: "24px",
        backgroundColor: "#ffffff", // white inner background
        boxShadow: "0 0 10px rgba(0,0,0,0.05)", // subtle shadow
      }}
    >
<Box
        sx={{
          width: "1000px",
          height: "500px",
          backgroundColor: "#f8f9ff",
          display: "flex",
          flexDirection: "row",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(103, 58, 183, 0.3)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "120px",
            height: "120px",
            background: "radial-gradient(circle, rgba(106,17,203,0.2) 0%, rgba(106,17,203,0) 70%)",
          }
        }}
      >
        {/* Left section - Main content */}
        <Box
          sx={{
            width: "70%",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "white",
          }}
        >

