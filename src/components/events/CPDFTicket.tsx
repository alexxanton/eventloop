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
    
