"use client";
import { Ticket } from "@/utils/types/types";
import { Box, Typography, TextField, useTheme } from "@mui/material";
import React, { useState, useMemo } from "react";
import { Search } from "@mui/icons-material";
import { CTicketCard } from "./CTicketCard";

export function CTickets({ tickets }: { tickets: Ticket[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  // Group tickets by event ID
  const groupedTickets = useMemo(() => {
    const groups: Record<string, Ticket[]> = {};
    
    tickets.forEach(ticket => {
      const eventId = ticket.event.id;
      if (!groups[eventId]) {
        groups[eventId] = [];
      }
      groups[eventId].push(ticket);
    });
    
    return Object.values(groups);
  }, [tickets]);

  // Filter grouped tickets based on search query
  const filteredGroups = useMemo(() => {
    return groupedTickets.filter(group => {
      const event = group[0].event; // All tickets in group share same event
      return (
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        new Date(event.start_date).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [groupedTickets, searchQuery]);

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
        {filteredGroups.map((ticketGroup, index) => (
          <CTicketCard
            key={ticketGroup[0].event.id}
            tickets={ticketGroup}
            theme={theme}
          />
        ))}

        {filteredGroups.length === 0 && (
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