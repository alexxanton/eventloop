import { CModal } from "@/components/containers/CModal";
import { List } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState } from "react";

export function CAttendanceListModal() {
  const [open, setOpen] = useState(false);
  
  return (
    <CModal
      title="Attendance"
      buttonType="icon"
      ButtonContent={List}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Box></Box>
    </CModal>
  );
}
