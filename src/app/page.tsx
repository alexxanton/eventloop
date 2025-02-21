"use client";
import * as React from 'react';
import { Drawer, Box, Container } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import CShadowBox from '@/components/containers/CShadowBox';

export default function Home() {
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <Drawer
        sx={{
          width: "25%",
          flexShrink: 0,
          zIndex: 0,
          [`& .MuiDrawer-paper`]:{
            boxShadow: 5,
            width: "25%",
            boxSizing: "border-box"
          },
        }}
        variant="permanent"
        anchor="left"
      >
      </Drawer>
      <CShadowBox>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </CShadowBox>
    </Box>
  );
}
