"use client";
import { useStore } from '@/utils/zustand';
import { Box, Typography, TextField, IconButton, Paper, keyframes } from '@mui/material';
import { Close, Send, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { purple } from '@/utils/constants/purple';
import { MuiStyles } from '@/utils/types/types';
import { CEventForm } from '../events/form/CEventForm';
import { CMessageBubble } from './CMessageBubble';

export function CGroupChat() {
  const { currentGroup } = useStore();
  // const theme = useTheme();
  const [messages, setMessages] = useState([
    { sender: "You", text: "Hey! How's it going?" },
    { sender: "Alice", text: "All good! What about you?" },
  ]);
  const [input, setInput] = useState("");

  const bounce = keyframes`
  0%, 100% { transform: rotate(-45deg) translate(0, 0); }
  25% { transform: rotate(-45deg) translate(7px, -5px); }
  50% { transform: rotate(-45deg) translate(0, 0); }
  75% { transform: rotate(-45deg) translate(7px, -5px); }
`;

  const sendMessage = () => {
    console.log(input);
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "You", text: input }]);
      setInput("");
    }
  };

  if (!currentGroup) {
    return (
      <Box>
        <Paper>
          <form>
            <TextField
              label="Group name"
              variant="standard"
            />
          </form>
        </Paper>
      </Box>
    );
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
            return <CMessageBubble msg={msg} index={index} array={array} key={index} />
          })}
        </Box>
      </Box>
      <footer>
        <Box sx={styles.footer}>
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
          <IconButton
            sx={{
              bgcolor: purple,
              maxHeight: "fit-content",
              "&:hover svg": {
                animation: `${bounce} 0.5s ease-in-out`,
              },
            }}
            color="secondary"
            onClick={sendMessage}
          >
            <Send sx={{ transform: "rotate(-45deg)" }} />
          </IconButton>
        </Box>
      </footer>
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
  footer: {
    // position: "sticky",
    // bottom: 0,
    width: "100%",
    bgcolor: "background.paper",
    display: "flex",
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
