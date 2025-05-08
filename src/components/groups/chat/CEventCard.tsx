import { Event } from "@/utils/types/types";
import { CalendarToday, LocationOn, RemoveRedEye, Event as EventIcon } from "@mui/icons-material";
import { Box, Typography, IconButton, Paper, useTheme, Avatar, Button, Chip } from "@mui/material";
import Link from "next/link";
import { CAttendanceListModal } from "../list/CAttendanceListModal";
import { CEventFormModal } from "@/components/events/form/CEventFormModal";

// const getEventColor = (eventType: string) => {
//   const colors: Record<string, string> = {
//     conference: "#FF5733",
//     meetup: "#33FF57",
//     workshop: "#3357FF",
//     default: "#888",
//   };
//   return colors[eventType] || colors.default;
// };

export const CEventCard = ({ event, userRole }: { event: Event; userRole: string }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      my: 1,
      px: 3,
      pt: 1,
      pb: 2,
      borderRadius: 4,
      background: `
        linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%),
        repeating-linear-gradient(
          45deg,
          ${theme.palette.primary.main}15,
          ${theme.palette.primary.main}15 10px,
          transparent 10px,
          transparent 20px
        )
      `,
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
          ${theme.palette.primary.main}20,
          ${theme.palette.primary.main}20 10px,
          transparent 10px,
          transparent 20px
        )`,
        opacity: 0.1,
        zIndex: 0
      }
    }}>
      {/* Main Content */}
      <Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" noWrap
              sx={{
                background: `linear-gradient(45deg, 
                  ${theme.palette.primary.main}, 
                  ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
              {event.name}
            </Typography>
            <Typography variant="body2" color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarToday fontSize="small" />
              {new Date(event.start_date).toLocaleString().split(",")[0]}
              <LocationOn fontSize="small" sx={{ ml: 1 }} />
              {event.location}
            </Typography>
          </Box>
          <Box>{userRole === "owner" ? <CEventFormModal event={event} /> : null}</Box>
        </Box>

        {/* Icons */}
        <Box sx={{ 
          display: "flex", 
          gap: 1,
          mt: 1,
          "& .MuiIconButton-root": {
            background: `linear-gradient(45deg, 
              ${theme.palette.background.paper}, 
              ${theme.palette.background.default})`,
            borderRadius: 2,
            boxShadow: 1,
            transition: "all 0.2s",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: 2
            }
          }
        }}>
          <Link href={`/events/${event.id}`}>
            <IconButton>
              <RemoveRedEye />
            </IconButton>
          </Link>
          <CAttendanceListModal tickets={event.tickets} />
        </Box>
      </Box>
    </Box>
  );
};
