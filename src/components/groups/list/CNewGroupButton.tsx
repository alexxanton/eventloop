"use client";
import { CModal } from "@/components/containers/CModal";
import { useUser } from "@/utils/hooks/useUser";
import { supabase } from "@/utils/supabase";
import { FormEvent, MuiStyles } from "@/utils/types/types";
import { Add } from "@mui/icons-material";
import { Box, Button, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CNewGroupButton() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const userId = useUser()?.id;
  const router = useRouter();

  const createGroup = async (event: FormEvent) => {
    event.preventDefault();

    const group = {
      name,
      description,
      is_public: true
    };
    
    const { data } = await supabase.from("groups").insert([group]).select();

    if (data) {
      const groupId = data[0].id;
      const owner = {
        group_id: groupId,
        user_id: userId,
        role: "owner",
      };
  
      const { error } = await supabase.from("group_members").insert([owner]);

      if (error) {
        alert(error.message)
      }

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

  const CreateButton = () => (
    <>
      <ListItemIcon>
        <Add />
      </ListItemIcon>
      <ListItemText primary="Create new group" sx={{ textWrap: "nowrap" }} />
    </>
  );

  return (
    <ListItem sx={{ position: "sticky", top: 0, borderBottom: "1px solid", borderBottomColor: grey[400] }} disablePadding>
      <CModal title="Create new group" buttonType="list" ButtonContent={CreateButton}>
        <Box sx={styles.box}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Enter the name of the new group and start collaborating!
          </Typography>
          <form onSubmit={createGroup}>
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
            <Button type="submit" fullWidth variant="contained">
              Create
            </Button>
          </form>
        </Box>
      </CModal>
      
      </ListItem>
  );
}

const styles: MuiStyles = {
  box: {
    p: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  }
};
