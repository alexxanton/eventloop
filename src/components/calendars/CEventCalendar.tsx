"use client";
import { useState, useRef, useCallback } from "react";
import { Container, TextField, Chip, Paper, Typography, Box, useTheme, useMediaQuery, ClickAwayListener, DialogContent, Dialog, DialogTitle, Divider, IconButton, InputAdornment, Slider } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { Event as EventIcon, FilterList, Search } from "@mui/icons-material";
import { Event } from "@/utils/types/types";
import Link from "next/link";
import { CEventCard } from "../groups/chat/CEventCard";

const categories = [
  "Social & Entertainment",
  "Business & Networking",
  "Educational",
  "Sports & Fitness",
  "Community & Cultural",
  "Arts & Performance",
  "Tech & Innovation",
  "Food & Drink",
  "Outdoor & Adventure",
  "Virtual & Hybrid"
];

export function CEventCalendar({events}: {events: Event[] | null}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileResults, setShowMobileResults] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [dateRange, setDateRange] = useState<[string, string]>(["", ""]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = useCallback((filter: string, value: any) => {
    switch (filter) {
      case "category":
        setSelectedCategories(prev => 
          prev.includes(value) 
            ? prev.filter(c => c !== value) 
            : [...prev, value]
        );
        break;
      case "price":
        setPriceRange(value as [number, number]);
        break;
      case "dateStart":
        setDateRange([value, dateRange[1]]);
        break;
      case "dateEnd":
        setDateRange([dateRange[0], value]);
        break;
    }
  }, [dateRange]);

  const filteredEvents = events?.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
    
    const eventDate = new Date(event.start_date).getTime();
    const startDate = dateRange[0] ? new Date(dateRange[0]).getTime() : -Infinity;
    const endDate = dateRange[1] ? new Date(dateRange[1]).getTime() : Infinity;
    const matchesDate = eventDate >= startDate && eventDate <= endDate;

    return matchesSearch && matchesCategory && matchesPrice && matchesDate;
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
        justifyContent: "center",
        overflow: "hidden"
      }
    },
    "& .fc-toolbar": {
      padding: "12px 0",
      overflow: "visible",
      "& .fc-button-group": {
        position: "relative",
        zIndex: 1
      }
    },
    "& .fc-button:focus": {
      outline: "none !important",
      boxShadow: `${theme.shadows[6]} !important`,
    },
  };

  const handleSearchFocus = useCallback(() => {
    if (isMobile) {
      setShowMobileResults(true);
    }
  }, [isMobile]);

  

  return (
    <Container maxWidth="xl" sx={{
      py: 4,
      position: "relative",
      "&:before": {
        content: "''",
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
        position: "relative"
      }}>
        {/* Events Sidebar */}
        <Box sx={{
          width: { xs: "100%", md: "30%" },
          order: { xs: 1, md: 2 },
          position: "relative",
          "&:after": {
            content: "''",
            position: "fixed",
            bottom: -40,
            left: 0,
            width: "100%",
            height: "90px",
            bgcolor: "primary.light",
            opacity: 0.3,
            clipPath: "polygon(0 0, 100% 40%, 100% 100%, 0 60%)",
            display: "flex",
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
                  <SearchFilter
                    isMobile={isMobile}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onFilterChange={handleFilterChange}
                    priceRange={priceRange}
                    dateRange={dateRange}
                    selectedCategories={selectedCategories}
                    onFocus={handleSearchFocus}
                    onClick={handleSearchFocus}
                  />
                </Paper>

                {isMobile && showMobileResults && filteredEvents && filteredEvents.length > 0 && (
                  <Paper sx={{
                    position: "fixed",
                    top: 160,
                    left: 16,
                    right: 16,
                    bottom: 16,
                    overflowY: "auto",
                    boxShadow: 3,
                    zIndex: 1300,
                    borderRadius: 3,
                  }}>
                    <Box sx={{ p: 2, pb: 4 }}>
                      {filteredEvents.map((event, index) => (
                        <CEventCard key={index} event={event} />
                      ))}
                    </Box>
                  </Paper>
                )}
              </Box>

              {/* Desktop Events List */}
              <Box sx={{
                overflowY: "auto",
                display: { xs: "none", md: "block" },
                height: "calc(100vh - 100px)",
                position: "sticky",
                top: 100,
                p: 1,
                pl: 2,
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
                  <SearchFilter
                    isMobile={isMobile}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onFilterChange={handleFilterChange}
                    priceRange={priceRange}
                    dateRange={dateRange}
                    selectedCategories={selectedCategories}
                  />
                </Paper>
                {filteredEvents?.map((event, index) => (
                  <Link href={`/events/${event.id}`} style={{ textDecoration: "none" }} key={index}>
                    <CEventCard event={event} />
                  </Link>
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
            content: "''",
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
                  left: isMobile ? "prev,next" : "prev,next today",
                  center: isMobile ? "" : "title",
                  right: isMobile ? "today" : "prev,next today"
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
                    [theme.breakpoints.down("md")]: {
                      display: "flex",
                      alignItems: "center"
                    }
                  }}>
                    <Link href={`/events/${eventInfo.event.id}`} style={{ textDecoration: "none" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          textDecoration: "none",
                          fontWeight: 500,
                          [theme.breakpoints.down("md")]: {
                            fontSize: "0.9rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                          }
                        }}
                      >
                        {isMobile ? (
                          <>
                            <EventIcon sx={{ fontSize: 14, mr: 0.5 }} />
                            {eventInfo.event.title}
                          </>
                        ) : (
                          eventInfo.event.title
                        )}
                      </Typography>
                    </Link>
                  </Box>
                )}
                // height={isMobile ? "auto" : "100%"}
                height="100%"
                aspectRatio={isMobile ? 1.5 : 1.8}
                dayMaxEventRows={isMobile ? 1 : 3}
                views={{
                  dayGridMonth: {
                    dayHeaderFormat: isMobile ? { weekday: "short" } : { weekday: "long" },
                  },
                  listMonth: {
                    listDayFormat: {
                      month: "short",
                      day: "numeric",
                      weekday: "short"
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

const SearchFilter = ({
  isMobile,
  searchQuery,
  onSearchChange,
  onFilterChange,
  priceRange,
  dateRange,
  selectedCategories ,
  onFocus,
  onClick
}: {
  isMobile: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFilterChange: (filter: string, value: any) => void;
  priceRange: [number, number];
  dateRange: [string, string];
  selectedCategories: string[];
  onFocus?: () => void;
  onClick?: () => void;
}) => {
  const theme = useTheme();
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={onFocus}
          onClick={onClick}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "action.active" }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 25,
              background: theme.palette.background.paper,
              }
            }}
        />
        <IconButton
          onClick={toggleFilters}
          sx={{
            bgcolor: showFilters ? "primary.main" : "background.paper",
            color: showFilters ? "primary.contrastText" : "text.primary",
            borderRadius: 25,
            p: 1.5,
            boxShadow: theme.shadows[2],
            "&:hover": {
              bgcolor: "primary.dark",
              color: "primary.contrastText"
            }
          }}
        >
          <FilterList />
        </IconButton>
      </Box>

      <Dialog
        open={showFilters}
        onClose={() => setShowFilters(false)}
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            position: isMobile ? "fixed" : "absolute",
            top: isMobile ? undefined : "60px",
            right: isMobile ? undefined : "0",
            m: 2,
            borderRadius: 3,
            minWidth: isMobile ? undefined : "400px"
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Filter Events</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Date Range
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  type="date"
                  label="Start Date"
                  value={dateRange[0]}
                  onChange={(e) => onFilterChange("dateStart", e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  type="date"
                  label="End Date"
                  value={dateRange[1]}
                  onChange={(e) => onFilterChange("dateEnd", e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Price Range (${priceRange[0]} - ${priceRange[1]})
              </Typography>
              <Slider
                value={priceRange}
                onChange={(_, value) => onFilterChange("price", value)}
                valueLabelDisplay="auto"
                min={0}
                max={500}
                sx={{ color: "primary.main" }}
              />
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Categories
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => onFilterChange("category", category)}
                    variant={selectedCategories.includes(category) ? "filled" : "outlined"}
                    color="primary"
                    size="small"
                    sx={{ borderRadius: 20 }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
