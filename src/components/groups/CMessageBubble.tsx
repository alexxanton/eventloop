import { purple } from "@/utils/constants/purple";
import { MuiStyles } from "@/utils/types/types";
import { Box, Paper, Typography } from "@mui/material";

export type MessageType = {
  sender: string;
  text: string;
};

type CProps = {
  msg: MessageType;
  index: number;
  array: MessageType[];
};

export function CMessageBubble({msg, index, array}: CProps) {
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
}

const styles: MuiStyles = {
  messagePaper: {
    maxWidth: "fit-content",
    p: 1,
    m: 1,
  },
};
