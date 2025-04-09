"use client";
import { supabase } from "@/utils/supabase";
import { EventType, FormEvent, MuiStyles } from "@/utils/types/types";
import { Check, Edit } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { CModal } from "../../containers/CModal";
import { Dayjs } from "dayjs";
import { CAdditionalInfoSection } from "./sections/CAdditionalInfoSection";
import { CEventDetailsSection } from "./sections/CEventDetailsSection";
import { CPricingSection } from "./sections/CPricingSection";
import { CDateTimeSection } from "./sections/CDateTimeSection";
import { useDarkMode } from "@/utils/hooks/useDarkMode";

export function CEventEditForm({event}: {event: EventType}) {
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState(event.location);
  const [price, setPrice] = useState(event.price?.toString());
  const [currency, setCurrency] = useState("");
  const [category, setCategory] = useState(event.category);
  const [error, setError] = useState("");
  const [maxCapacity, setMaxCapacity] = useState<number | null>(null);
  const [ageLimit, setAgeLimit] = useState<number | null>(null);
  const [dressCode, setDressCode] = useState(event.dress_code);
  const isDarkMode = useDarkMode();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!name || !startDate) {
      setError("Please fill out all required fields.");
      return;
    }

    const newEvent = {
      group_id: 1,
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
      const { error } = await supabase.from("events").update([newEvent]);
      if (error) throw error;
      setError("");
    } catch (err) {
      setError("Failed to create event. Please try again.");
      console.error(err);
    }
  };

  return (
    <CModal title="Edit event" buttonType="icon" ButtonContent={Edit}>
      <Box display="flex">
        <form onSubmit={handleSubmit}>
          <Box sx={styles.formBox}>
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
      </Box>
    </CModal>
  );
}

const styles: MuiStyles = {
  formBox: {
    display: "flex",
    flexDirection: "column",
    p: 2,
    gap: 3,
    overflowY: "auto",
    height: "70vh",
    pb: 3
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
    p: 2,
    height: 40
  },
  button: {
    bgcolor: "primary.main",
    color: "white",
    position: "relative",
    top: -40,
    right: 20,
    height: "fit-content"
  },
};
