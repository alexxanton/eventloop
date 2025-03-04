"use client";
import { useStore } from "@/utils/zustand";
import { Avatar, Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface Group {
  name: string;
  description: string;
}

export function CGroupButton({group}: {group: Group}) {
  const { currentGroup, setCurrentGroup } = useStore();

  return (
    <Box visibility={group.name === currentGroup ? "visible" : "visible"}>
      <ListItem disablePadding>
        <ListItemButton sx={{ height: 70 }} onClick={() => setCurrentGroup(group.name)}>
          <ListItemIcon>
            <Avatar src="" />
          </ListItemIcon>
          <ListItemText sx={{ textWrap: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} primary={group.name} secondary={group.description} />
        </ListItemButton>
      </ListItem>
    </Box>
  );
}
