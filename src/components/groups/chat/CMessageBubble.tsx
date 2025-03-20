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

const currentUserBorderRadius = "10px 0px 10px 10px";
const otherUserBorderRadius = "0px 10px 10px 10px";
const defaultBorderRadius = "10px 10px 10px 10px";

export function CMessageBubble({msg, index, array, userId}: CProps) {
  const prev = index > 0 ? array[index - 1] : null;
  const isCurrentUser = msg.user_id === userId;
  const isFirstInGroup = prev?.user_id !== msg.user_id;
  const tailBorder = isCurrentUser ? currentUserBorderRadius : otherUserBorderRadius;
  const borderRadius = isFirstInGroup ? tailBorder : defaultBorderRadius;

  return (
    <Box
      key={index}
      sx={{
        ...styles.box,
        flexDirection: isCurrentUser ? "row-reverse" : "row",
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
        maxWidth: "60%",
      }}
    >
      <Box
        component="span"
        sx={{
          ...styles.tail,
          borderLeft: isCurrentUser ? "10px solid transparent" : "none",
          borderRight: !isCurrentUser ? "10px solid transparent" : "none",
          borderTop: "10px solid",
          borderTopColor: isCurrentUser ? "primary.main" : grey[900],
          transform: isCurrentUser ? "rotate(-90deg)" : "rotate(90deg)",
          visibility: isFirstInGroup ? "visible" : "hidden"
        }}
      />
      <Paper
        sx={{
          ...styles.messagePaper,
          bgcolor: isCurrentUser ? "primary.main" : "",
          color: isCurrentUser ? "white" : "",
          mt: !isFirstInGroup ? -0.7 : 1,
          borderRadius: borderRadius,
        }}
      >
        {isFirstInGroup ? !isCurrentUser && <small>{"@" + msg.user_id}</small> : null}
        <Box display="flex" gap={1}>
          <Typography variant="body1">{msg.message}</Typography>
          <Typography component="small" variant="caption">
            {msg.sent_at.split("T")[1].split(":").slice(0, 2).join(":")}
          </Typography>
        </Box>
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
