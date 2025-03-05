"use client";
import { useStore } from '@/utils/zustand';
import { CCalendar } from '../calendars/CCalendar';
import { Box, Paper, Typography, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { purple } from '@/constants/purple';

export function CGroupChat() {
  const { currentGroup } = useStore();
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
    return <CCalendar />
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
                key={index}
                sx={{
                  ...styles.messagePaper,
                  bgcolor: msg.sender === "You" ? purple : "",
                  borderRadius: `${msg.sender === "You" ? "8px 0px" : "0px 8px"} 8px 8px`,
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>
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
      </Box>
    </Box>
  );
}

const styles = {
  box: {
    width: "100%",
    display: "flex",
    flexGrow: 1
  },
  innerBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",

    p: 2
  },
  typography: {
    pb: 1,
    mb: 1
  },
  messagesBox: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowY: "auto",
    mb: 1
  },
  messagePaper: {
    maxWidth: "fit-content",
    p: 1,
    m: 1
  },
  inputBox: {
    display: "flex",
    gap: 1
  },
  textField: {
    "& .MuiOutlinedInput-root": { borderRadius: "20px" }
  }
}
