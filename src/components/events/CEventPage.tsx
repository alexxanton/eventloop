"use client"
import { Container, Paper, Typography, Box, Button, Chip, IconButton, useTheme } from "@mui/material";
import { Event as EventIcon, LocationOn, CalendarToday, AttachMoney, People, ChildCare, Checkroom, Share } from "@mui/icons-material";
import { Event } from "@/utils/types/types";
import { supabase } from "@/utils/supabase/supabase";
import { useUser } from "@/utils/hooks/useUser";
import { MuiStyles } from "@/utils/types/types";
import { useState } from "react";

export function CEventPage({event}: {event: Event | null}) {
  const [loading, setLoading] = useState(false);
  const userId = useUser()?.id;
  const theme = useTheme();

  const handleJoinEvent = async () => {
    const eventId = event?.id;
    const price = event?.price;

    const res = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventId, price }),
    });

    const { url, error } = await res.json();
    if (error) throw new Error(error);

    window.location.href = url;

    const newMember = {
      user_id: userId,
      group_id: event?.group_id,
    };

    const ticket = {
      user_id: userId,
      event_id: event?.id
    };

    setLoading(true);

    const { error: memberError } = await supabase
      .from("group_members")
      .upsert(newMember, { onConflict: "user_id,group_id" });
    
    const { error: ticketError } = await supabase.from("tickets").insert(ticket);
    setLoading(false);

    if (memberError || ticketError) {
      alert(memberError?.message || ticketError?.message);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      year: "numeric",
      minute: "2-digit"
    });
  };

  if (!event) return null;

  return (
    <Box sx={{
      ...styles.box,
      position: "relative",
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "400px",
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 100%)",
        zIndex: -1,
        opacity: 0.1
      }
    }}>
      <Container sx={{
        ...styles.container,
        position: "relative",
      }}>
        {/* Header */}
        <Box sx={styles.headerBox}>
          <Typography variant="h3" fontWeight="bold" sx={styles.eventTitle}>
            {event.name}
          </Typography>
          <Chip
            label={event.category}
            color="primary"
            sx={{
              ...styles.categoryChip,
              borderRadius: 25,
              fontSize: "1.1rem",
              px: 2
            }}
          />
        </Box>

        {/* Cover Image */}
        <Paper sx={{
          ...styles.coverPaper,
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, transparent 100%)`,
            opacity: 0.3
          }
        }}>
          <Box sx={{
            position: "absolute",
            bottom: -40,
            right: -40,
            width: "200px",
            height: "200px",
            bgcolor: "primary.light",
            clipPath: "circle(50% at 70% 70%)",
            opacity: 0.2,
            zIndex: 0
          }} />
          <Typography variant="h4" component="div" sx={styles.coverText}>
            <EventIcon sx={{
              ...styles.coverIcon,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
            }} />
            <Box sx={{ textShadow: "0 4px 8px rgba(0,0,0,0.3)" }}>{event.location}</Box>
          </Typography>
        </Paper>

        {/* Details Section */}
        <Box sx={styles.detailsContainer}>
          <Paper sx={{
            ...styles.detailsPaper,
            transition: "all 0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 4
            }
          }}>
            {[
              { icon: <LocationOn color="primary" />, content: event.location },
              { icon: <CalendarToday color="primary" />,
                content: `${formatDate(event.start_date)}${event.end_date ? ` - ${formatDate(event.end_date)}` : ''}` },
              { icon: <AttachMoney color="primary" />,
                content: <Chip
                  label={event.price > 0 ? `$${event.price} per person` : "Free"}
                  color="secondary"
                  sx={{ ...styles.priceChip, borderRadius: 25 }}
                /> }
            ].map((item, index) => (
              <Box key={index} sx={styles.detailItem}>
                {item.icon}
                {typeof item.content === 'string' ? (
                  <Typography variant={index === 0 ? "h6" : "body1"}>
                    {item.content}
                  </Typography>
                ) : item.content}
              </Box>
            ))}
          </Paper>

          <Paper sx={{
            ...styles.detailsPaper,
            transition: "all 0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 4
            }
          }}>
            {[
              { icon: <Checkroom color="primary" />, content: event.dress_code || "No dress code" },
              { icon: <People color="primary" />, content: `${event.max_capacity ?? "Unlimited"} spots available` },
              { icon: <ChildCare color="primary" />, content: `Minimum age: ${event.age_limit ?? "None"}` }
            ].map((item, index) => (
              <Box key={index} sx={styles.detailItem}>
                {item.icon}
                <Typography variant={index === 0 ? "h6" : "body1"}>
                  {item.content}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>

        {/* Description */}
        <Paper sx={{
          ...styles.descriptionPaper,
          boxShadow: 3,
          transition: "all 0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 4
            }
        }}>
          <Typography variant="h5" gutterBottom sx={{
            ...styles.descriptionTitle,
            display: "flex",
            alignItems: "center",
            gap: 2,
            "&:after": {
              content: '""',
              flex: 1,
              height: "2px",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`
            }
          }}>
            Event Description
          </Typography>
          <Typography variant="body1" sx={styles.descriptionText}>
            {event.description}
          </Typography>
        </Paper>

        {/* Join Button */}
        <Box sx={styles.joinButtonContainer}>
          <Button
            disabled={loading}
            variant="contained"
            size="large"
            startIcon={<EventIcon />}
            onClick={handleJoinEvent}
            sx={{
              ...styles.joinButton,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 6
              }
            }}
          >
            {`Join Event (${event.price ? "$" + event.price : "Free"})`}
          </Button>
        </Box>

        {/* Share Button */}
        <IconButton sx={{
          ...styles.shareButton,
          transition: "all 0.3s",
          "&:hover": {
            transform: "scale(1.1) rotate(15deg)"
          }
        }}>
          <Share />
        </IconButton>
      </Container>
    </Box>
  );
};

const styles: MuiStyles = {
  box: {
    overflowY: "auto",
  },
  container: {
    py: 4,
    position: "relative",
    maxWidth: "xl"
  },
  headerBox: {
    display: "flex",
    alignItems: "center",
    mb: 4,
    gap: 2,
    position: "relative",
    zIndex: 1
  },
  eventTitle: {
    flex: 1,
    textShadow: "0 4px 8px rgba(0,0,0,0.1)"
  },
  categoryChip: {
    ml: 2
  },
  coverPaper: {
    height: { xs: 200, md: 350 },
    borderRadius: 4,
    mb: 4,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    background: "linear-gradient(45deg, #2c3e50 30%, #3498db 90%)",
    overflow: "hidden"
  },
  coverText: {
    textAlign: "center",
    position: "relative",
    zIndex: 1
  },
  coverIcon: {
    fontSize: 64,
    mb: 2
  },
  detailsContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 4,
    mb: 4,
    position: "relative",
    zIndex: 1
  },
  detailsPaper: {
    p: 4,
    borderRadius: 4,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 3,
    boxShadow: 3
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: 2
  },
  priceChip: {
    fontSize: "1.1rem",
    px: 2
  },
  descriptionPaper: {
    p: 4,
    borderRadius: 4,
    mb: 4,
    position: "relative",
    zIndex: 1
  },
  descriptionTitle: {
    mb: 3
  },
  descriptionText: {
    lineHeight: 1.7
  },
  joinButtonContainer: {
    position: "sticky",
    bottom: { xs: 16, md: 32 },
    display: "flex",
    justifyContent: "center",
    zIndex: 1000
  },
  joinButton: {
    py: 2.5,
    borderRadius: 4,
    fontSize: "1.2rem",
    boxShadow: 4,
    minWidth: 300
  },
  shareButton: {
    position: "fixed",
    bottom: 32,
    right: 32,
    bgcolor: "primary.main",
    color: "white",
    "&:hover": { bgcolor: "primary.dark" },
    zIndex: 1000,
    boxShadow: 4
  }
};