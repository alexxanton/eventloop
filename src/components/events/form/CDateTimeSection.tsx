import { MuiStyles } from "@/utils/types/types";
import { Box, Typography } from "@mui/material";
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

export function CDateTimeSection({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  startDate: Dayjs | null;
  setStartDate: (value: Dayjs | null) => void;
  endDate: Dayjs | null;
  setEndDate: (value: Dayjs | null) => void;
}) {
  return (
    <Box sx={styles.section}>
      <Typography variant="h6" sx={styles.sectionTitle}>Date and Time</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          <Typography variant="subtitle2">Start date and time</Typography>
          <Box sx={styles.date}>
            <MobileDatePicker
              value={startDate}
              onChange={(value) => setStartDate(value)}
            />
            <MobileTimePicker
              value={startDate}
              onChange={(value) => setStartDate(value)}
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle2">End date and time (optional)</Typography>
          <Box sx={styles.date}>
            <MobileDatePicker
              value={endDate}
              onChange={(value) => setEndDate(value)}
            />
            <MobileTimePicker
              value={endDate}
              onChange={(value) => setEndDate(value)}
            />
          </Box>
        </Box>
      </LocalizationProvider>
    </Box>
  );
}

const styles: MuiStyles = {
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  sectionTitle: {
    mb: 1,
    fontWeight: "bold",
  },
  date: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
  },
};
