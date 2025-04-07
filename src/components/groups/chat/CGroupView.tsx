"use client";
import { useStore } from '@/utils/zustand';
import { Box, Button, Paper, Typography } from '@mui/material';
import { CGroupsList } from '../list/CGroupsList';
import { CGroupChat } from './CGroupChat';
import { CMainScreen } from './CMainScreen';
import { EventType, GroupType } from '@/utils/types/types';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Edit } from '@mui/icons-material';
import { CModal } from '@/components/containers/CModal';
import { CEventEditForm } from '@/components/events/form/CEventEditForm';
import Link from 'next/link';

type CProps = {
  groups: GroupType[] | null;
};

export function CGroupView({groups}: CProps) {
  const { currentGroup } = useStore();
  const [events, setEvents] = useState<EventType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      const { data: events } = await supabase.from("events").select("*");
      const { data: members } = await supabase.from("groups_members").select("*");
      if (events) {
        setEvents(events);
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
            zIndex: 1000
          }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                sx={{ width: 250, height: 230,
                  // "& .MuiDayCalendar-weekContainer": {
                  //   gap: "1px",
                  // },
                  "& .MuiPickersDay-root": {
                    width: 25,
                    height: 25,
                  },
                  "& .MuiDayCalendar-header": {
                    justifyContent: "center",
                    "& .MuiTypography-root": {
                      width: 25,
                      height: 10,
                      fontSize: "0.55rem",
                    },
                  },
                }}
                onChange={()=>{}}
              />
            </LocalizationProvider>
          </Paper>
          {events.map((e, index) => {
            return (
              <Box key={index}>
                <EventCard event={e} />
              </Box>
            );
          })}
        </Paper>
      </Box>
    </Box>
  );
}

const EventCard = ({event}: {event: EventType}) => (
  <Box sx={{ px: 2, pt: 1, mb: 0, borderBottom: "1px solid black" }}>
    <Box sx={{ display: "flex", gap: 2 }}>
      
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(event.start_date).toLocaleString().split(",")[0]} • {event.location}
        </Typography>
      </Box>
      <Box>
        <CEventEditForm event={event} />
      </Box>
    </Box>
    <Box sx={{ display: "flex", gap: 1}}>
      <Link href={`/event/${event.id}`}>
        <Button>Join</Button>
      </Link>
      <Button>View</Button>
    </Box>
  </Box>
);
