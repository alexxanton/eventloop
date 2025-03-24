"use client";
import { useStore } from '@/utils/zustand';
import { Box, Paper } from '@mui/material';
import { CGroupsList } from '../list/CGroupsList';
import { CGroupChat } from './CGroupChat';
import { CGroupForm } from './CGroupForm';
import { GroupType } from '@/utils/types/types';

type CProps = {
  groups: GroupType[] | null;
};

export function CGroupView({groups}: CProps) {
  const { currentGroup } = useStore();

  return (
    <Box sx={{ display: "flex", flex: 1, overflow: "auto" }}>
      <Box sx={{ position: "sticky", top: 0 }}>
        <Paper
          square
          sx={{
            width: currentGroup ? 0 : 300,
            transition: "width 0.3s ease-in-out",
            height: "100%",
            overflow: "auto",
            boxShadow: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)"
          }}
        >
          <CGroupsList groups={groups} />
        </Paper>
      </Box>
      {currentGroup ? <CGroupChat /> : <CGroupForm />}
      {/* <Box sx={{ position: "sticky", top: 0 }}>
        <Paper square sx={{ width: 300, height: "100%", overflow: "auto", boxShadow: "10px 0px 10px -5px rgba(0,0,0,0.3)" }}>
        </Paper>
      </Box> */}
    </Box>
  );
}
