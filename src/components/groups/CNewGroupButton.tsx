"use client";
import { Add } from "@mui/icons-material";
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export function CNewGroupButton() {
  return (
    <Box borderBottom="1px solid grey">
      <ListItem disablePadding>
        <ListItemButton onClick={() => {}}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Create new group" sx={{ textWrap: "nowrap" }} />
        </ListItemButton>
      </ListItem>
    </Box>
  );
}
