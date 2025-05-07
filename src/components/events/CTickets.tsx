"use client";
import { Ticket } from "@/utils/types/types";
import { Box, Typography, TextField, Button, useTheme, Theme } from "@mui/material";
import QRCode from "react-qr-code";
import React, { useState } from "react";
import { Search, Download } from "@mui/icons-material";

export function CTickets({ tickets }: { tickets: Ticket[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  const filteredTickets = tickets.filter(ticket =>
    ticket.event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    new Date(ticket.event.start_date).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!tickets || tickets.length === 0) {
    return (
      <Box sx={{
        p: 4,
        textAlign: "center",
        minHeight: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography variant="h6" color="text.secondary">
          No tickets available
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      position: "relative",
      overflowY: "scroll",
      overflowX: "hidden",
    }}>
      {/* Search Bar */}
      <Box sx={{
        position: "sticky",
        top: 0,
        zIndex: 2,
        p: 2,
        bgcolor: "background.paper",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid",
        borderColor: "divider"
      }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: "action.active", mr: 1 }} />,
            sx: { borderRadius: 2 }
          }}
        />
      </Box>

      {/* Tickets Grid */}
      <Box sx={{
        p: 3,
        gap: 3,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(auto-fit, minmax(400px, 1fr))" }
      }}>
        {filteredTickets.map((ticket, index) => (
          <TicketCard ticket={ticket} theme={theme} key={index} />
        ))}

        {filteredTickets.length === 0 && (
          <Box sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 4,
            bgcolor: "action.hover",
            gridColumn: "1 / -1"
          }}>
            <Typography variant="body1" color="text.secondary">
              No tickets match your search
            </Typography>
          </Box>
        )}
      </Box>

      {/* Additional Background Elements */}
      <Box sx={{
        position: "absolute",
        top: "30%",
        right: "10%",
        width: "80px",
        height: "80px",
        bgcolor: "primary.main",
        clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        opacity: 0.08,
        zIndex: -1,
        transform: "rotate(45deg)"
      }} />
    </Box>
  );
}

const TicketCard = ({ ticket, theme }: { ticket: Ticket; theme: Theme }) => (
  <Box sx={{
    display: "flex",
    flexDirection: "column",
    width: "100%",
    p: 3,
    borderRadius: 4,
    background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
    boxShadow: 6,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: 8
    },
    "&:before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `repeating-linear-gradient(
        45deg,
        ${theme.palette.primary.main}80,
        ${theme.palette.primary.main}80 10px,
        transparent 10px,
        transparent 20px
      )`,
      opacity: 0.1,
      zIndex: 0
    }
  }}>
    {/* Glow Effect */}
    <Box sx={{
      position: "absolute",
      top: -50,
      right: -50,
      width: "100px",
      height: "100px",
      background: `radial-gradient(${theme.palette.primary.main}20, transparent 70%)`,
      borderRadius: "50%",
      filter: "blur(20px)"
    }} />

    {/* Card Content */}
    <Box sx={{
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: 3
    }}>
      {/* QR Code Section */}
      <Box sx={{
        p: 2,
        pb: 1,
        bgcolor: theme.palette.background.default,
        borderRadius: 3,
        flexShrink: 0,
        position: "relative",
        "&:after": {
          content: "''",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "92%",
          height: "92%",
          border: `2px solid ${theme.palette.primary.main}30`,
          borderRadius: 2,
          pointerEvents: "none"
        }
      }}>
        <QRCode
          value={JSON.stringify(ticket.ticket_number)}
          size={160}
          level="H"
          bgColor={theme.palette.background.default}
          fgColor={theme.palette.text.primary}
        />
      </Box>

      {/* Ticket Details */}
      <Box sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <Box>
          <Typography variant="h6" fontWeight="800" gutterBottom sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2
          }}>
            {ticket.event.name}
          </Typography>
          
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mb: 2
          }}>
            <Typography variant="body2" sx={{
              display: "flex",
              alignItems: "center",
              "&:before": {
                content: "'⏳'",
                mr: 1
              }
            }}>
              {new Date(ticket.event.start_date).toLocaleString()}
            </Typography>
            
            <Typography variant="body2" sx={{
              display: "flex",
              alignItems: "center",
              "&:before": {
                content: "'📍'",
                mr: 1
              }
            }}>
              {ticket.event.location}
            </Typography>
          </Box>
        </Box>

        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end"
        }}>
          <Box flex={1} />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Download />}
            sx={{
              borderRadius: 2,
              px: 3,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4,
                transition: "all 0.1s ease",
              }
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>
);
