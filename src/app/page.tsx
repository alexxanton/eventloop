import * as React from 'react';
import { Drawer, Box, Link, Button, Paper } from "@mui/material";
import { CGroups } from '@/components/groups/CGroups';
import { CCalendar } from '@/components/calendars/CCalendar';

export default  function Home() {
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
        <CGroups />
      </Drawer>
      <CCalendar/>
    </Box>
  );
}
