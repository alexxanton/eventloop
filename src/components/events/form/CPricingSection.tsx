import { MuiStyles } from "@/utils/types/types";
import { Box, Typography, TextField, MenuItem } from "@mui/material";

export function CPricingSection({
  price,
  setPrice,
  currency,
  setCurrency,
  currencies,
}: {
  price: string;
  setPrice: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  currencies: { value: string; label: string }[];
}) {
  return (
    <Box sx={styles.section}>
      <Typography variant="h6" sx={styles.sectionTitle}>Pricing</Typography>
      <Box display="flex" gap={1}>
        <TextField
          sx={{ width: "50%" }}
          label="Price (optional)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          select
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          sx={{ width: "50%" }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
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
