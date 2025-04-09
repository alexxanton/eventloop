import { MembersType } from "@/utils/types/types";
import { CModal } from "../containers/CModal";
import { Settings } from "@mui/icons-material";
import { Box } from "@mui/material";

export function CGroupSettings({members}: {members: MembersType[]}) {
  return (
    <CModal title="Group settings" buttonType="icon" ButtonContent={Settings}>
      <Box>
        {members.map((member) => {
          return (
            <Box>{member.group_id}</Box>
          );
        })}
      </Box>
    </CModal>
  );
}
