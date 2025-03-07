import * as React from 'react';
import { Box, Paper } from "@mui/material";
import { CGroupsList } from '@/components/groups/CGroupsList';
import { CGroupChat } from '@/components/groups/CGroupChat';

export default function Home() {
  return (
    <Box sx={{ display: "flex", flex: 1, overflow: "auto" }}>
      <Box sx={{ position: "sticky", top: 0 }}>
        <Paper sx={{ height: "100%", overflow: "auto" }}>
          <CGroupsList />
        </Paper>
      </Box>
      <CGroupChat />
    </Box>
  );
}
