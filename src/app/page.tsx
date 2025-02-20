"use client";
import * as React from 'react';
import { Box, Container } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import CShadowBox from '@/components/containers/CShadowBox';

export default function Home() {
  return (
    <CShadowBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </CShadowBox>
  );
}
