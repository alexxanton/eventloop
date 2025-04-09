"use client";
import { CAccount } from "@/components/account/CAccount";
import { CLogin } from "@/components/account/CLogin";
import { supabase } from "@/utils/supabase";
import { Container, Box, CircularProgress } from "@mui/material";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchSession();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return user ? <CAccount loggedUser={user} /> : <CLogin />;
}
