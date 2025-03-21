"use client";
import { useState } from "react";
import { Container, TextField, Chip, Paper, Typography, Box, Avatar, Button, useTheme } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { DateRange, Event, FilterList } from "@mui/icons-material";

const events = [
  {
    title: "Beach Cleanup Party",
    date: "2025-03-15",
    category: "Environment",
    color: "primary",
    location: "Santa Monica Beach",
    organizer: "Eco Warriors"
  },
  {
    title: "Startup Networking Mixer",
    date: "2025-03-20",
    category: "Business",
    color: "secondary",
    location: "Downtown Co-Work Space",
    organizer: "Tech Connect"
  },
  {
    title: "Yoga in the Park",
    date: "2025-03-10",
    category: "Wellness",
    color: "error",
    location: "Central Park Pavilion",
    organizer: "Mindful Living"
  }
];

export default function Page () {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Environment", "Business", "Wellness", "Social", "Tech"];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Discover Amazing Events
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Find and join events that match your interests
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4, borderRadius: 4 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search events..."
            InputProps={{
              startAdornment: <FilterList sx={{ mr: 1, color: "action.active" }} />
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <Box sx={{ display: "flex", gap: 1, overflowX: "auto", flexShrink: 0 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "filled" : "outlined"}
                color="primary"
              />
            ))}
          </Box>
        </Box>
      </Paper>

      <Box>
        <Box>
          <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
              }}
              events={events.map(event => ({
                title: event.title,
                start: event.date,
                color: theme.palette[event.color].main
              }))}
              eventContent={(eventInfo) => (
                <Box sx={{ p: 0.5 }}>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {eventInfo.event.title}
                  </Typography>
                </Box>
              )}
              height={600}
            />
          </Paper>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Upcoming Events
          </Typography>
          
          {events.map((event, index) => (
            <Paper key={index} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar sx={{ bgcolor: theme.palette[event.color].main }}>
                  <Event />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.date} • {event.location}
                  </Typography>
                  <Chip
                    label={event.category}
                    size="small"
                    sx={{ mt: 1, bgcolor: theme.palette[event.color].light }}
                  />
                </Box>
              </Box>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
                startIcon={<DateRange />}
              >
                Join Now
              </Button>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
};
