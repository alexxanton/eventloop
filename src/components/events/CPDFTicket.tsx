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

