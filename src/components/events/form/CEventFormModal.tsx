"use client";
import { supabase } from "@/utils/supabase/supabase";
import { EventType, FormEvent, MuiStyles } from "@/utils/types/types";
import { Check, Add, Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { CModal } from "../../containers/CModal";
import dayjs, { Dayjs } from "dayjs";
import { CAdditionalInfoSection } from "./sections/CAdditionalInfoSection";
import { CEventDetailsSection } from "./sections/CEventDetailsSection";
import { CPricingSection } from "./sections/CPricingSection";
import { CDateTimeSection } from "./sections/CDateTimeSection";
import { useDarkMode } from "@/utils/hooks/useDarkMode";
import { useStore } from "@/utils/zustand";

export function CEventFormModal({event}: {event?: EventType}) {
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
        title="Create new event"
        buttonType="icon"
        ButtonContent={event ? Edit : Add}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={styles.formBox}>
            <Box width={{ xs: "100%", sm: "50%" }}>
              <CEventDetailsSection
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                category={category}
                setCategory={setCategory}
                location={location}
                setLocation={setLocation}
              />
            </Box>
            <Box width={{ xs: "100%", sm: "50%" }}>
              <CDateTimeSection
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
              <CPricingSection
                price={price}
                setPrice={setPrice}
                currency={currency}
                setCurrency={setCurrency}
              />
              <CAdditionalInfoSection
                dressCode={dressCode}
                setDressCode={setDressCode}
                maxCapacity={maxCapacity}
                setMaxCapacity={setMaxCapacity}
                ageLimit={ageLimit}
                setAgeLimit={setAgeLimit}
              />
            </Box>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Box>
          <Box sx={styles.footer} bgcolor={isDarkMode ? "#383434" : "secondary.main"}>
            <IconButton size="large" sx={styles.button} type="submit">
              <Check />
            </IconButton>
          </Box>
        </form>
      </CModal>
    </Box>
  );
}

const styles: MuiStyles = {
  formBox: {
    display: "flex",
    p: 2,
    gap: {xs: 0, sm: 5},
    overflowY: "auto",
    height: "70vh",
    pb: 3,
    flexDirection: { xs: "column", sm: "row" },
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
    p: 2,
    height: 40,
  },
  button: {
    bgcolor: "primary.main",
    color: "white",
    position: "relative",
    top: -40,
    right: 20,
    height: "fit-content",
  },
};
