import { MuiStyles } from "@/utils/types/types";
import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export type MessageType = {
  user_id: string;
  message: string;
  sent_at: string;
};

type CProps = {
  msg: MessageType;
  index: number;
  array: MessageType[];
  userId: string;
};

export function CMessageBubble({msg, index, array, userId}: CProps) {
  const prev = index > 0 ? array[index - 1] : null;
  const isSameUser = msg.user_id === userId;
  const isFirstInGroup = prev?.user_id !== msg.user_id;

  return (
    <Box
      key={index}
      sx={{
        ...styles.box,
        flexDirection: isSameUser ? "row-reverse" : "row",
        alignSelf: isSameUser ? "flex-end" : "flex-start",
        maxWidth: "60%",
      }}
    >
      <Box
        component="span"
        sx={{
          ...styles.tail,
          borderLeft: isSameUser ? "10px solid transparent" : "none",
          borderRight: !isSameUser ? "10px solid transparent" : "none",
          borderTop: "10px solid",
          borderTopColor: isSameUser ? "primary.main" : grey[900],
          transform: isSameUser ? "rotate(-90deg)" : "rotate(90deg)",
          visibility: isFirstInGroup ? "visible" : "hidden"
        }}
      />
      <Paper
        sx={{
          ...styles.messagePaper,
          bgcolor: isSameUser ? "primary.main" : "",
          color: isSameUser ? "white" : "",
          mt: !isFirstInGroup ? -0.5 : 1,
          borderRadius: `${isSameUser ? "10px 0px" : "0px 10px"} 10px 10px`,
        }}
      >
        {isFirstInGroup ? !isSameUser && <small>{"@" + msg.user_id}</small> : null}
        <Typography variant="body1">{msg.message}</Typography>
      </Paper>
    </Box>
  );
}

const styles: MuiStyles = {
  box: {
    display: "flex",
  },
  messagePaper: {
    maxWidth: "fit-content",
    p: 1,
    my: 1,
  },
  tail: {
    width: 0,
    height: 0,
    mt: 1,
  },
};
