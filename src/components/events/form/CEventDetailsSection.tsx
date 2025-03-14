import { MuiStyles } from "@/utils/types/types";
import { Box, Typography, TextField, MenuItem } from "@mui/material";

export function CEventDetailsSection({
  name,
  setName,
  description,
  setDescription,
  category,
  setCategory,
  categories,
  location,
  setLocation
}: {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  categories: string[];
  location: string;
  setLocation: (value: string) => void;
}) {
  return (
    <Box sx={styles.section}>
      <Typography variant="h6" sx={styles.sectionTitle}>Event Details</Typography>
      <TextField
        fullWidth
        label="Event name"
        type="text"
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        sx={{ my: 1 }}
        fullWidth
        multiline
        minRows={2}
        maxRows={4}
        variant="filled"
        label="Description (optional)"
        color="secondary"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
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
        fullWidth
        variant="standard"
        label="Location (optional)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
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
