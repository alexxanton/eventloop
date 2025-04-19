import { MembersType, MuiStyles } from "@/utils/types/types";
import { CModal } from "../containers/CModal";
import { Delete, Settings } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { useState } from "react";

export function CGroupSettingsModal({members}: {members: MembersType[]}) {
  const [open, setOpen] = useState(false);

  const MemberRow = ({member}: {member: MembersType}) => {
    const [role, setRole] = useState(member.role);
    const isOwner = member.role === "owner";

    return (
      <Box sx={styles.memberRow}>
        <Avatar sx={styles.avatar} />
        <Typography sx={styles.username}>@{member.profiles.username}</Typography>
        
        <FormControl sx={styles.roleSelect}>
          <Select
            disabled={isOwner}
            value={role}
            onChange={(e) => {
              setRole(e.target.value)
            }}
            sx={styles.select}
          >
            {isOwner && <MenuItem value="owner">Owner</MenuItem>}
            <MenuItem value="member">Member</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="validator">Validator</MenuItem>
            <MenuItem value="organizer">Organizer</MenuItem>
          </Select>
        </FormControl>
        
        <IconButton disabled={isOwner} sx={styles.deleteButton}>
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    );
  };
  
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
        {members.map((member, index) => {
          return <MemberRow member={member} key={index} />;
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
  roleSelect: {
    minWidth: 120,
    mr: 1,
  },
  select: {
    fontSize: "0.875rem",
    "& .MuiSelect-select": {
      py: 0.75,
    }
  },
  deleteButton: {
    color: "error.light",
    "&:hover": {
      backgroundColor: "error.dark",
    }
  }
};
