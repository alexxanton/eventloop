"use client";
import { useStore } from "@/utils/zustand";
import { Add } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { grey } from "@mui/material/colors";

export function CNewGroupButton() {
  const { setCurrentGroup } = useStore();

  return (
    <ListItem sx={{ borderBottom: "1px solid", borderBottomColor: grey[400] }} disablePadding>
      <ListItemButton onClick={() => setCurrentGroup("")}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary="Create new group" sx={{ textWrap: "nowrap" }} />
      </ListItemButton>
    </ListItem>
  );
}
