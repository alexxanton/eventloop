import { MuiStyles } from "@/utils/types/types";
import { Box, Typography, TextField, MenuItem } from "@mui/material";

export function CAdditionalInfoSection({
  dressCode,
  setDressCode,
  maxCapacity,
  setMaxCapacity,
  ageLimit,
  setAgeLimit,
  dressCodes,
}: {
  dressCode: string;
  setDressCode: (value: string) => void;
  maxCapacity: number | null;
  setMaxCapacity: (value: number | null) => void;
  ageLimit: number | null;
  setAgeLimit: (value: number | null) => void;
  dressCodes: string[];
}) {
  return (
    <Box sx={styles.section}>
      <Typography variant="h6" sx={styles.sectionTitle}>Additional Information</Typography>
      <TextField
        select
        label="Dress code"
        value={dressCode}
        onChange={(e) => setDressCode(e.target.value)}
        fullWidth
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {dressCodes.map((code) => (
          <MenuItem key={code} value={code}>
            {code}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="Max Capacity (optional)"
        type="number"
        value={maxCapacity || ""}
        onChange={(e) => setMaxCapacity(parseInt(e.target.value))}
      />
      <TextField
        fullWidth
        label="Age Limit (optional)"
        type="number"
        value={ageLimit || ""}
        onChange={(e) => setAgeLimit(parseInt(e.target.value))}
      />
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
};
