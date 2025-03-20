import { useUser } from "@/utils/hooks/useUser";
import { supabase } from "@/utils/supabase";
import { FormEvent, MuiStyles } from "@/utils/types/types";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export function CGroupForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const userId = useUser()?.id;

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
    }
  };
  
  return (
    <Box sx={styles.box}>
      <Paper elevation={3} sx={{ p: 2, width: 250 }}>
        <Typography variant="h6" gutterBottom>
          Create a New Group
        </Typography>
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
            label="Description"
            variant="filled"
            sx={{ mb: 2 }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Button onClick={()=>alert("a")} type="submit" fullWidth variant="contained">
            Create
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

const styles: MuiStyles = {
  box: {
    p: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
};
