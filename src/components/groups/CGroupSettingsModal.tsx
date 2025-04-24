import { MembersType, MuiStyles } from "@/utils/types/types";
import { CModal } from "../containers/CModal";
import { Delete, Settings } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabase";
import { useStore } from "@/utils/zustand";

export function CGroupSettingsModal() {
  const { currentGroup } = useStore();
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState<MembersType[]>([]);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    const getMembers = async () => {
      const { data: members } = await supabase
        .from("group_members")
        .select("*, profiles(username)")
        .eq("group_id", currentGroup?.id)
        .order("id")
        .throwOnError();

        setMembers(members);
    };

    getMembers();
  }, [currentGroup, trigger]);

  const MemberRow = ({member}: {member: MembersType}) => {
    const isOwner = member.role === "owner";

    const handleRoleChange = async (role: string) => {
      const { error } = await supabase
        .from("group_members")
        .update({role: role})
        .eq("user_id", member.user_id)
        .eq("group_id", member.group_id);

      if (error) console.log(error.details);
      setTrigger(!trigger);
    };

    const removeMember = async () => {
      const { error } = await supabase
        .from("group_members")
        .delete()
        .eq("user_id", member.user_id)
        .eq("group_id", member.group_id);

      setTrigger(!trigger);
    };

    return (
      <Box sx={styles.memberRow}>
        <Avatar sx={styles.avatar} />
        <Typography sx={styles.username}>@{member.profiles.username}</Typography>
        
        <FormControl sx={styles.roleSelect}>
          <Select
            disabled={isOwner}
            value={member.role}
            onChange={(e) => {
              handleRoleChange(e.target.value);
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
        
        <IconButton onClick={removeMember} disabled={isOwner} sx={styles.deleteButton}>
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
