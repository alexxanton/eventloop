"use client";
import { useStore } from '@/utils/zustand';
import { Box, Typography, TextField, IconButton, Paper, keyframes } from '@mui/material';
import { Close, Send, Settings } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { purple } from '@/utils/constants/purple';
import { MuiStyles } from '@/utils/types/types';
import { CEventForm } from '../events/form/CEventForm';
import { CMessageBubble, MessageType } from './CMessageBubble';
import { supabase } from '@/utils/supabase';
import { CGroupsList, GroupType } from './CGroupsList';

type CProps = {
  groups: GroupType[] | null;
  messages: MessageType[] | null;
};

export function CGroupChat({groups, messages}: CProps) {
  const { currentGroup, setCurrentGroup } = useStore();
  // const theme = useTheme();
  const [input, setInput] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUid(user.id);
      }
    };
    getUserId();
  }, []);

  const bounce = keyframes`
    0%, 100% { transform: rotate(-45deg) translate(0); }
    25% { transform: rotate(-45deg) translate(7px); }
    50% { transform: rotate(-45deg) translate(0); }
    75% { transform: rotate(-45deg) translate(7px); }
  `;

  const sendMessage = async () => {
    console.log(input);
    
    if (input.trim() !== "") {
      const { data: { user } } = await supabase.auth.getUser();
      const message = {
        user_id: user?.id,
        group_id: 1,
        message: input,
        sent_at: new Date().toISOString()
      };

      setInput("");
      const { error } = await supabase.from("messages").insert([message]);

      if (error) {
        alert(error.message);
      }
    }
  };

  // if (!currentGroup) {
  //   return (
  //     <Box>
  //       <Paper>
  //         <form>
  //           <TextField
  //             label="Group name"
  //             variant="standard"
  //           />
  //         </form>
  //       </Paper>
  //     </Box>
  //   );
  // }

  return (
    <Box sx={{ display: "flex", flex: 1, overflow: "auto" }}>
      <Box sx={{ position: "sticky", top: 0 }}>
        <Paper square sx={{ width: 300, height: "100%", overflow: "auto", boxShadow: "10px 0px 10px -5px rgba(0,0,0,0.3)" }}>
          <CGroupsList groups={groups} />
        </Paper>
      </Box>
      <Box sx={styles.box}>
        <Box sx={styles.innerBox}>
          <Box sx={styles.navbar}>
            <Box sx={styles.typography}>
              <Typography variant="h6">
                {currentGroup}
              </Typography>
            </Box>
            <IconButton onClick={() => setCurrentGroup("")}>
              <Close />
            </IconButton>
            <IconButton>
              <Settings />
            </IconButton>
            <CEventForm />
          </Box>
          <Box sx={styles.messagesBox}>
            {messages?.map((msg, index, array) => {
              return <CMessageBubble msg={msg} index={index} array={array} userId={uid} key={index} />
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
