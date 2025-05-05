import { EventType } from "@/utils/types/types";
import { RemoveRedEye } from "@mui/icons-material";
import { Box, Typography, IconButton, Paper } from "@mui/material";
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
  return (
    <Paper 
      sx={{ 
        display: "flex", 
        overflow: "hidden", 
        mb: 0.5,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Box
        sx={{
          width: 6,
          backgroundColor: "rebeccapurple",
          // backgroundColor: getEventColor(event.category),
        }}
      />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, px: 2, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" noWrap>
              {event.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(event.start_date).toLocaleString().split(",")[0]} • {event.location}
            </Typography>
          </Box>
          <Box>{userRole === "owner" ? <CEventFormModal event={event} /> : null}</Box>
        </Box>

        {/* Icons */}
        <Box sx={{ display: "flex", gap: 1 }}>
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
