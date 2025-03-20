import { AttachMoney } from "@mui/icons-material";
import { Box, TextField, MenuItem } from "@mui/material";
import { CFormSection } from "../CFormSection";
import { useDarkMode } from "@/utils/hooks/useDarkMode";

interface CProps {
  price: string;
  setPrice: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
}

export function CPricingSection({ price, setPrice, currency, setCurrency }: CProps) {
  const isDarkMode = useDarkMode();
  
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
          color={isDarkMode ? "secondary" : "primary"}
        />
        <TextField
          select
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          sx={{ width: "50%" }}
          color={isDarkMode ? "secondary" : "primary"}
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
