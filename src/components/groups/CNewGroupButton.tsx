"use client";
import { useStore } from "@/utils/zustand";
import { Add } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export function CNewGroupButton() {
  const { setCurrentGroup } = useStore();

  return (
    <ListItem sx={{ borderBottom: "1px solid grey" }} disablePadding>
      <ListItemButton onClick={() => setCurrentGroup("")}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary="Create new group" sx={{ textWrap: "nowrap" }} />
      </ListItemButton>
    </ListItem>
  );
}
