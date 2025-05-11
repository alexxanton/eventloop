"use client";
import { supabase } from "@/utils/supabase/supabase";
import { Event, FormEvent, MuiStyles } from "@/utils/types/types";
import { Check, Add, Edit, Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { CModal } from "../../containers/CModal";
import dayjs, { Dayjs } from "dayjs";
import { CAdditionalInfoSection } from "./sections/CAdditionalInfoSection";
import { CEventDetailsSection } from "./sections/CEventDetailsSection";
import { CPricingSection } from "./sections/CPricingSection";
import { CDateTimeSection } from "./sections/CDateTimeSection";
import { useDarkMode } from "@/utils/hooks/useDarkMode";
import { useStore } from "@/utils/zustand";

export function CEventFormModal({event}: {event?: Event}) {
  const { currentGroup } = useStore();
  const [name, setName] = useState(event?.name || "");
  const [description, setDescription] = useState(event?.description || "");
  const [startDate, setStartDate] = useState<Dayjs | null>(event?.start_date ? dayjs(event.start_date) : null);
  const [endDate, setEndDate] = useState<Dayjs | null>(event?.start_date ? dayjs(event.end_date) : null);
  const [location, setLocation] = useState(event?.location || "");
  const [price, setPrice] = useState(event?.price?.toString() || "");
  const [currency, setCurrency] = useState(event?.currency || "EUR");
  const [category, setCategory] = useState(event?.category || "");
  const [maxCapacity, setMaxCapacity] = useState<number | null>(event?.max_capacity || null);
  const [ageLimit, setAgeLimit] = useState<number | null>(event?.age_limit || null);
  const [dressCode, setDressCode] = useState(event?.dress_code || "");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const isDarkMode = useDarkMode();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !startDate) {
      setError("Please fill out all required fields.");
      return;
    }

    const newEvent = {
      id: event?.id,
      group_id: currentGroup?.id,
      name,
      description,
      start_date: startDate.toDate(),
      end_date: endDate?.toDate(),
      location,
      category,
      price: parseInt(price),
      max_capacity: maxCapacity,
      age_limit: ageLimit,
      dress_code: dressCode,
    };

    console.log(newEvent);

    try {
      const { error } = await supabase.from("events").upsert(newEvent);
      if (error) throw error;
      setOpen(false);
      setName("");
      setDescription("");
      setError("");
    } catch (err) {
      setError("Failed to create event. Please try again.");
      console.error(err);
    }
  };

  return (
    <Box display="flex">
      <CModal
        title={event ? "Edit Event" : "Create Event"}
        buttonType="icon"
        ButtonContent={event ? Edit : Add}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={styles.formContainer}>
            {/* Left Column */}
            <Box sx={styles.column}>
              <Paper sx={styles.section}>
                <CEventDetailsSection {...{
                  name, setName,
                  description, setDescription,
                  category, setCategory,
                  location, setLocation
                }} />
              </Paper>
              
              <Box sx={{ flex: 1,  pb: 2 }}>
                <Paper sx={styles.section}>
                  <CDateTimeSection {...{ startDate, setStartDate, endDate, setEndDate }} />
                </Paper>
              </Box>
            </Box>

            {/* Right Column */}
            <Box sx={styles.column}>
              <Paper sx={styles.section}>
                <CPricingSection {...{ price, setPrice, currency, setCurrency }} />
              </Paper>
              
              <Paper sx={styles.section}>
                <CAdditionalInfoSection {...{
                  dressCode, setDressCode,
                  maxCapacity, setMaxCapacity,
                  ageLimit, setAgeLimit
                }} />
              </Paper>
            </Box>
          </Box>

          {/* Error Message */}
          {error && (
            <Typography color="error" sx={styles.error}>
              {error}
            </Typography>
          )}
          
          {/* Action Buttons */}
          <Stack direction="row" justifyContent="space-between" sx={styles.actions}>
            {event && (
              <Button
                variant="contained"
                color="error"
                startIcon={<Delete />}
                // onClick={handleDelete}
                sx={styles.deleteButton}
              >
                Delete Event
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<Check />}
              sx={styles.submitButton}
            >
              {event ? "Save Changes" : "Create Event"}
            </Button>
          </Stack>
        </form>
      </CModal>
    </Box>
  );
}

const styles: MuiStyles = {
  formContainer: {
    display: "flex",
    gap: 3,
    flexDirection: { xs: "column", sm: "row" },
    p: 3,
    overflowY: "auto",
    maxHeight: "60vh",
  },
  column: {
    width: { xs: "100%", sm: "50%" },
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  section: {
    p: 3,
    borderRadius: 4,
    background: (theme) => `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
    boxShadow: (theme) => theme.shadows[2],
    border: (theme) => `1px solid ${theme.palette.divider}`,
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: (theme) => theme.shadows[4],
      transform: "translateY(-2px)",
    },
  },
  error: {
    px: 3,
    py: 1,
    mx: 3,
    borderRadius: 2,
    bgcolor: "error.light",
    textAlign: "center",
    fontWeight: 500,
  },
  actions: {
    px: 3,
    py: 2,
    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
    bgcolor: "background.paper",
  },
  submitButton: {
    background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    borderRadius: 20,
    px: 4,
    py: 1,
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: (theme) => theme.shadows[3],
    },
  },
  deleteButton: {
    borderRadius: 20,
    px: 4,
    py: 1,
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: (theme) => theme.shadows[3],
      bgcolor: "error.dark",
    },
  },
};
