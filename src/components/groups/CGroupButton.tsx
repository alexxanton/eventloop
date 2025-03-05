"use client";
import { useStore } from "@/utils/zustand";
import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface Group {
  name: string;
  description: string;
}

export function CGroupButton({group}: {group: Group}) {
  const { currentGroup, setCurrentGroup } = useStore();

  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          height: 70,
          backgroundColor: group.name === currentGroup ? "rgba(40, 36, 36, 0.5)" : "transparent",
        }}
        onClick={() => setCurrentGroup(group.name)}
      >
        <ListItemIcon>
          <Avatar src="" />
        </ListItemIcon>
        <ListItemText
          sx={{
            textWrap: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          primary={group.name}
          secondary={group.description}
        />
      </ListItemButton>
    </ListItem>
  );
}
