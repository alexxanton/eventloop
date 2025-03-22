import { useUser } from "@/utils/hooks/useUser";
import { supabase } from "@/utils/supabase";
import { FormEvent, MuiStyles } from "@/utils/types/types";
import { Groups, AccountCircle, Event, Login, PersonAdd } from "@mui/icons-material";
import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Paper, Tab, Tabs, TextField, Typography } from "@mui/material";
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
    // <Box sx={styles.box}>
    //   <Paper elevation={3} sx={{ p: 2, width: 250 }}>
    //     <Typography variant="h6" gutterBottom>
    //       Create a New Group
    //     </Typography>
    //     <Typography variant="body1" sx={{ mb: 2 }}>
    //       Enter the name of the new group and start collaborating!
    //     </Typography>
    //     <form onSubmit={createGroup}>
    //       <TextField
    //         fullWidth
    //         required
    //         label="Group name"
    //         variant="outlined"
    //         sx={{ mb: 2 }}
    //         onChange={(e) => setName(e.target.value)}
    //         value={name}
    //       />
    //       <TextField
    //         fullWidth
    //         multiline
    //         label="Description"
    //         variant="filled"
    //         sx={{ mb: 2 }}
    //         onChange={(e) => setDescription(e.target.value)}
    //         value={description}
    //       />
    //       <Button onClick={()=>alert("a")} type="submit" fullWidth variant="contained">
    //         Create
    //       </Button>
    //     </form>
    //   </Paper>
    // </Box>
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        py: 8,
        position: "relative",
        clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)"
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Box sx={{
              width: 400,
              height: 300,
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: 2,
              display: { xs: "none", md: "block" }
            }}>
              <Box sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.3)",
                backgroundImage: "",
                backgroundSize: "contain",
                borderRadius: "10px"
              }}>
                <svg width="573" height="586" viewBox="0 0 573 586" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M65.9742 348.85C51.1658 297.821 54.32 243.254 74.9099 194.27C95.4997 145.287 132.278 104.854 179.097 79.7284C225.917 54.6032 279.941 46.3082 332.142 56.2296C384.342 66.1511 431.556 93.6878 465.893 134.238L418.593 174.291C393.428 144.572 358.826 124.391 320.569 117.12C282.312 109.849 242.718 115.928 208.405 134.342C174.092 152.756 147.138 182.388 132.048 218.288C116.958 254.187 114.646 294.178 125.499 331.577L65.9742 348.85Z" fill="#B892F2"/>
                  <path d="M477.086 224.769L477.086 110.985L378.546 167.877L477.086 224.769Z" fill="#B892F2"/>
                  <path d="M507.025 236.808C521.834 287.838 518.679 342.404 498.09 391.388C477.5 440.371 440.722 480.805 393.902 505.93C347.083 531.055 293.058 539.35 240.858 529.429C188.657 519.507 141.443 491.97 107.106 451.42L154.406 411.367C179.571 441.086 214.174 461.267 252.431 468.538C290.688 475.809 330.281 469.73 364.595 451.316C398.908 432.902 425.862 403.27 440.952 367.37C456.042 331.471 458.353 291.48 447.501 254.081L507.025 236.808Z" fill="#B892F2"/>
                  <path d="M95.9129 360.889L95.9129 474.673L194.452 417.781L95.9129 360.889Z" fill="#B892F2"/>
                  <circle cx="288.5" cy="300.5" r="87.5" fill="#B892F2"/>
                </svg>

              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                Plan Events Together
              </Typography>
              <Typography variant="h5" sx={{ mb: 4 }}>
                Chat, coordinate, and celebrate - all in one place!
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<Groups />}
                  // onClick={handleActionClick}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Create Group
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  startIcon={<Event />}
                  // onClick={handleActionClick}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Join Event
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { md: "repeat(3, 1fr)" }, gap: 4 }}>
          {[
            { icon: <Groups fontSize="large" />, title: "Create Groups", text: "Bring people together around shared interests or events" },
            { icon: <Event fontSize="large" />, title: "Plan Events", text: "Coordinate dates, tasks, and details with built-in tools" },
            { icon: <AccountCircle fontSize="large" />, title: "Stay Connected", text: "Chat, share updates, and keep everyone in the loop" },
          ].map((feature, index) => (
            <Paper key={index} sx={{ p: 4, textAlign: "center", borderRadius: 4 }}>
              <Box sx={{ color: "primary.main", mb: 2 }}>{feature.icon}</Box>
              <Typography variant="h6" gutterBottom>{feature.title}</Typography>
              <Typography color="text.secondary">{feature.text}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>
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
