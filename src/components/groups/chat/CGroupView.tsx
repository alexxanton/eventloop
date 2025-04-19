"use client";
import { useStore } from '@/utils/zustand';
import { Box, Paper } from '@mui/material';
import { CGroupsList } from '../list/CGroupsList';
import { CGroupChat } from './CGroupChat';
import { CMainScreen } from './CMainScreen';
import { EventType, GroupType, MembersType, MuiStyles } from '@/utils/types/types';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/supabase';
import { useUser } from '@/utils/hooks/useUser';
import { CEventCard } from './CEventCard';
import { CEventFormModal } from '@/components/events/form/CEventFormModal';

type CProps = {
  groups: GroupType[] | null;
};

export function CGroupView({groups}: CProps) {
  const { currentGroup, openEvents } = useStore();
  const [events, setEvents] = useState<EventType[]>([]);
  const [members, setMembers] = useState<MembersType[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string>("");
  const userId = useUser()?.id;

  useEffect(() => {
    const getGroupData = async () => {
      if (!userId) return;

      const { data: events } = await supabase
        .from("events")
        .select("*")
        // .eq("group_id", currentGroup?.id);

      const { data: members } = await supabase
        .from("group_members")
        .select("*, profiles(username)")
        .eq("group_id", currentGroup?.id)
        .throwOnError();

        console.log(members)
        
      if (events && members) {
        setEvents(events);
        setMembers(members);
        const userRole = members.find(member => member.user_id === userId)?.role;
        setCurrentUserRole(userRole);
      }
    };
    getGroupData();
  }, [userId, currentGroup?.id]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.stickyBox}>
        <Paper square sx={styles.groupsListPaper}>
          <CGroupsList groups={groups} />
        </Paper>
      </Box>
      {currentGroup ? <CGroupChat members={members} /> : <CMainScreen />}
      <Box sx={styles.stickyBox}>
        <Paper
          square
          elevation={1}
          sx={{
            ...styles.eventsPaper,
            width: openEvents && currentGroup ? 300 : 0,
          }}
        >
          {/* Calendar */}
          <Paper sx={styles.calendarPaper}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                sx={styles.dateCalendar}
                onChange={() => {}}
              />
            </LocalizationProvider>
            <Box sx={styles.new}>
              <CEventFormModal />
            </Box>
          </Paper>
          {events.map((e, index) => {
            return (
              <Box key={index}>
                <CEventCard event={e} userRole={currentUserRole} />
              </Box>
            );
          })}
        </Paper>
      </Box>
    </Box>
  );
}

const styles: MuiStyles = {
  container: {
    display: "flex",
    flex: 1,
    overflow: "auto",
  },
  stickyBox: {
    position: "sticky",
    top: 0,
  },
  groupsListPaper: {
    width: 300,
    transition: "width 0.3s ease-in-out",
    height: "100%",
    overflow: "auto",
    boxShadow: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
  },
  eventsPaper: {
    transition: "width 0.3s ease-in-out",
    height: "100%",
    overflow: "auto",
    boxShadow: "-10px 0px 10px -5px rgba(0,0,0,0.3)",
  },
  calendarPaper: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    mb: 0.5,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
  },
  new: {
    position: "absolute",
    right: 0,
    transform: "translateY(-40px)",
  },
  dateCalendar: {
    width: 250,
    height: 230,
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
    "& .MuiYearCalendar-root": {
      gap: "1px",
    },
    "& .MuiPickersYear-yearButton": {
      width: "40px",
      fontSize: "0.8rem",
      borderRadius: "8px",
    },
  }
};
