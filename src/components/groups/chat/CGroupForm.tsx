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
                <svg width={443} height={421} viewBox="0 0 443 421" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50.9107 253.198C39.4835 213.819 41.9176 171.712 57.8062 133.913C73.6947 96.1134 102.075 64.9123 138.204 45.5239C174.334 26.1355 216.023 19.7344 256.305 27.3905C296.586 35.0466 333.02 56.2959 359.517 87.5873L323.017 118.495C303.598 95.5622 276.896 79.9889 247.374 74.3779C217.852 68.7669 187.299 73.4581 160.82 87.6675C134.342 101.877 113.542 124.744 101.898 152.446C90.2534 180.149 88.4695 211.009 96.8443 239.868L50.9107 253.198Z" fill="#B892F2"/>
                  <path d="M368.154 157.448L368.154 69.6441L292.114 113.546L368.154 157.448Z" fill="#B892F2"/>
                  <path d="M391.257 166.738C402.684 206.116 400.25 248.224 384.362 286.023C368.473 323.822 340.093 355.023 303.963 374.412C267.834 393.8 226.145 400.201 185.863 392.545C145.582 384.889 109.148 363.64 82.6507 332.348L119.151 301.44C138.57 324.373 165.272 339.947 194.794 345.558C224.316 351.169 254.869 346.477 281.348 332.268C307.826 318.059 328.626 295.192 340.27 267.489C351.915 239.787 353.698 208.927 345.324 180.067L391.257 166.738Z" fill="#B892F2"/>
                  <path d="M74.0137 262.488L74.0137 350.291L150.054 306.39L74.0137 262.488Z" fill="#B892F2"/>
                  <circle cx="220.5" cy="209.5" r="67.5" fill="#B892F2"/>
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
