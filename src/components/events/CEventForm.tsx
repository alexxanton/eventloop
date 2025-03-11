"use client";
import { MuiStyles } from "@/utils/types/types";
import { CalendarToday } from "@mui/icons-material";
import { Box, IconButton, Modal, Paper, TextField, Typography } from "@mui/material";
import { MobileDatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export function CEventPanel () {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <CalendarToday />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Paper sx={styles.modal}>
          <Typography component="h6" variant="h6">Create event</Typography>
          <form>
            <TextField
              fullWidth
              margin="normal"
              label="Event name"
              type="text"
              variant="standard"
            />
            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={4}
              variant="filled"
              sx={{
                "& .MuiFilledInput-root" : {
                }
              }}
              label="Description (optional)"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box>
                <small>Start date and time</small>
                <Box sx={styles.date}>
                  <MobileDatePicker />
                  <MobileTimePicker />
                </Box>
              </Box>
            </LocalizationProvider>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Location (optional)"
            />
          </form>
        </Paper>
      </Modal>
    </>
  );
}

const styles: MuiStyles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 5,
    p: 2,
    display: "flex",
    flexDirection: "column",
  },
  date: {
    display: "flex",
    flexDirection: "row",
    gap: 1
  },
};
