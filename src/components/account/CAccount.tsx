"use client";
import { useRouter } from "next/navigation";
import { Container, Typography, Box, IconButton, Button } from "@mui/material";
import { supabase } from "@/utils/supabase/supabase";
import { User } from "@supabase/supabase-js";
import { useStore } from "@/utils/zustand";
import { DarkMode, LightMode } from "@mui/icons-material";
import { CAvatarUpload } from "./CAvatarUpload";

export function CAccount({user}: {user: User}) {
  const { theme, toggleTheme, setUserUrl } = useStore();
  const router = useRouter();

  const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserUrl("");
    router.push("/");
  };

  return (
    <Container sx={{
      position: "relative",
      overflow: "hidden",
      flex: 1,
      pt: 4,
      "&:before": {
        content: '""',
        position: "absolute",
        top: -100,
        left: -100,
        width: "200px",
        height: "200px",
        bgcolor: "primary.light",
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        opacity: 0.1,
        zIndex: -1
      },
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: -50,
        right: -50,
        width: "150px",
        height: "150px",
        bgcolor: "secondary.light",
        clipPath: "circle(40% at 50% 50%)",
        opacity: 0.5,
        zIndex: -1
      }
    }}>
      {/* Background Shapes */}
      <Box sx={{
        position: "absolute",
        top: "20%",
        right: "10%",
        width: "80px",
        height: "80px",
        bgcolor: "primary.light",
        clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        opacity: 0.08,
        transform: "rotate(45deg)",
        zIndex: -1
      }} />

      {/* Hero Section */}
      <Box sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        py: 8,
        position: "relative",
        clipPath: "polygon(10% 10%, 100% 0, 90% 90%, 0 100%, 10% 10%)",
        mb: 8,
        "&:before": {
          content: '""',
          position: "absolute",
          top: "20%",
          left: "15%",
          width: "60px",
          height: "60px",
          bgcolor: "rgba(255,255,255,0.1)",
          clipPath: "circle(50% at 50% 50%)",
          zIndex: 1
        }
      }}>
        <Container>
          <Box sx={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            top: 16,
            right: 16
          }}>
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              sx={{ transition: "transform 0.3s", ":hover": { transform: "scale(1.1)" } }}
            >
              {theme === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>

          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative"
          }}>
            <CAvatarUpload user={user} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
              {user.email?.split("@")[0]}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Member since {joinDate}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Logout Button Section */}
      <Container>
        <Box sx={{
          maxWidth: 400,
          mx: "auto",
          textAlign: "center",
          transform: "translateY(-40px)",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "-20%",
            width: "40px",
            height: "40px",
            bgcolor: "secondary.light",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            opacity: 0.5
          }
        }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            size="large"
            sx={{
              px: 6,
              borderRadius: 50,
              boxShadow: 3,
              transition: "transform 0.3s",
              ":hover": {
                transform: "translateY(-2px)"
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </Container>
  );
}
