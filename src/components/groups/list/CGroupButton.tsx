"use client";
import { lightPurple } from "@/utils/constants/purple";
import { GroupType } from "@/utils/types/types";
import { useStore } from "@/utils/zustand";
import { Groups } from "@mui/icons-material";
import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export function CGroupButton({group}: {group: GroupType}) {
  const { currentGroup, setCurrentGroup } = useStore();

  return (
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          height: 70,
          backgroundColor: group?.id === currentGroup?.id ? lightPurple + "50" : "transparent",
        }}
        onClick={() => setCurrentGroup(group)}
      >
        <ListItemIcon>
          <Avatar>
            <Groups />
          </Avatar>
        </ListItemIcon>
        <ListItemText
          sx={{
            textWrap: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          primary={group?.name}
          secondary={group?.description}
        />
      </ListItemButton>
    </ListItem>
  );
}
