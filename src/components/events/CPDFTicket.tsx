import { Ticket } from "@/utils/types/types";
import { Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";

export const CPDFTicket = ({ticket}: {ticket: Ticket}) => (
  <Box
    id="pdf-content"
    sx={{
      width: "100%",
      height: "100%",
      backgroundColor: "#f4f4f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      boxSizing: "border-box",
    }}
  >
    <Box
      sx={{
        padding: "16px",
        border: "4px solid #e0d9f8",
        borderRadius: "24px",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
      }}
    >
      <Box
        sx={{
          width: "1000px",
          height: "500px",
          backgroundColor: "#f8f9ff",
          display: "flex",
          flexDirection: "row",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 30px rgba(103, 58, 183, 0.3)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "120px",
            height: "120px",
            background: "radial-gradient(circle, rgba(106,17,203,0.2) 0%, rgba(106,17,203,0) 70%)",
          }
        }}
      >
        {/* Left section - Main content */}
        <Box
          sx={{
            width: "70%",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "white",
          }}
        >
          {/* Header */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: "#6a11cb",
                fontWeight: "bold",
                mb: 2,
                fontSize: "2.5rem",
                lineHeight: 1.2
              }}
            >
              {ticket.event.name}
            </Typography>

            <Box sx={{
              display: "flex",
              gap: 2,
              mb: 4
            }}>
              <Box sx={{
                backgroundColor: "#f0e6ff",
                color: "#6a11cb",
                px: 2,
                py: 1,
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "0.9rem"
              }}>
                GENERAL ADMISSION
              </Box>
              <Box sx={{
                backgroundColor: "#e6f0ff",
                color: "#2575fc",
                px: 2,
                py: 1,
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "0.9rem"
              }}>
                VALID FOR 1 PERSON
              </Box>
            </Box>
          </Box>

          {/* Event details */}
          <Box sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            mb: 4
          }}>
            <DetailItem
              title="Event Date"
              value={new Date(ticket.event.start_date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              icon="📅"
            />
            <DetailItem
              title="Time"
              value={new Date(ticket.event.start_date).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
              icon="⏰"
            />
            <DetailItem
              title="Ticket Number"
              value={ticket.ticket_number}
              icon="🎫"
            />
            <DetailItem
              title="Location"
              value={ticket.event.location || "To be confirmed"}
              icon="📍"
            />
          </Box>

          {/* Important notes */}
          <Box sx={{
            backgroundColor: "#f8f5ff",
            padding: "20px",
            borderRadius: "12px",
            borderLeft: "4px solid #6a11cb"
          }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#6a11cb", mb: 1 }}>
              🎉 Important!
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              Show this ticket at the event entrance. You can present it on your mobile device or in printed form.
              The ticket is only valid for the specified date and time.
            </Typography>
          </Box>
        </Box>

        {/* Right section - QR and code */}
        <Box
          sx={{
            width: "30%",
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
            color: "white",
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-100px",
              right: "-100px",
              width: "200px",
              height: "200px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%"
            }
          }}
        >
          <Typography variant="h6" sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            fontSize: "1.3rem"
          }}>
            YOUR DIGITAL TICKET
          </Typography>

          <Box
            sx={{
              p: 3,
              bgcolor: "white",
              borderRadius: "12px",
              mb: 4,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              position: "relative",
              zIndex: 1
            }}
          >
            <QRCode
              value={JSON.stringify(ticket.ticket_number)}
              size={180}
              level="H"
              bgColor="#ffffff"
              fgColor="#6a11cb"
            />
          </Box>

          <Typography variant="subtitle1" sx={{
            fontWeight: "bold",
            mb: 1,
            textAlign: "center"
          }}>
            {ticket.ticket_number}
          </Typography>

          <Typography variant="caption" sx={{
            textAlign: "center",
            opacity: 0.8,
            fontSize: "0.8rem"
          }}>
            Scan this QR code to validate your ticket
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

const DetailItem = ({ title, value, icon }: { title: string; value: string; icon?: string }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle2" sx={{
      color: "#666",
      fontWeight: "bold",
      mb: 1,
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}>
      {icon} {title}
    </Typography>
    <Typography variant="body1" sx={{
      color: "#333",
      fontWeight: "500"
    }}>
      {value}
    </Typography>
  </Box>
);
