import { EventType } from "@/utils/types/types";
import { CalendarToday, LocationOn, RemoveRedEye } from "@mui/icons-material";
import { Box, Typography, IconButton, Paper, useTheme } from "@mui/material";
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

export const CEventCard = ({ event, userRole }: { event: EventType; userRole: string }) => {
  const theme = useTheme();

  return (
    <Paper 
      sx={{ 
        display: "flex", 
        overflow: "hidden",
        mb: 0.5,
        background: `
          linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default}),
          repeating-linear-gradient(
            -45deg,
            ${theme.palette.primary.main}20,
            ${theme.palette.primary.main}20 12px,
            transparent 12px,
            transparent 24px
          )
        `,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        position: "relative",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
        },
        "&:after": {
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
      }}
    >
      {/* Left accent stripe */}
      <Box sx={{
        width: 6,
        background: `linear-gradient(45deg, 
          ${theme.palette.primary.main}, 
          ${theme.palette.secondary.main})`,
        position: "relative",
        zIndex: 1,
        "&:before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(
              45deg,
              ${theme.palette.primary.light}40,
              ${theme.palette.primary.light}40 4px,
              transparent 4px,
              transparent 8px
            )
          `,
          mixBlendMode: "overlay"
        }
      }} />

      {/* Main Content */}
      <Box sx={{ 
        flexGrow: 1, 
        px: 2, 
        py: 1.5,
        display: "flex", 
        flexDirection: "column",
        position: "relative",
        zIndex: 1,
        background: theme.palette.mode === "dark" 
          ? "rgba(0, 0, 0, 0.3)" 
          : "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(4px)"
      }}>
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
    </Paper>
  );
};
