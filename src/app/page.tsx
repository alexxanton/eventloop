"use client";
import * as React from 'react';
// import { Box, Container } from "@mui/material";
<<<<<<< HEAD
import { LocalizationProvider } from "@mui/x-date-pickers";
=======
>>>>>>> develop
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
  );
}
