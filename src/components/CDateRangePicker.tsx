import { LocalizationProvider } from "@mui/lab";
import { StaticDateRangePicker, MobileDateRangePicker } from "@mui/lab";
import { Box, TextField, useMediaQuery } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React from "react";

type CProps = {
  value: [Date | null, Date | null];
  onChange: (newValue: [Date | null, Date | null]) => void;
};

type CalendarType = 2 | 1 | 3 | undefined;

export function CDateRangePicker({value, onChange}: CProps) {
  const mobileScreen = useMediaQuery("(max-width:600px)");

  const props = {
    value,
    onChange,
    calendars: mobileScreen ? 1 : 2 as CalendarType,
    renderInput: (startProps: any, endProps: any) => (
      <React.Fragment>
        <TextField {...startProps} />
        <Box sx={{ mx: 2 }}> to </Box>
        <TextField {...endProps} />
      </React.Fragment>
    ),
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {mobileScreen ? (
        <MobileDateRangePicker {...props} />
      ) : (
        <StaticDateRangePicker {...props} displayStaticWrapperAs="desktop" />
      )}
    </LocalizationProvider>
  );
}
