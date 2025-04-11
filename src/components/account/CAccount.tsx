"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Avatar, Typography, CircularProgress, Box, IconButton, Button } from "@mui/material";
import { supabase } from "@/utils/supabase/supabase";
import { User } from "@supabase/supabase-js";
import { useStore } from "@/utils/zustand";
import { DarkMode, LightMode } from "@mui/icons-material";

export function CAccount({loggedUser}: {loggedUser: User}) {
  const { theme, toggleTheme } = useStore();
  const router = useRouter();
  const [user, setUser] = useState<User>(loggedUser);
  const [uploading, setUploading] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    // bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file || !user) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      if (updateError) throw updateError;

      // Update local state
      setUser((prev: User) => ({ ...prev, user_metadata: { ...prev.user_metadata, avatar_url: publicUrl } }));
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} textAlign="center">
        <label htmlFor="avatar-upload">
          <input
            accept="image/*"
            id="avatar-upload"
            type="file"
            hidden
            onChange={handleAvatarUpload}
          />
          <Avatar
            src={user.user_metadata?.avatar_url}
            sx={{ width: 100, height: 100, cursor: "pointer" }}
          />
          {uploading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </label>

        <Typography variant="h5">
          Welcome, {user.email?.split("@")[0]}!
        </Typography>
        <Box>
          <IconButton
            size="large"
            edge="start"
            sx={{ color: "white", mr: 2 }}
            aria-label="menu"
            onClick={toggleTheme}
          >
            {theme !== "dark" ? <DarkMode sx={{color: "#181414"}} /> : <LightMode />}
          </IconButton>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          disabled={uploading}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}
