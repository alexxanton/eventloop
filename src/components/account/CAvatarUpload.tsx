import { supabase } from "@/utils/supabase/supabase";
import { Group } from "@/utils/types/types";
import { useStore } from "@/utils/zustand";
import { Add } from "@mui/icons-material";
import { Avatar, Box, CircularProgress } from "@mui/material";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CAvatarUpload({user, group}: {user?: User, group?: Group}) {
  const { setUserUrl } = useStore();
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file || (!user && !group)) return;

      const id = user ? user.id : group?.id;
      const fileExt = file.name.split(".").pop();
      const fileName = `${id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      if (user) {
        const { error: updateError } = await supabase.auth.updateUser({
          data: { avatar_url: publicUrl }
        });

        setUserUrl(publicUrl);

        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({ user_id: user.id, avatar: publicUrl });
  
        if (updateError || profileError) throw updateError || profileError;
      } else {
        const { error: updateError } = await supabase
          .from("groups")
          .upsert({ id: group?.id, avatar: publicUrl });

        if (updateError) throw updateError;
      }
      
      router.refresh();
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
     <Box sx={{
      position: "relative",
      mb: 3,
    }}>
      <label htmlFor="avatar-upload">
        <input
          accept="image/*"
          id="avatar-upload"
          type="file"
          hidden
          onChange={handleAvatarUpload}
        />
        <Avatar
          src={user ? user.user_metadata?.avatar_url : group?.avatar}
          sx={{
            width: 120,
            height: 120,
            border: "3px solid",
            borderColor: "primary.contrastText",
            boxShadow: 4
          }}
        />
        <Avatar
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.3s",
            cursor: "pointer",
            "&:hover": {
              opacity: 1
            }
          }}
        >
          <Add fontSize="large" sx={{ color: "white" }} />
        </Avatar>
        {uploading && (
          <CircularProgress
            size={48}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "primary.contrastText"
            }}
          />
        )}
      </label>
    </Box>
  );
}
