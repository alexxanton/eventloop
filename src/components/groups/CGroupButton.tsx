"use client";
import { AccountCircle } from "@mui/icons-material";
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export function CGroupButton({props}: {props: any}) {
  return (
    <Box borderBottom="1px solid grey">
      <ListItem disablePadding>
        <ListItemButton sx={{ height: 70 }} onClick={() => {}}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={props.name} />
        </ListItemButton>
      </ListItem>
    </Box>
  );
}
