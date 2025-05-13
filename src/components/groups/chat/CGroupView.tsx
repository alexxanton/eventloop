"use client";
import { useStore } from "@/utils/zustand";
import { Box, Paper, Badge, useMediaQuery, useTheme } from "@mui/material";
import { CGroupsList } from "../list/CGroupsList";
import { CGroupChat } from "./CGroupChat";
import { CMainScreen } from "./CMainScreen";
import { Event, Group, MuiStyles } from "@/utils/types/types";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/utils/supabase/supabase";
import { useUser } from "@/utils/hooks/useUser";
import { CEventCard } from "./CEventCard";
import { CEventFormModal } from "@/components/events/form/CEventFormModal";
import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

export function CGroupView({ groups }: { groups: Group[] | null }) {
  const { currentGroup, openEvents, menuOpen } = useStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string>("");
  const userId = useUser()?.id;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getGroupData = async () => {
    if (!userId || !currentGroup?.id) return;

    const { data: events } = await supabase
      .from("events")
      .select("*, tickets(*, profile:profiles(*))")
      .eq("group_id", currentGroup?.id);

    const { data: role } = await supabase
      .from("group_members")
      .select("role")
      .eq("user_id", userId)
      .eq("group_id", currentGroup?.id)
      .single()
      .throwOnError();

    if (events) {
      setEvents(events);
      setCurrentUserRole(role?.role || "");
    }
  };

  useEffect(() => {
    getGroupData();
  }, [userId, currentGroup?.id]);

  useEffect(() => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes", {
          event: "*",
          schema: "public",
          table: "tickets"
        },
        (payload) => {
          console.log(payload);
          getGroupData();
        }
      )
      .subscribe();

    return () => {supabase.removeChannel(channel)}
  }, [events, setEvents]);

  const highlightedDays = useMemo(() => {
    const days: { [key: string]: number } = {};
    events.forEach((event) => {
      const dateKey = dayjs(event.start_date).format("YYYY-MM-DD");
      days[dateKey] = (days[dateKey] || 0) + 1;
    });
    return days;
  }, [events]);

  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          ...styles.stickyBox,
          display: isMobile && (currentGroup || menuOpen) ? "none" : "",
        }}
      >
        <Paper elevation={0} square sx={styles.groupsListPaper}>
          <CGroupsList groups={groups} />
        </Paper>
      </Box>
      {currentGroup ? (((isMobile && !openEvents) || !isMobile) && <CGroupChat /> ): (((isMobile && menuOpen) || !isMobile) && <CMainScreen />)}
      <Box sx={styles.stickyBox} width={isMobile && openEvents ? "100%" : "fit-content"}>
        <Paper
          square
          elevation={1}
          sx={{
            ...styles.eventsPaper,
            width: openEvents && currentGroup ? isMobile ? "100%" : 300 : 0,
            p: openEvents && currentGroup ? 1 : 0,
          }}
        >
          <Paper sx={styles.calendarPaper} elevation={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                sx={styles.dateCalendar}
                onChange={(date) => {
                  const day = dayjs(date).format("YYYY-MM-DD");
                  const prevDay = dayjs(selectedDay).format("YYYY-MM-DD");
                  
                  if (day === prevDay) {
                    setSelectedDay(null);
                  } else {
                    setSelectedDay(date);
                  }
                }}
                value={selectedDay}
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                  } as PickersDayProps<Dayjs> & { highlightedDays?: { [key: string]: number } },
                }}
              />
            </LocalizationProvider>
            {<Box sx={styles.new}><CEventFormModal /></Box>}
          </Paper>
          {events
            .filter((e) => {
              if (!selectedDay) return true;
              return dayjs(e.start_date).isSame(selectedDay, "day");
            })
            .map((e, index) => (
              <Box key={index}>
                <CEventCard event={e} userRole={currentUserRole} />
              </Box>
            ))}
        </Paper>
      </Box>
    </Box>
  );
}

const ServerDay = (
  props: PickersDayProps<Dayjs> & { highlightedDays?: { [key: string]: number } }
) => {
  const { highlightedDays = {}, day, outsideCurrentMonth, ...other } = props;
  const dateKey = day.format("YYYY-MM-DD");
  const isHighlighted = highlightedDays[dateKey] && !outsideCurrentMonth;

  return (
    <Badge
      key={dateKey}
      overlap="rectangular"
      badgeContent={isHighlighted ? highlightedDays[dateKey] : undefined}
      color="primary"
      sx={{
        "& .MuiBadge-badge": {
          transform: isHighlighted ? "scale(0.6) translate(20%, -20%)": "",
        }
      }}
      anchorOrigin={{
        horizontal: "right",
      }}
    >
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
      />
    </Badge>
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
    overflowY: "scroll",
  },
  calendarPaper: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    mb: 0.5,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: 3
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
