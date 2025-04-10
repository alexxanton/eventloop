"use client";
import { TicketType } from "@/utils/types/types";
import { Box, Typography } from "@mui/material";
import QRCode from 'react-qr-code';
import React from 'react';

export function CTickets({tickets}: {tickets: TicketType[]}) {
  if (!tickets || tickets.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        No tickets
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: "flex",
      flexDirection: "column",
      gap: 3,
      p: 2
    }}>
      {tickets.map((ticket, index) => (
        <Box 
          key={index} 
          sx={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            maxWidth: 300,
            mx: "auto"
          }}
        >
          { <QRCode 
            value={JSON.stringify(ticket)} 
            size={200}
            level="H" // Nivel de corrección de errores (High)
          /> }
          
          <Box sx={{ mt: 2}}>
            <Typography>Event: {ticket.event.name}</Typography>
            <Typography>Date: {new Date(ticket.event.start_date).toLocaleString()}</Typography>
            <Typography>Location: {ticket.event.location}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
