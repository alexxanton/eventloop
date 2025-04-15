import { MembersType } from "@/utils/types/types";
import { CModal } from "../containers/CModal";
import { Settings } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useState } from "react";

export function CGroupSettingsModal({members}: {members: MembersType[]}) {
  const [open, setOpen] = useState(false);
  
  return (
    <CModal
      title="Group settings"
      buttonType="icon"
      ButtonContent={Settings}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Box>
        {members.map((member) => {
          return (
            <Box key={member.group_id}>{member.user_id}</Box>
          );
        })}
      </Box>
    </CModal>
  );
}
