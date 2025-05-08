import { Event } from "@/utils/types/types";
import { Event as EventIcon } from "@mui/icons-material";
import { Box, Avatar, Typography, Chip, Theme } from "@mui/material";

export const CEventResultCard = ({ event, theme }: { event: Event; theme: Theme }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      p: 3,
      borderRadius: 4,
      background: `
        linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%),
        repeating-linear-gradient(
          -45deg,
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
        boxShadow: 8,
      },
      "&:before": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `repeating-linear-gradient(
          -45deg,
          ${theme.palette.primary.main}20,
          ${theme.palette.primary.main}20 10px,
          transparent 10px,
          transparent 20px
        )`,
        opacity: 0.1,
        zIndex: 0,
      },
    }}
  >
    {/* Card Content */}
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: 2,
          alignItems: "center",
          background:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.4)"
              : "rgba(255, 255, 255, 0.6)",
          borderRadius: 3,
          p: 2,
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Avatar with Stripe Accent */}
        <Box
          sx={{
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
                -45deg,
                ${theme.palette.primary.main}30,
                ${theme.palette.primary.main}30 4px,
                transparent 4px,
                transparent 8px
              )
            `,
              borderRadius: "50%",
              zIndex: -1,
            },
          }}
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.background.paper,
              width: 40,
              height: 40,
              boxShadow: 2,
              "& .MuiSvgIcon-root": {
                color: theme.palette.primary.main,
              },
            }}
          >
            <EventIcon />
          </Avatar>
        </Box>

        {/* Event Details */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            fontWeight="800"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            {event.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "0.85rem",
                color: "text.secondary",
                "&:before": {
                  content: "'📅'",
                  mr: 0.5,
                },
              }}
            >
              {new Date(event.start_date).toUTCString()}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "0.85rem",
                color: "text.secondary",
                "&:before": {
                  content: "'📍'",
                  mr: 0.5,
                },
              }}
            >
              {event.location}
            </Typography>
          </Box>

          <Chip
            label={event.category}
            size="small"
            sx={{
              mt: 1,
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
              color: theme.palette.getContrastText(theme.palette.primary.light),
              borderRadius: 2,
              boxShadow: 1,
              fontSize: "0.75rem",
            }}
          />
        </Box>
      </Box>
    </Box>
  </Box>
);
