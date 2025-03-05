"use client";
import { useStore } from '@/utils/zustand';
import { CCalendar } from '@/components/calendars/CCalendar';
import { Box, Paper, Typography, TextField, IconButton, useTheme, BottomNavigation } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { lightPurple, purple } from '@/utils/constants/purple';
import { MUIStyles } from '@/utils/types/types';

export function CGroupChat() {
  const { currentGroup } = useStore();
  const theme = useTheme();
  const [messages, setMessages] = useState([
    { sender: "You", text: "Hey! How's it going?" },
    { sender: "Alice", text: "All good! What about you?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "You", text: input }]);
      setInput("");
    }
  };

  if (!currentGroup) {
    return <CCalendar />;
  }

  return (
    <Box sx={styles.box}>
      <Box sx={styles.innerBox}>
        <Typography variant="h6" sx={styles.typography}>
          {currentGroup}
        </Typography>
        <Box sx={styles.messagesBox}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
                maxWidth: "60%",
              }}
            >
              <Paper
                sx={{
                  ...styles.messagePaper,
                  bgcolor: msg.sender === "You" ? (theme.palette.mode === "dark" ? purple : lightPurple) : "",
                  borderRadius: `${msg.sender === "You" ? "10px 0px" : "0px 10px"} 10px 10px`,
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
      <BottomNavigation sx={styles.footer}>
        <Box sx={styles.inputBox}>
          <TextField
            fullWidth
            variant="outlined"
            autoComplete="off"
            size="small"
            value={input}
            placeholder=" Type a message"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            sx={styles.textField}
          />
          <IconButton color="primary" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </Box>
      </BottomNavigation>
    </Box>
  );
}

const styles: MUIStyles = {
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  innerBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    p: 2,
  },
  typography: {
    pb: 1,
    mb: 1,
  },
  messagesBox: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    mb: 1,
  },
  messagePaper: {
    maxWidth: "fit-content",
    p: 1,
    m: 1,
  },
  footer: {
    position: "sticky",
    bottom: 0,
    width: "100%",
    bgcolor: "background.paper",
    p: 1,
  },
  inputBox: {
    display: "flex",
    gap: 1,
    width: "100%",
  },
  textField: {
    "& .MuiOutlinedInput-root": { borderRadius: "20px" },
  },
};
