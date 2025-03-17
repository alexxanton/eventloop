import { Notes } from "@mui/icons-material";
import { TextField, MenuItem } from "@mui/material";
import { CFormSection } from "../CFormSection";
import { useDarkMode } from "@/utils/useDarkMode";

interface CProps {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}

export function CEventDetailsSection({ name, setName, description, setDescription, category, setCategory, location, setLocation }: CProps) {
  const isDarkMode = useDarkMode();
  
  const categories = [
    "Social & Entertainment",
    "Business & Networking",
    "Educational",
    "Sports & Fitness",
    "Community & Cultural",
    "Arts & Performance",
    "Tech & Innovation",
    "Food & Drink",
    "Outdoor & Adventure",
    "Virtual & Hybrid",
  ];

  return (
    <CFormSection title="Event Details" SectionIcon={Notes}>
      <TextField
        fullWidth
        required
        label="Event name"
        type="text"
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
        color={isDarkMode ? "secondary" : "primary"}
      />
      <TextField
        sx={{ my: 1 }}
        fullWidth
        multiline
        minRows={2}
        maxRows={4}
        variant="filled"
        label="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        color={isDarkMode ? "secondary" : "primary"}
      />
      <TextField
        select
        fullWidth
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        color={isDarkMode ? "secondary" : "primary"}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        sx={{ mt: -1 }}
        fullWidth
        variant="standard"
        label="Location (optional)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        color={isDarkMode ? "secondary" : "primary"}
      />
    </CFormSection>
  );
}
