import { CModal } from "@/components/containers/CModal";
import { MuiStyles, TicketType } from "@/utils/types/types";
import { List } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { useState } from "react";

export function CAttendanceListModal({tickets}: {tickets: TicketType[]}) {
  const [open, setOpen] = useState(false);

  const AttendeeRow = ({ticket}: {ticket: TicketType}) => {
    return (
      <Box sx={styles.memberRow}>
        <Avatar sx={styles.avatar} />
        <Typography sx={styles.username}>@{ticket.profiles.username}</Typography>
      </Box>
    );
  };

  return (
    <CModal
      title="Attendance list"
      buttonType="icon"
      ButtonContent={List}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Box>
        {tickets.map((ticket, index) => {
          return <AttendeeRow ticket={ticket} key={index} />
        })}
      </Box>
    </CModal>
  );
}

const styles: MuiStyles = {
  memberRow: {
    display: "flex",
    p: 1,
    alignItems: "center",
    gap: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    fontSize: "0.875rem",
  },
  username: {
    flexGrow: 1,
    fontSize: "0.875rem",
  },
};
