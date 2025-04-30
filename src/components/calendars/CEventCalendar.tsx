"use client";
import { useState, useRef } from "react";
import { Container, TextField, Chip, Paper, Typography, Box, Avatar, Button, useTheme, useMediaQuery, ClickAwayListener, Theme } from "@mui/material";
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

  const filteredEvents = events?.filter(event => {
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
    },
    "& .fc-day-today": {
      backgroundColor: `${theme.palette.secondary.light} !important`,
      color: theme.palette.secondary.contrastText,
      opacity: 0.9,
      boxShadow: `inset 0 0 0 2px ${theme.palette.secondary.main}`,
    }
  };

  const handleSearchFocus = () => {
    if (isMobile) {
      setShowMobileResults(true);
    }
  };

  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      position: "relative",
      "&:before": {
        content: '""',
        position: "absolute",
        top: -100,
        right: 0,
        width: "40%",
        height: "300px",
        bgcolor: "primary.light",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 30% 0)",
        opacity: 0.1,
        zIndex: -1
      }
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        position: "relative"
      }}>
        {/* Events Sidebar */}
        <Box sx={{
          width: { xs: "100%", md: "30%" },
          order: { xs: 1, md: 2 },
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: -40,
            left: 0,
            width: "100%",
            height: "60px",
            bgcolor: "primary.light",
            opacity: 0.3,
            clipPath: "polygon(0 0, 100% 40%, 100% 100%, 0 60%)",
            display: { xs: "none", md: "block" }
          }
        }}>
          <ClickAwayListener onClickAway={() => setShowMobileResults(false)}>
            <Box ref={searchContainerRef} sx={{ position: "relative" }}>
              {/* Mobile Search Section */}
              <Box sx={{
                display: { xs: "block", md: "none" },
                mb: 3,
                position: "relative",
                zIndex: 1200
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  Search Events
                </Typography>
                <Paper sx={{
                  p: 2,
                  borderRadius: 3,
                  background: `linear-gradient(145deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
                  boxShadow: 3
                }}>
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
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 25,
                          background: theme.palette.background.paper
                        }
                      }}
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
                          sx={{
                            borderRadius: 20,
                            transition: "all 0.2s",
                            "&:hover": { transform: "scale(1.05)" }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Paper>

                {isMobile && showMobileResults && filteredEvents && filteredEvents.length > 0 && (
                  <Paper sx={{
                    position: "fixed",
                    top: 300,
                    left: 16,
                    right: 16,
                    bottom: 16,
                    overflowY: "auto",
                    boxShadow: 3,
                    zIndex: 1300,
                    borderRadius: 3,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0
                  }}>
                    <Box sx={{ p: 2, pb: 4 }}>
                      {filteredEvents.map((event, index) => (
                        <EventCard key={index} event={event} theme={theme} />
                      ))}
                    </Box>
                  </Paper>
                )}
              </Box>

              {/* Desktop Events List */}
              <Box sx={{
                overflowY: "auto",
                display: { xs: "none", md: "block" },
                pr: 2,
                height: "calc(100vh - 100px)",
                position: "sticky",
                top: 100
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                  Upcoming Events
                </Typography>
                <Paper sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 3,
                  position: "sticky",
                  top: 0,
                  zIndex: 1000,
                  background: `linear-gradient(145deg, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
                  boxShadow: 3
                }}>
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
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 25,
                          background: theme.palette.background.paper
                        }
                      }}
                    />
                  </Box>
                </Paper>
                {filteredEvents?.map((event, index) => (
                  <EventCard key={index} event={event} theme={theme} />
                ))}
              </Box>
            </Box>
          </ClickAwayListener>
        </Box>

        {/* Calendar Section */}
        <Box sx={{
          width: { xs: "100%", md: "70%" },
          order: { xs: 2, md: 1 },
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: -40,
            left: -20,
            width: "150px",
            height: "150px",
            bgcolor: "secondary.light",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            opacity: 0.1,
            zIndex: -1
          }
        }}>
          <Paper sx={{
            p: { xs: 1, md: 3 },
            borderRadius: 4,
            ...calendarStyles,
            position: "relative",
            zIndex: 1100,
            background: theme.palette.background.paper,
            boxShadow: 3,
            height: { md: "calc(100vh - 110px)" },
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }}>
            <Box sx={{
              overflowY: "auto",
              flex: 1,
              pr: 1,
            }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                }}
                events={events?.map(event => ({
                  title: event.name,
                  start: `${event.start_date}`.split("T")[0],
                  id: event.id.toString(),
                }))}
                eventContent={(eventInfo) => (
                  <Box sx={{ p: 0.5, overflow: "hidden" }}>
                    <Link
                      href={`/events/${eventInfo.event.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                          fontWeight: 500
                        }}
                      >
                        {eventInfo.event.title}
                      </Typography>
                    </Link>
                  </Box>
                )}
                height="100%"
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

const EventCard = ({event, theme}: {event: EventType, theme: Theme}) => (
  <Paper sx={{
    p: 2,
    mb: 2,
    borderRadius: 3,
    transition: "all 0.3s",
    background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
    boxShadow: 2,
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: 4
    }
  }}>
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <Avatar sx={{
        bgcolor: theme.palette.primary.main,
        boxShadow: 2,
        width: 40,
        height: 40
      }}>
        <Event sx={{ fontSize: 20 }} />
      </Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(event.start_date).toUTCString()} • {event.location}
        </Typography>
        <Chip
          label={event.category}
          size="small"
          sx={{
            mt: 1,
            bgcolor: theme.palette.action.selected,
            fontWeight: 500,
            borderRadius: 20
          }}
        />
      </Box>
    </Box>
    <Button
      fullWidth
      variant="outlined"
      sx={{
        mt: 2,
        borderRadius: 25,
        borderWidth: 2,
        "&:hover": { borderWidth: 2 }
      }}
      startIcon={<DateRange />}
    >
      Join Now
    </Button>
  </Paper>
);
