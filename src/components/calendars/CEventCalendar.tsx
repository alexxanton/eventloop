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
    "& .fc": {
      fontFamily: theme.typography.fontFamily,
      "--fc-border-color": theme.palette.divider,
    },
    "& .fc-button": {
      borderRadius: "20px !important",
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}) !important`,
      border: "none !important",
      margin: "0 5px !important",
      transition: "all 0.3s !important",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: `${theme.shadows[4]} !important`,
        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark}) !important`
      }
    },
    "& .fc-button-active": {
      boxShadow: `${theme.shadows[4]} !important`
    },
    "& .fc-toolbar-title": {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: theme.palette.text.primary,
      textShadow: `0 2px 4px ${theme.palette.action.hover}`
    },
    "& .fc-daygrid-day": {
      background: `repeating-linear-gradient(
        45deg,
        ${theme.palette.action.hover},
        ${theme.palette.action.hover} 2px,
        transparent 2px,
        transparent 8px
      )`,
      "&:hover": {
        background: theme.palette.action.hover
      }
    },
    "& .fc-day-today": {
      background: `${theme.palette.secondary.light} !important`,
      boxShadow: `inset 0 0 0 2px ${theme.palette.secondary.main}`,
      "& .fc-daygrid-day-number": {
        color: theme.palette.secondary.contrastText,
        fontWeight: 700
      }
    },
    "& .fc-event": {
      borderRadius: "8px !important",
      border: "none !important",
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}) !important`,
      boxShadow: theme.shadows[2],
      transition: "all 0.3s",
      "&:hover": {
        boxShadow: theme.shadows[6],
        transform: "translateY(-2px)"
      }
    },
    "& .fc-col-header": {
      backgroundColor: `${theme.palette.background.paper} !important`,
    },
    "& .fc-daygrid-day-frame": {
      [theme.breakpoints.down("md")]: {
        minHeight: "60px!important",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    },
    "& .fc-daygrid-day-number": {
      [theme.breakpoints.down("md")]: {
        fontSize: "1.2rem!important",
        padding: "8px!important"
      }
    },
    "& .fc-col-header-cell-cushion": {
      [theme.breakpoints.down("md")]: {
        fontSize: "0.8rem!important",
        padding: "4px!important"
      }
    },
    "& .fc-toolbar": {
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        gap: "16px"
      }
    },
    "& .fc-header-toolbar": {
      [theme.breakpoints.down("md")]: {
        marginBottom: "8px!important"
      }
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
            position: "relative",
            zIndex: 1100,
            background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
            boxShadow: 6,
            border: `1px solid ${theme.palette.divider}`,
            height: { md: "calc(100vh - 110px)", xs: "calc(100vh - 330px)" },
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            ...calendarStyles
          }}>
            <Box sx={{
              overflowY: "auto",
              flex: 1,
              pr: 1,
            }}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                headerToolbar={{
                  left: isMobile ? 'prev,next' : 'prev,next today',
                  center: isMobile ? '' : 'title',
                  right: isMobile ? 'today' : 'prev,next today'
                }}
                events={events?.map(event => ({
                  title: event.name,
                  start: `${event.start_date}`.split("T")[0],
                  id: event.id.toString(),
                }))}
                eventContent={(eventInfo) => (
                  <Box sx={{ 
                    p: 0.5,
                    overflow: "hidden",
                    [theme.breakpoints.down('md')]: {
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }}>
                    <Link href={`/events/${eventInfo.event.id}`} style={{ textDecoration: "none" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          textDecoration: "none",
                          fontWeight: 500,
                          [theme.breakpoints.down('md')]: {
                            fontSize: '0.9rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }
                        }}
                      >
                        {isMobile ? (
                          <>
                            <Event sx={{ fontSize: 14, mr: 0.5 }} />
                            {eventInfo.event.title}
                          </>
                        ) : (
                          eventInfo.event.title
                        )}
                      </Typography>
                    </Link>
                  </Box>
                )}
                height={isMobile ? "auto" : "100%"}
                aspectRatio={isMobile ? 1.5 : 1.8}
                dayMaxEventRows={isMobile ? 1 : 3}
                views={{
                  dayGridMonth: {
                    dayHeaderFormat: isMobile ? { weekday: 'short' } : { weekday: 'long' },
                  },
                  listMonth: {
                    listDayFormat: { 
                      month: 'short', 
                      day: 'numeric', 
                      weekday: 'short' 
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

const EventCard = ({ event, theme }: { event: EventType; theme: Theme }) => (
  <Box sx={{
    p: 2,
    mb: 2,
    borderRadius: 3,
    background: `
      linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%),
      repeating-linear-gradient(
        -45deg,
        ${theme.palette.primary.main}15,
        ${theme.palette.primary.main}15 8px,
        transparent 8px,
        transparent 16px
      )
    `,
    boxShadow: 6,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: 8,
    },
    "&:before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: "-50%",
      width: "200%",
      height: "100%",
      background: `
        repeating-linear-gradient(
          -45deg,
          ${theme.palette.primary.main}10,
          ${theme.palette.primary.main}10 15px,
          transparent 15px,
          transparent 30px
        )
      `,
      transition: "transform 0.6s ease",
      zIndex: 0
    }
  }}>
    {/* Content Container */}
    <Box sx={{
      position: "relative",
      zIndex: 1,
      display: "flex",
      gap: 2,
      alignItems: "center",
      background: theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.4)"
        : "rgba(255, 255, 255, 0.6)",
      borderRadius: 3,
      p: 2,
      backdropFilter: "blur(4px)"
    }}>
      {/* Avatar with Stripe Accent */}
      <Box sx={{
        position: "relative",
        flexShrink: 0,
        "&:before": {
          content: "''",
          position: "absolute",
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          background: `
            repeating-linear-gradient(
              45deg,
              ${theme.palette.primary.main}30,
              ${theme.palette.primary.main}30 4px,
              transparent 4px,
              transparent 8px
            )
          `,
          borderRadius: "50%",
          zIndex: -1
        }
      }}>
        <Avatar sx={{
          bgcolor: theme.palette.background.paper,
          width: 40,
          height: 40,
          boxShadow: 2,
          "& .MuiSvgIcon-root": {
            color: theme.palette.primary.main
          }
        }}>
          <Event />
        </Avatar>
      </Box>

      {/* Event Details */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="800" sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2,
          mb: 0.5 // Tighter margin
        }}>
          {event.name}
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5 // Tighter gap
        }}>
          <Typography variant="body2" sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: 'text.secondary',
            '&:before': {
              content: '"📅"',
              mr: 0.5 // Smaller margin
            }
          }}>
            {new Date(event.start_date).toUTCString()}
          </Typography>

          <Typography variant="body2" sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: 'text.secondary',
            '&:before': {
              content: '"📍"',
              mr: 0.5
            }
          }}>
            {event.location}
          </Typography>
        </Box>

        <Chip
          label={event.category}
          size="small"
          sx={{
            mt: 1, // Reduced margin
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            color: theme.palette.getContrastText(theme.palette.primary.light),
            borderRadius: 2,
            boxShadow: 1,
            fontSize: '0.75rem' // Smaller text
          }}
        />
      </Box>
    </Box>

    {/* Join Button */}
    <Button
      fullWidth
      variant="contained"
      sx={{
        mt: 2,
        py: 1,
        borderRadius: 2,
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        boxShadow: 4,
        fontSize: "0.9rem",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 6
        }
      }}
      startIcon={<DateRange sx={{ fontSize: 18 }} />}
    >
      Join Event
    </Button>
  </Box>
);