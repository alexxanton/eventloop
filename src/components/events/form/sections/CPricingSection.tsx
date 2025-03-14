import { AttachMoney } from "@mui/icons-material";
import { Box, TextField, MenuItem, Theme } from "@mui/material";
import { CFormSection } from "../CFormSection";

interface CProps {
  price: string;
  setPrice: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  theme: Theme;
}

export function CPricingSection({ price, setPrice, currency, setCurrency, theme }: CProps) {
  const currencies = [
    { value: 'USD', label: '$' },
    { value: 'EUR', label: '€' },
    { value: 'BTC', label: '฿' },
    { value: 'JPY', label: '¥' },
  ];

  return (
    <CFormSection title="Pricing" SectionIcon={AttachMoney}>
      <Box display="flex" gap={1}>
        <TextField
          sx={{ width: "50%" }}
          label="Price (optional)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          color={theme.palette.mode === "dark" ? "secondary" : "primary"}
        />
        <TextField
          select
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          sx={{ width: "50%" }}
          color={theme.palette.mode === "dark" ? "secondary" : "primary"}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </CFormSection>
  );
}
