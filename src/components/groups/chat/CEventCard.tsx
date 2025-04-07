import { CEventEditForm } from "@/components/events/form/CEventEditForm";
import { EventType } from "@/utils/types/types";
import { RemoveRedEye } from "@mui/icons-material";
import { Box, Typography, IconButton } from "@mui/material";
import Link from "next/link";

export const CEventCard = ({ event, userRole }: { event: EventType; userRole: string }) => {
  console.log(userRole)
  return (
    <Box sx={{ px: 2, pt: 1, mb: 0 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              textWrap: "nowrap",
            }}
          >
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(event.start_date).toLocaleString().split(",")[0]} • {event.location}
          </Typography>
        </Box>
        <Box>{userRole === "owner" ? <CEventEditForm event={event} /> : null}</Box>
      </Box>
      <Link href={`/event/${event.id}`}>
        <IconButton>
          <RemoveRedEye />
        </IconButton>
      </Link>
      <IconButton>
        <RemoveRedEye />
      </IconButton>
    </Box>
  );
};
