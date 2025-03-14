"use client";
import { supabase } from "@/utils/supabase";
import { FormEvent, MuiStyles } from "@/utils/types/types";
import { CalendarToday } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { CModal } from "../../containers/CModal";
import { Dayjs } from "dayjs";
import { CAdditionalInfoSection } from "./sections/CAdditionalInfoSection";
import { CEventDetailsSection } from "./sections/CEventDetailsSection";
import { CPricingSection } from "./sections/CPricingSection";
import { CDateTimeSection } from "./sections/CDateTimeSection";

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
  const theme = useTheme();

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
      <CModal title="Create new event" Icon={CalendarToday}>
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
              theme={theme}
            />
            <CDateTimeSection
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              theme={theme}
            />
            <CPricingSection
              price={price}
              setPrice={setPrice}
              currency={currency}
              setCurrency={setCurrency}
              theme={theme}
            />
            <CAdditionalInfoSection
              dressCode={dressCode}
              setDressCode={setDressCode}
              maxCapacity={maxCapacity}
              setMaxCapacity={setMaxCapacity}
              ageLimit={ageLimit}
              setAgeLimit={setAgeLimit}
              theme={theme}
            />
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button variant="contained" sx={styles.button} type="submit">
              Create
            </Button>
          </Box>
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
    gap: 3,
    overflowY: "auto",
  },
  button: {
    mt: 3,
  },
};
