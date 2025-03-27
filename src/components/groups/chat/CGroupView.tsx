"use client";
import { useStore } from '@/utils/zustand';
import { Box, Paper } from '@mui/material';
import { CGroupsList } from '../list/CGroupsList';
import { CGroupChat } from './CGroupChat';
import { CMainScreen } from './CMainScreen';
import { EventType, GroupType } from '@/utils/types/types';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

type CProps = {
  groups: GroupType[] | null;
};

export function CGroupView({groups}: CProps) {
  const { currentGroup } = useStore();
  const [events, setEvents] = useState<EventType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await supabase.from("events").select("*");
      if (data) {
        setEvents([...events, ...data]);
      }
    };
    getEvents();
  }, []);

  return (
    <Box sx={{ display: "flex", flex: 1, overflow: "auto" }}>
      <Box sx={{ position: "sticky", top: 0 }}>
        <Paper
          square
          sx={{
            width: 300,
            // width: currentGroup ? 0 : 300,
            transition: "width 0.3s ease-in-out",
            height: "100%",
            overflow: "auto",
            boxShadow: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)"
          }}
        >
          <CGroupsList groups={groups} />
        </Paper>
      </Box>
      {currentGroup ? <CGroupChat openEvents={() => setOpen(!open)} /> : <CMainScreen />}
      <Box sx={{ position: "sticky", top: 0 }}>
        <Paper
          square
          elevation={1}
          sx={{
            width: open && currentGroup ? 300 : 0,
            transition: "width 0.3s ease-in-out",
            height: "100%",
            overflow: "auto",
            boxShadow: "-10px 0px 10px -5px rgba(0,0,0,0.3)",
          }}
        >
          <Paper square sx={{
            position: "sticky",
            top: 0,
          }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar onChange={()=>{}} />
            </LocalizationProvider>
          </Paper>
          <Box>
            {events.map((e, index) => {
              return <Box key={index} mb={20}>{e.name}</Box>
            })}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
