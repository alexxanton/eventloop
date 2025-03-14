import { MuiStyles } from "@/utils/types/types";
import { Info } from "@mui/icons-material";
import { Box, TextField, MenuItem, Theme } from "@mui/material";
import { CFormSection } from "../CFormSection";

interface CProps {
  dressCode: string;
  setDressCode: (value: string) => void;
  maxCapacity: number | null;
  setMaxCapacity: (value: number | null) => void;
  ageLimit: number | null;
  setAgeLimit: (value: number | null) => void;
  theme: Theme;
}

export function CAdditionalInfoSection({ dressCode, setDressCode, maxCapacity, setMaxCapacity, ageLimit, setAgeLimit, theme }: CProps) {
  const dressCodes = [
    "Casual",
    "Smart Casual",
    "Business Casual",
    "Business Formal",
    "Cocktail Attire",
    "Semi-Formal",
    "Formal",
    "Black Tie",
    "White Tie",
    "Themed Attire",
  ];

  return (
    <CFormSection title="Additional Information" SectionIcon={Info}>
      <TextField
        select
        fullWidth
        label="Dress code"
        value={dressCode}
        onChange={(e) => setDressCode(e.target.value)}
        color={theme.palette.mode === "dark" ? "secondary" : "primary"}
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
      <Box sx={styles.numberInputs}>
        <TextField
          fullWidth
          label="Max Capacity"
          type="number"
          value={maxCapacity || ""}
          onChange={(e) => setMaxCapacity(parseInt(e.target.value))}
          color={theme.palette.mode === "dark" ? "secondary" : "primary"}
        />
        <TextField
          fullWidth
          label="Age Limit"
          type="number"
          value={ageLimit || ""}
          onChange={(e) => setAgeLimit(parseInt(e.target.value))}
          color={theme.palette.mode === "dark" ? "secondary" : "primary"}
        />
      </Box>
    </CFormSection>
  );
}

const styles: MuiStyles = {
  numberInputs: {
    display: "flex",
    gap: 1,
  },
};
