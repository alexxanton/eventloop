import { generateTicketPDF } from "@/utils/generateTicketPDF";
import { supabase } from "@/utils/supabase/supabase";
import { Ticket } from "@/utils/types/types";
import { CalendarToday, Delete, Download, KeyboardArrowLeft, KeyboardArrowRight, LocationOn } from "@mui/icons-material";
import { Box, Typography, Button, IconButton, Theme, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QRCode from "react-qr-code";

export const CTicketCard = ({ tickets, theme }: { tickets: Ticket[]; theme: Theme }) => {
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const router = useRouter();

  const currentTicket = tickets[currentTicketIndex];
  const { palette } = useTheme();

  const handleNext = () => setCurrentTicketIndex(prev => (prev + 1) % tickets.length);
  const handlePrev = () => setCurrentTicketIndex(prev => (prev - 1 + tickets.length) % tickets.length);

  const handleSave = async () => {
    setSaving(true);
    setProgress(0);
  
    await generateTicketPDF(tickets, (i) => setProgress(i + 1));
  
    setSaving(false);
    setProgress(null);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("tickets")
      .delete()
      .eq("id", id);

    if (error) console.log(error);

    router.refresh();
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      p: 3,
      pt: 1,
      borderRadius: 4,
      background: `
        linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%),
        repeating-linear-gradient(
          45deg,
          ${palette.primary.main}15,
          ${palette.primary.main}15 10px,
          transparent 10px,
          transparent 20px
        )
      `,
      boxShadow: 6,
      position: "relative",
      overflow: "hidden",
      transition: "all 0.2s ease",
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
        background: `linear-gradient(45deg, ${palette.primary.main}08 0%, transparent 50%)`,
        pointerEvents: "none"
      }
    }}>
      {/* Card Content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "row" , gap: 3 }}>
          {/* QR Code Section */}
          <Box sx={{
            p: 2,
            bgcolor: theme.palette.background.default,
            borderRadius: 3,
            position: "relative",
            "&:after": {
              content: "''",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "92%",
              height: "92%",
              border: `2px solid ${palette.primary.main}30`,
              borderRadius: 2,
            }
          }}>
            <QRCode
              value={JSON.stringify(currentTicket.ticket_number)}
              size={160}
              level="H"
              bgColor={theme.palette.background.default}
              fgColor={theme.palette.text.primary}
            />
          </Box>

          {/* Ticket Details */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box display="flex" width="100%">
              <Box>
                <Typography variant="h6" fontWeight="800" gutterBottom sx={{
                  background: `linear-gradient(45deg, ${palette.primary.main}, ${palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  {currentTicket.event.name}
                </Typography>
              
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday fontSize="small" />
                    <Typography variant="body2">
                      {new Date(currentTicket.event.start_date).toLocaleString()}
                    </Typography>
                  </Box>
                
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOn fontSize="small" />
                    <Typography variant="body2">
                      {currentTicket.event.location}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {/* Navigation Arrows - Fixed click area */}
              {tickets.length > 1 && (
                <Box sx={{
                  display: "flex",
                  flex: 1,
                  gap: 1,
                  justifyContent: "flex-end",
                  minWidth: "fit-content",
                }}>
                  <Box>
                    <IconButton
                      onClick={handlePrev}
                      sx={{
                        bgcolor: "background.paper",
                        "&:hover": {
                          transform: "translateY(-1px)",
                          bgcolor: "background.default"
                        }
                      }}
                    >
                      <KeyboardArrowLeft  />
                    </IconButton>
                    <IconButton
                      onClick={handleNext}
                      sx={{
                        ml: 1,
                        bgcolor: "background.paper",
                        "&:hover": {
                          transform: "translateY(-1px)",
                          bgcolor: "background.default"
                        }
                      }}
                    >
                      <KeyboardArrowRight  />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Action Buttons */}
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2
            }}>
              <Button
                variant="contained"
                startIcon={<Delete />}
                onClick={() => handleDelete(currentTicket.id)}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  background: `linear-gradient(45deg, ${palette.error.main}, ${palette.error.dark})`,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4
                  }
                }}
              >
                Delete
              </Button>
            
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleSave}
                disabled={saving}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  background: `linear-gradient(45deg, ${palette.primary.main}, ${palette.secondary.main})`,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 6
                  }
                }}
              >
                {saving
                  ? `Saving (${progress}/${tickets.length})`
                  : `Save (${tickets.length})`}
              </Button>

            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};