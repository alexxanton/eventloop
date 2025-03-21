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
                <svg width="356" height="372" viewBox="0 0 356 372" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.91074 229.198C-3.5165 189.819 -1.08243 147.712 14.8062 109.913C30.6947 72.1134 59.0752 40.9123 95.2045 21.5239C131.334 2.13546 173.023 -4.26559 213.305 3.3905C253.586 11.0466 290.02 32.2959 316.517 63.5873L280.017 94.4951C260.598 71.5622 233.896 55.9889 204.374 50.3779C174.852 44.7669 144.299 49.4581 117.82 63.6675C91.3419 77.877 70.5423 100.744 58.8979 128.446C47.2534 156.149 45.4695 187.009 53.8443 215.868L7.91074 229.198Z" fill="#B892F2"/>
                  <path d="M325.154 133.448L325.154 45.6441L249.114 89.5459L325.154 133.448Z" fill="#B892F2"/>
                  <path d="M348.257 142.738C359.684 182.116 357.25 224.224 341.362 262.023C325.473 299.822 297.093 331.023 260.963 350.412C224.834 369.8 183.145 376.201 142.863 368.545C102.582 360.889 66.1477 339.64 39.6508 308.348L76.1511 277.44C95.5703 300.373 122.272 315.947 151.794 321.558C181.316 327.169 211.869 322.477 238.348 308.268C264.826 294.059 285.626 271.192 297.27 243.489C308.915 215.787 310.698 184.927 302.324 156.067L348.257 142.738Z" fill="#B892F2"/>
                  <path d="M31.0137 238.488L31.0137 326.291L107.054 282.39L31.0137 238.488Z" fill="#B892F2"/>
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
