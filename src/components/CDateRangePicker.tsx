import { LocalizationProvider } from "@mui/lab";
import { StaticDateRangePicker } from "@mui/lab";
import { Box, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React, { useState } from "react";

type CProps = {
  value: [Date | null, Date | null];
  onChange: (newValue: [Date | null, Date | null]) => void;
};

export function CDateRangePicker({value, onChange}: CProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={onChange}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      >
      </StaticDateRangePicker>
      <p>{value[0]?.toISOString()}</p>
      <p>{value[1]?.toISOString()}</p>
    </LocalizationProvider>
  );
}
