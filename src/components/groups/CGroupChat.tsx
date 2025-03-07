"use client";
import { useStore } from '@/utils/zustand';
import { CCalendar } from '@/components/calendars/CCalendar';
import { Box, Paper, Typography, TextField, IconButton, BottomNavigation } from '@mui/material';
import { Send } from '@mui/icons-material/';
import { useState } from 'react';
import { purple } from '@/utils/constants/purple';
import { MUIStyles } from '@/utils/types/types';

export function CGroupChat() {
  const { currentGroup } = useStore();
  // const theme = useTheme();
  const [messages, setMessages] = useState([
    { sender: "You", text: "Hey! How's it going?" },
    { sender: "Alice", text: "All good! What about you?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    console.log(input);
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
                  bgcolor: msg.sender === "You" ? purple : "",
                  color: msg.sender === "You" ? "white" : "",
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
            multiline
            variant="outlined"
            autoComplete="off"
            size="small"
            value={input}
            placeholder=" Type a message"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            sx={styles.textField}
          />
        </Box>
        <IconButton sx={{ bgcolor: purple }} color="secondary" onClick={sendMessage}>
          <Send sx={{ transform: "rotate(-45deg)" }} />
        </IconButton>
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
    wordBreak: "break-word"
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
    mt: -2,
    height: "fit-content",
    gap: 1,
  },
  inputBox: {
    display: "flex",
    width: "100%",
    flexDirection: "column-reverse",
    flex: 1,
  },
  textField: {
    "& .MuiOutlinedInput-root": { borderRadius: "20px" },
  },
};
