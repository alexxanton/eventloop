"use client";
import { supabase } from "@/utils/supabase";
import { FormEvent, MuiStyles } from "@/utils/types/types";
import { CalendarToday } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { CModal } from "../containers/CModal";
import { Dayjs } from "dayjs";
import { purple } from "@/utils/constants/purple";

export function CEventForm () {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const newEvent = {
      group_id: "",
      name,
      description,
      start_date: startDate?.toDate(),
      end_date: endDate?.toDate(),
      location
    };
    console.log(newEvent);
    
    // const { error } = await supabase.from("events").insert("");
  };

  return (
    <Box display="flex">
      <CModal title="New event" icon={CalendarToday}>
        <form onSubmit={handleSubmit}>
          <Box sx={styles.formBox}>
            <TextField
              fullWidth
              margin="normal"
              label="Event name"
              type="text"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={4}
              variant="filled"
              label="Description (optional)"
              color="secondary"
              onChange={(e) => setDescription(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box>
                <small>Start date and time</small>
                <Box sx={styles.date}>
                  <MobileDateTimePicker onChange={(value) => setStartDate(value)} />
                </Box>
              </Box>
            </LocalizationProvider>
            <TextField
              fullWidth
              variant="standard"
              label="Location (optional)"
              onChange={(e) => setLocation(e.target.value)}
            />
          </Box>
          <Button sx={styles.button} type="submit">Create</Button>
        </form>
      </CModal>
    </Box>
  );
}

const styles: MuiStyles = {
  formBox: {
    display: "flex",
    flexDirection: "column",
    p: 2,
    gap: 1,
  },
  date: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
  },
  button: {
    color: "white",
    bgcolor: purple,
    ":hover": "red"
  }
};
