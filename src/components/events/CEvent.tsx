"use client"
import { Container, Paper, Typography, Box, Button, Chip, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Event, LocationOn, CalendarToday, AttachMoney, People, ChildCare, Checkroom, Share } from "@mui/icons-material";
import { EventType } from "@/utils/types/types";
import { supabase } from "@/utils/supabase/supabase";
import { useUser } from "@/utils/hooks/useUser";
import { MuiStyles } from "@/utils/types/types";

export function CEvent({event}: {event: EventType | null}) {
  const userId = useUser()?.id;
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

  const handleJoinEvent = async () => {
    const newMember = {
      user_id: userId,
      group_id: event?.group_id,
      role: "member"
    };

    const ticket = {
      user_id: userId,
      event_id: event?.id
    };

    const { error: memberError } = await supabase
      .from("group_members")
      .upsert(newMember, { onConflict: "user_id,group_id" });
      
    const { error: ticketError } = await supabase.from("tickets").insert(ticket);

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
    <Box sx={styles.box}>
      <Container  sx={styles.container}>
        {/* Header */}
        <Box sx={styles.headerBox}>
          <Typography variant="h3" fontWeight="bold" sx={styles.eventTitle}>
            {event.name}
          </Typography>
          <Chip label={event.category} color="primary" sx={styles.categoryChip} />
        </Box>

        {/* Cover Image */}
        <Paper sx={styles.coverPaper}>
          <Typography variant="h4" component="div" sx={styles.coverText}>
            <Event sx={styles.coverIcon} />
            <Box>{event.location}</Box>
          </Typography>
        </Paper>

        {/* Details Section */}
        <Box sx={styles.detailsContainer}>
          <Paper sx={styles.detailsPaper}>
            <Box sx={styles.detailItem}>
              <LocationOn color="primary" />
              <Typography variant="h6">{event.location}</Typography>
            </Box>
            <Box sx={styles.detailItem}>
              <CalendarToday color="primary" />
              <Typography variant="body1">
                {formatDate(event.start_date)}{event.end_date && ` - ${formatDate(event.end_date)}`}
              </Typography>
            </Box>
            <Box sx={styles.detailItem}>
              <AttachMoney color="primary" />
              <Chip 
                label={event.price > 0 ? `$${event.price} per person` : "Free"} 
                color="secondary" 
                sx={styles.priceChip}
              />
            </Box>
          </Paper>

          <Paper sx={styles.detailsPaper}>
            <Box sx={styles.detailItem}>
              <Checkroom color="primary" />
              <Typography variant="h6">{event.dress_code || "No dress code"}</Typography>
            </Box>
            <Box sx={styles.detailItem}>
              <People color="primary" />
              <Typography variant="body1">
                {event.max_capacity ?? "Unlimited"} spots available
              </Typography>
            </Box>
            <Box sx={styles.detailItem}>
              <ChildCare color="primary" />
              <Typography variant="body1">
                Minimum age: {event.age_limit ?? "None"}
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Description */}
        <Paper sx={styles.descriptionPaper}>
          <Typography variant="h5" gutterBottom sx={styles.descriptionTitle}>
            Event Description
          </Typography>
          <Typography variant="body1" sx={styles.descriptionText}>
            {event.description}
          </Typography>
        </Paper>

        {/* Join Button */}
        <Box sx={styles.joinButtonContainer}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Event />}
            onClick={handleJoinEvent}
            sx={styles.joinButton}
          >
            {`Join Event (${event.price ? "$" + event.price : "Free"})`}
          </Button>
        </Box>

        {/* Share Button */}
        <IconButton sx={styles.shareButton}>
          <Share />
        </IconButton>
      </Container>
    </Box>
  );
};

const styles: MuiStyles = {
  box: { 
    overflowY: "scroll" 
  },
  container: { 
    py: 4, 
    position: "relative" 
  },
  headerBox: { 
    display: "flex", 
    alignItems: "center", 
    mb: 4, 
    gap: 2 
  },
  eventTitle: { 
    flex: 1 
  },
  categoryChip: { 
    ml: 2 
  },
  coverPaper: {
    height: { xs: 200, md: 350 },
    borderRadius: 4,
    mb: 4,
    background: "linear-gradient(45deg, #2c3e50 30%, #3498db 90%)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },
  coverText: { 
    textAlign: "center" 
  },
  coverIcon: { 
    fontSize: 64, 
    mb: 2 
  },
  detailsContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 4,
    mb: 4
  },
  detailsPaper: {
    p: 4,
    borderRadius: 4,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 3
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
    mb: 4 
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
  },
  joinButton: {
    py: 2.5,
    borderRadius: 4,
    fontSize: "1.2rem",
    boxShadow: 4
  },
  shareButton: {
    position: "fixed",
    bottom: 32,
    right: 32,
    bgcolor: "primary.main",
    color: "white",
    "&:hover": { bgcolor: "primary.dark" }
  }
};
