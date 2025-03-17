import { MuiStyles } from "@/utils/types/types";
import { AccessTime } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { LocalizationProvider, MobileDatePicker, MobileDatePickerSlotProps, MobileTimePicker, MobileTimePickerSlotProps, TimeView } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { CFormSection } from "../CFormSection";
import { isDarkModeOn } from "@/utils/isDarkModeOn";

interface CProps {
  startDate: Dayjs | null;
  setStartDate: (value: Dayjs | null) => void;
  endDate: Dayjs | null;
  setEndDate: (value: Dayjs | null) => void;
}

export function CDateTimeSection({ startDate, setStartDate, endDate, setEndDate }: CProps) {
  const colorProps = {
    textField: { color: isDarkModeOn() ? "secondary" : "primary" },
    dialog: {
      sx: {
        "& .MuiDialogActions-root button": {
          color: `${isDarkModeOn() ? "secondary" : "primary"}.main`,
        },
      },
    },
  };

  const datePickerSlotProps = colorProps as MobileDatePickerSlotProps<Dayjs, boolean>;
  const timePickerSlotProps = colorProps as MobileTimePickerSlotProps<Dayjs, TimeView, boolean>;
  
  return (
    <CFormSection title="Date and Time" SectionIcon={AccessTime}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          <Typography variant="subtitle2">Start date and time</Typography>
          <Box sx={styles.date}>
            <MobileDatePicker
              value={startDate}
              onChange={(value) => setStartDate(value)}
              slotProps={datePickerSlotProps}
            />
            <MobileTimePicker
              value={startDate}
              onChange={(value) => setStartDate(value)}
              slotProps={timePickerSlotProps}
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle2">End date and time (optional)</Typography>
          <Box sx={styles.date}>
            <MobileDatePicker
              value={endDate}
              onChange={(value) => setEndDate(value)}
              slotProps={datePickerSlotProps}
            />
            <MobileTimePicker
              value={endDate}
              onChange={(value) => setEndDate(value)}
              slotProps={timePickerSlotProps}
            />
          </Box>
        </Box>
      </LocalizationProvider>
    </CFormSection>
  );
}

const styles: MuiStyles = {
  date: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
  },
};
