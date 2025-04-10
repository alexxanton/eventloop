"use client";
import { supabase } from "@/utils/supabase";
import { FormEvent, MuiStyles } from "@/utils/types/types";
import { Check, CalendarToday } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { CModal } from "../../containers/CModal";
import { Dayjs } from "dayjs";
import { CAdditionalInfoSection } from "./sections/CAdditionalInfoSection";
import { CEventDetailsSection } from "./sections/CEventDetailsSection";
import { CPricingSection } from "./sections/CPricingSection";
import { CDateTimeSection } from "./sections/CDateTimeSection";
import { useDarkMode } from "@/utils/hooks/useDarkMode";

export function CEventForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [maxCapacity, setMaxCapacity] = useState<number | null>(null);
  const [ageLimit, setAgeLimit] = useState<number | null>(null);
  const [dressCode, setDressCode] = useState("");
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
      const { error } = await supabase.from("events").insert([newEvent]);
      if (error) throw error;
      setError("");
    } catch (err) {
      setError("Failed to create event. Please try again.");
      console.error(err);
    }
  };

  return (
    <Box display="flex">
      <CModal title="Create new event" buttonType="icon" ButtonContent={CalendarToday}>
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
