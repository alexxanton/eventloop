"use client"
import { Paper } from "@mui/material";
import { LocalizationProvider, DateCalendar, DateCalendarProps, PickerValidDate } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CShadowBox } from "../containers/CShadowBox";

export function CCalendar({...rest}: DateCalendarProps<PickerValidDate>) {
  return (
    <CShadowBox>
      <Paper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar {...rest} onChange={()=>{}} />
        </LocalizationProvider>
      </Paper>
    </CShadowBox>
  );
}
