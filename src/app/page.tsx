"use client";
import * as React from 'react';
// import { Box, Container } from "@mui/material";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { StaticDateRangePicker } from "@mui/lab";
import { Box, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';



export default function Home() {
  const[value, setValue] = React.useState([null, null])
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        key={1}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      >
      </StaticDateRangePicker>
    <p>{value[0]?.toString()}</p>
    </LocalizationProvider>
  );
}
