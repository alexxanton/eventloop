import * as React from 'react';
import { Box, Paper } from "@mui/material";
import { CGroupsList } from '@/components/groups/CGroupsList';
import { CGroupChat } from '@/components/groups/CGroupChat';

export default function Home() {
  return (
    <Box sx={{ display: "flex", flex: 1, overflow: "auto" }}>
      <Box sx={{ position: "sticky", top: 0 }}>
        <Paper square sx={{ width: 300, height: "100%", overflow: "auto", boxShadow: "10px 0px 10px -5px rgba(0,0,0,0.3)" }}>
          <CGroupsList />
        </Paper>
      </Box>
      <CGroupChat />
    </Box>
  );
}
