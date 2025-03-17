import { AttachMoney } from "@mui/icons-material";
import { Box, TextField, MenuItem } from "@mui/material";
import { CFormSection } from "../CFormSection";
import { isDarkModeOn } from "@/utils/isDarkModeOn";

interface CProps {
  price: string;
  setPrice: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
}

export function CPricingSection({ price, setPrice, currency, setCurrency }: CProps) {
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
          color={isDarkModeOn() ? "secondary" : "primary"}
        />
        <TextField
          select
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          sx={{ width: "50%" }}
          color={isDarkModeOn() ? "secondary" : "primary"}
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
