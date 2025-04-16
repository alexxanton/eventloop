import { Close, Send } from "@mui/icons-material";
import { Box, Typography, IconButton, TextField, keyframes } from "@mui/material";
import { CMessageBubble } from "./CMessageBubble";
import { MembersType, MessageType, MuiStyles } from "@/utils/types/types";
import { useStore } from "@/utils/zustand";
import { supabase } from "@/utils/supabase/supabase";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/utils/hooks/useUser";
import { CGroupSettingsModal } from "../CGroupSettingsModal";
import { CalendarIcon } from "@mui/x-date-pickers";

export function CGroupChat({members}: {members: MembersType[]}) {
  const { currentGroup, setCurrentGroup, toggleOpenEvents } = useStore();
  // const theme = useTheme();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const userId = useUser()?.id;
  const scrollToBottomRef = useRef<HTMLDivElement>(null);

  const bounce = keyframes`
    0%, 100% { transform: rotate(-45deg) translate(0); }
    25% { transform: rotate(-45deg) translate(7px); }
    50% { transform: rotate(-45deg) translate(0); }
    75% { transform: rotate(-45deg) translate(7px); }
  `;

  useEffect(() => {
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollTop = scrollToBottomRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      const { data: messages } = await supabase
        .from("messages")
        .select("*")
        .eq("group_id", currentGroup?.id)
        .order("id");

      if (messages) {
        setMessages(messages);
      }
    };

    getMessages();
  }, [currentGroup?.id]);

  useEffect(() => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes", {
          event: "INSERT",
          schema: "public",
          table: "messages"
        },
        (payload) => {
          const newMessage = payload.new as MessageType;
          if (newMessage.user_id !== userId) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {supabase.removeChannel(channel)}
  }, [messages, setMessages]);
    
  const sendMessage = async () => {
    if (input.trim() !== "") {
      const message: MessageType = {
        user_id: userId || "",
        group_id: currentGroup?.id || 0,
        message: input,
        sent_at: new Date().toISOString()
      };

      setMessages((prevMessages) => [...prevMessages, message]);

      setInput("");
      const { error } = await supabase.from("messages").insert([message]);

      if (error) {
        alert(error.message);
      }
    }
  };

  return (
    <Box sx={styles.box}>
      <Box sx={styles.innerBox}>
        <Box sx={styles.navbar}>
          <Box sx={styles.typography}>
            <Typography variant="h6">
              {currentGroup?.name}
            </Typography>
          </Box>
          <IconButton onClick={() => setCurrentGroup(null)}>
            <Close />
          </IconButton>
          <CGroupSettingsModal members={members} />
          <IconButton onClick={toggleOpenEvents}>
            <CalendarIcon />
          </IconButton>
        </Box>
        <Box sx={styles.messagesBox} ref={scrollToBottomRef}>
          {messages?.map((msg, index, array) => {
            return <CMessageBubble msg={msg} index={index} array={array} userId={userId || ""} key={index} />
          })}
        </Box>
      </Box>

      {/* Message Input */}
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
              bgcolor: "primary.main",
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
    pl: 2,
    py: 1,
    pr: 0
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    mb: 1,
    pr: 2,
  },
  typography: {
    flexGrow: 1,
  },
  messagesBox: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    py: 2,
    mb: 1,
    wordBreak: "break-word",
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
