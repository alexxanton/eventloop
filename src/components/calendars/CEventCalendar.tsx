"use client";
import { useState, useEffect, useRef } from "react";
import { Container, TextField, Chip, Paper, Typography, Box, Avatar, Button, useTheme, Grid, useMediaQuery, ClickAwayListener } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { DateRange, Event, Search } from "@mui/icons-material";
import { EventType } from "@/utils/types/types";
import Link from "next/link";

export function CEventCalendar({events}: {events: EventType[] | null}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showMobileResults, setShowMobileResults] = useState(false);
  const searchContainerRef = useRef(null);

  const categories = ["All", "Environment", "Business", "Wellness", "Social", "Tech"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calendarStyles = {
    "& .fc-button": {
      borderRadius: "20px !important",
      backgroundColor: `${theme.palette.primary.main} !important`,
      border: "none !important",
      margin: "0 5px !important",
      "&:hover": {
        backgroundColor: `${theme.palette.primary.dark} !important`
      }
    },
    "& .fc-button-active": {
      backgroundColor: `${theme.palette.primary.dark} !important`
    }
  };

  useEffect(() => {
    if (isMobile && showMobileResults) {
      const handleClickOutside = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
          setShowMobileResults(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMobileResults, isMobile]);

  const handleSearchFocus = () => {
    if (isMobile) {
      setShowMobileResults(true);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, overflowY: isMobile ? "visible" : "hidden" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <ClickAwayListener onClickAway={() => setShowMobileResults(false)}>
            <Box ref={searchContainerRef} sx={{ position: "relative" }}>
              <Box sx={{ 
                display: { xs: "block", md: "none" }, 
                mb: 3,
                position: "relative",
                zIndex: 1200
              }}>
                <Typography variant="h6" gutterBottom>
                  Search Events
                </Typography>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search events..."
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
                      }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={handleSearchFocus}
                      onClick={handleSearchFocus}
                    />
                    <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
                      {categories.map((category) => (
                        <Chip
                          key={category}
                          label={category}
                          onClick={() => setSelectedCategory(category)}
                          variant={selectedCategory === category ? "filled" : "outlined"}
                          color="primary"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                </Paper>

                {isMobile && showMobileResults && filteredEvents.length > 0 && (
                  <Paper sx={{ 
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 1,
                    maxHeight: "60vh",
                    overflowY: "auto",
                    boxShadow: 3,
                    zIndex: 1300,
                  }}>
                    <Box sx={{ p: 2 }}>
                      {filteredEvents.map((event, index) => (
                        <EventCard key={index} event={event} theme={theme} />
                      ))}
                    </Box>
                  </Paper>
                )}
              </Box>

              <Box sx={{ overflowY: "auto", height: "90vh", display: { xs: "none", md: "block" } }}>
                <Typography variant="h6" gutterBottom>
                  Upcoming Events
                </Typography>
                <Paper sx={{ p: 2, mb: 2, borderRadius: 3, position: "sticky", top: 0, zIndex: 1000 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search events..."
                      InputProps={{
                        startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
                      }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    
                  </Box>
                </Paper>
                {filteredEvents.map((event, index) => (
                  <EventCard key={index} event={event} theme={theme} />
                ))}
              </Box>
            </Box>
          </ClickAwayListener>
        </Grid>

        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <Paper sx={{ 
            p: { xs: 1, md: 3 }, 
            borderRadius: 4,
            ...calendarStyles,
            position: "relative",
            zIndex: 1100,
          }}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
              }}
              events={events.map(event => ({
                title: event.name,
                start: `${event.start_date}`.split("T")[0],
                id: event.id,
                // color: theme.palette[event.color].main
              }))}
              eventContent={(eventInfo) => (
                <Box sx={{ p: 0.5 }}>
                  <Link href={`/event/${eventInfo.event.id}`}>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      {eventInfo.event.title}
                    </Typography>
                  </Link>
                </Box>
              )}
              height={isMobile ? "auto" : 600}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const EventCard = ({ event, theme }) => (
  <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Avatar /*sx={{ bgcolor: theme.palette[event.color].main }}*/>
        <Event />
      </Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.start_date} • {event.location}
        </Typography>
        <Chip
          label={event.category}
          size="small"
          // sx={{ mt: 1, bgcolor: theme.palette[event.color].light }}
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
);
