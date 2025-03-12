"use client";
import { useStore } from '@/utils/zustand';
import { CCalendar } from '@/components/calendars/CCalendar';
import { Box, Paper, Typography, TextField, IconButton, BottomNavigation } from '@mui/material';
import { Close, Send, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { purple } from '@/utils/constants/purple';
import { MuiStyles } from '@/utils/types/types';
import { CEventForm } from '../events/CEventForm';

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
        <Box sx={styles.navbar}>
          <Box sx={styles.typography}>
            <Typography variant="h6">
              {currentGroup}
            </Typography>
          </Box>
          <IconButton>
            <Close />
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
          <CEventForm />
        </Box>
        <Box sx={styles.messagesBox}>
          {messages.map((msg, index, array) => {
            const prev = index > 0 ? array[index - 1] : null;
            
            return (
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
                    mt: prev?.sender === msg.sender ? -0.5 : 1,
                    borderRadius: `${msg.sender === "You" ? "10px 0px" : "0px 10px"} 10px 10px`,
                  }}
                >
                  {prev?.sender !== msg.sender ? <small>{"@" + msg.sender}</small> : null}
                  <Typography variant="body1">{msg.text}</Typography>
                </Paper>
              </Box>
            );
          })}
        </Box>
      </Box>
      <BottomNavigation sx={styles.footer}>
        <Box sx={styles.inputBox}>
          <TextField
            sx={styles.textField}
            fullWidth
            multiline
            rows={input !== "" ? 0 : 1}
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
          />
        </Box>
        <IconButton sx={{ bgcolor: purple, maxHeight: "fit-content" }} color="secondary" onClick={sendMessage}>
          <Send sx={{ transform: "rotate(-45deg)" }} />
        </IconButton>
      </BottomNavigation>
    </Box>
  );
}

const styles: MuiStyles = {
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
    pt: 1,
    pb: 1,
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    mb: 1,
  },
  typography: {
    flexGrow: 1,
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
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px"
    },
    "& .MuiInputBase-input::placeholder": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      textWrap: "nowrap"
    },
  },
};
