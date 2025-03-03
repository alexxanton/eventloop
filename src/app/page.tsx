import * as React from 'react';
import { Drawer, Box } from "@mui/material";
import { CGroupsList } from '@/components/groups/CGroupsList';
import { CCalendar } from '@/components/calendars/CCalendar';
import { CGroupChat } from '@/components/groups/CGroupChat';

export default function Home() {
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          zIndex: 0,
          [`& .MuiDrawer-paper`]:{
            boxShadow: 5,
            width: 300,
            boxSizing: "border-box"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <CGroupsList />
      </Drawer>
      <CGroupChat />
      <CCalendar/>
    </Box>
  );
}
