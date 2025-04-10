"use client";
import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useStore } from "@/utils/zustand";
import { supabase } from "@/utils/supabase/supabase";
import { FormEvent } from "@/utils/types/types";

export function CLogin() {
  const { setUserId } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
    } else {
      alert(isSignUp ? "Sign-up successful!" : "Login successful!");
      setUserId("");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          {isSignUp ? "Sign Up" : "Login"}
        </Typography>
        <form onSubmit={handleAuth}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </Button>
          {!isSignUp ? (
            <Button fullWidth sx={{ mt: 1 }} onClick={() => {}}>
              Forgot password? Click here
            </Button>
          ) : null}
        </form>
      </Box>
    </Container>
  );
}
