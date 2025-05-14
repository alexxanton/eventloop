import { TicketType } from "@/utils/types/types";
import { Box, Theme, Typography } from "@mui/material";
import QRCode from "react-qr-code";

export const CPDFTicket = ({ ticket, theme }: { ticket: TicketType; theme: Theme }) => (
  <Box sx={{
    width: "600px",
    height: "300px",
    padding: 3,
    backgroundColor: theme.palette.background.paper,
    // Include all other styles from CTicketCard but adjusted for PDF
    // Remove interactive elements like hover states
  }}>
    {/* Mirror the CTicketCard structure without interactive elements */}
    <Box sx={{ display: "flex", gap: 3 }}>
      <Box sx={{ p: 2, bgcolor: theme.palette.background.default }}>
        <QRCode
          value={JSON.stringify(ticket.ticket_number)}
          size={200}
          level="H"
          bgColor={theme.palette.background.default}
          fgColor={theme.palette.text.primary}
        />
      </Box>
      {/* Include other ticket details */}
    </Box>
  </Box>
);
