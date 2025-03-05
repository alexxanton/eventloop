import * as React from 'react';
import { Box, Paper } from "@mui/material";
import { CGroupsList } from '@/components/groups/CGroupsList';
import { CGroupChat } from '@/components/groups/CGroupChat';

export default function Home() {
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <Paper>
        <CGroupsList />
      </Paper>
      <CGroupChat />
    </Box>
  );
}
