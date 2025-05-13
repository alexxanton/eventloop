"use client";
import { CAvatarUpload } from "@/components/account/CAvatarUpload";
import { CModal } from "@/components/containers/CModal";
import { useUser } from "@/utils/hooks/useUser";
import { supabase } from "@/utils/supabase/supabase";
import { FormEvent, Group, MuiStyles } from "@/utils/types/types";
import { Add } from "@mui/icons-material";
import { Box, Button, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CNewGroupModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<Group | null>(null);
  const userId = useUser()?.id;
  const router = useRouter();

  const createGroup = async (event: FormEvent) => {
    event.preventDefault();

    if (group) {
      setOpen(false);
      return;
    }

    const newGroup = {
      name,
      description,
      is_public: true,
    };

    const { data: groupData } = await supabase
      .from("groups")
      .insert([newGroup])
      .select()
      .single();

    if (groupData) {
      const owner = {
        group_id: groupData.id,
        user_id: userId,
        role: "owner",
      };

      const { error } = await supabase.from("group_members").insert([owner]);

      if (error) {
        alert(error.message);
      }

      setName("");
      setDescription("");
      setGroup(groupData);
      router.refresh();
    }
  };

  const CreateButton = () => (
    <>
      <ListItemIcon>
        <Add />
      </ListItemIcon>
      <ListItemText primary="Create new group" sx={{ textWrap: "nowrap" }} />
    </>
  );

  return (
    <ListItem sx={styles.list} disablePadding>
      <CModal
        title="Create new group"
        buttonType="list"
        ButtonContent={CreateButton}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <Box display="flex">
          <Box sx={styles.box}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {group
                ? "Set an amazing avatar for the group!"
                : "Enter the name of the new group and start collaborating!"}
            </Typography>
            <form onSubmit={createGroup}>
              {group ? (
                <Box sx={styles.box} mx={1}>
                  <CAvatarUpload group={group} />
                </Box>
              ) : (
                <>
                  <TextField
                    fullWidth
                    required
                    label="Group name"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    label="Description"
                    variant="filled"
                    sx={{ mb: 2 }}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </>
              )}
              <Button type="submit" fullWidth variant="contained">
                {group ?  "OK" : "Create"}
              </Button>
            </form>
          </Box>
        </Box>
      </CModal>
    </ListItem>
  );
}


const styles: MuiStyles = {
  box: {
    py: 3,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    bgcolor: "background.paper",
    position: "sticky",
    top: 0,
    borderBottom: "1px solid",
    borderBottomColor: grey[400],
    zIndex: 1000
  },
};
