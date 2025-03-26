"use client"
import { Container, Paper, Typography, Box, Button, Chip, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Event, LocationOn, CalendarToday, AttachMoney, People, ChildCare, Checkroom, ArrowBack, Share } from "@mui/icons-material";
import { EventType } from "@/utils/types/types";

export function CEvent({event}: {event: EventType | null}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [event] = useState({
  //   name: "Midnight Jazz & Wine Night",
  //   description: "An elegant evening of smooth jazz performances paired with premium wine tastings in a sophisticated atmosphere.",
  //   category: "Music & Dining",
  //   location: "The Velvet Lounge, Downtown",
  //   start_date: new Date("2024-03-15T20:00"),
  //   end_date: new Date("2024-03-16T01:00"),
  //   price: 75,
  //   dress_code: "Cocktail Attire",
  //   max_capacity: 150,
  //   age_limit: 21
  // });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      year: "numeric",
      minute: "2-digit"
    });
  };

  if (!event) {
    return (null);
  }

  return (
    <Box sx={{ overflowY: "scroll" }}>
    <Container maxWidth="md" sx={{ py: 4, position: "relative" }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
        <IconButton sx={{ color: "primary.main" }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h3" fontWeight="bold" sx={{ flex: 1 }}>
          {event.name}
        </Typography>
        <Chip label={event.category} color="primary" sx={{ ml: 2 }} />
      </Box>

      {/* Cover Image Area */}
      <Paper sx={{
        height: isMobile ? 200 : 350,
        borderRadius: 4,
        mb: 4,
        background: "linear-gradient(45deg, #2c3e50 30%, #3498db 90%)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}>
        <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
          <Event sx={{ fontSize: 64, mb: 2 }} />
          <Box>{event.location}</Box>
        </Typography>
      </Paper>

      {/* Details Section */}
      <Box sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 4,
        mb: 4
      }}>
        {/* Left Column */}
        <Paper sx={{
          p: 4,
          borderRadius: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LocationOn color="primary" />
            <Typography variant="h6">{event.location}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CalendarToday color="primary" />
            <Box>
              <Typography variant="body1">
                {formatDate(event.start_date)}{event.end_date && ` - ${formatDate(event.end_date)}`}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AttachMoney color="primary" />
            <Chip 
              label={`$${event.price} per person`} 
              color="secondary" 
              sx={{ fontSize: "1.1rem", px: 2 }}
            />
          </Box>
        </Paper>

        {/* Right Column */}
        <Paper sx={{
          p: 4,
          borderRadius: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Checkroom color="primary" />
            <Typography variant="h6">{event.dress_code}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <People color="primary" />
            <Typography variant="body1">
              {event.max_capacity} spots available
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ChildCare color="primary" />
            <Typography variant="body1">
              Minimum age: {event.age_limit}
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Description Section */}
      <Paper sx={{ p: 4, borderRadius: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Event Description
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
          {event.description}
        </Typography>
      </Paper>

      {/* Sticky Join Button */}
      <Box sx={{
        position: "sticky",
        bottom: isMobile ? 16 : 32,
        display: "flex",
        justifyContent: "center",
      }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Event />}
          sx={{
            py: 2.5,
            borderRadius: 4,
            fontSize: "1.2rem",
            boxShadow: 4
          }}
        >
          {`Join Event (${event.price ? "$" + event.price : "Free"})`}
        </Button>
      </Box>

      {/* Share Button */}
      <IconButton sx={{
        position: "fixed",
        bottom: 32,
        right: 32,
        bgcolor: "primary.main",
        color: "white",
        "&:hover": { bgcolor: "primary.dark" }
      }}>
        <Share />
      </IconButton>
    </Container>
    </Box>
  );
};
