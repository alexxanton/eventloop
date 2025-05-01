"use client";
import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useStore } from "@/utils/zustand";
import { FormEvent } from "@/utils/types/types";
import { login, signup } from "@/app/login/actions";

export function CLogin() {
  const { setUserId } = useStore();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);

    const error = isSignUp
      ? (await signup(formData))
      : (await login(formData));
    
    if (error) {
      setError(error.message);
    } else {
      if (isSignUp) {
        setIsSignUp(false);
      }
      
      setUserId("");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{
        position: "fixed",
        top: -100,
        left: -100,
        width: "200px",
        height: "200px",
        bgcolor: "primary.light",
        clipPath: "circle(40% at 50% 50%)",
        opacity: 0.1,
        zIndex: -1
      }} />
      <Box sx={{
        position: "fixed",
        bottom: -50,
        right: -50,
        width: "150px",
        height: "150px",
        bgcolor: "secondary.light",
        clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        opacity: 0.1,
        transform: "rotate(45deg)",
        zIndex: -1
      }} />
      <Box sx={{
        position: "fixed",
        top: "30%",
        right: "10%",
        width: "80px",
        height: "80px",
        bgcolor: "primary.main",
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        opacity: 0.08,
        zIndex: -1
      }} />
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
          {isSignUp && (
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
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
