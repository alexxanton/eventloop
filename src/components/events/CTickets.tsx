"use client";
import { EventType } from "@/utils/types/types";
import { Box } from "@mui/material";

export function CTickets({tickets}: {tickets: EventType[] | null}) {
  if (!tickets || tickets.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        No hay tickets disponibles
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      p: 2
    }}>
      {tickets.map((ticket, index) => (
        <Box 
          key={index} 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            border: '1px solid #ddd',
            borderRadius: 2,
            maxWidth: 300,
            mx: 'auto'
          }}
        >
          <QRCode 
            value={JSON.stringify(ticket)} 
            size={200}
            level="H" // Nivel de corrección de errores (High)
            includeMargin={true}
          />
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <div><strong>Evento:</strong> {ticket.eventName}</div>
            <div><strong>Fecha:</strong> {ticket.eventDate}</div>
            <div><strong>Localización:</strong> {ticket.location}</div>
            {/* Agrega más campos según tu estructura EventType */}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
        
