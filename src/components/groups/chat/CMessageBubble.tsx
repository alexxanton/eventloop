import { Message, MuiStyles } from "@/utils/types/types";
import { Avatar, Box, Paper, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

type CProps = {
  msg: Message;
  index: number;
  array: Message[];
  userId: string;
};

const currentUserBorderRadius = "10px 0px 10px 10px";
const otherUserBorderRadius = "0px 10px 10px 10px";
const defaultBorderRadius = "10px 10px 10px 10px";

export function CMessageBubble({msg, index, array, userId}: CProps) {
  const theme = useTheme();
  const prev = index > 0 ? array[index - 1] : null;
  const isCurrentUser = msg.user_id === userId;
  const isSameDate = msg.sent_at.split("T")[0] === prev?.sent_at.split("T")[0];
  const isFirstInGroup = msg.user_id !== prev?.user_id || !isSameDate;
  
  const tailBorder = isCurrentUser ? currentUserBorderRadius : otherUserBorderRadius;
  const borderRadius = isFirstInGroup ? tailBorder : defaultBorderRadius;
  const otherUserTailColor = theme.palette.mode === "dark" ? grey[900] : "background.paper";

  return (
    <Box sx={styles.box}>
      {!isSameDate && (
        <Box display="flex" flexDirection="column">
          <Paper sx={styles.date}>
            <Typography variant="caption">
              {new Date(msg.sent_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          </Paper>
        </Box>
      )}
      <Box
        key={index}
        sx={{
          ...styles.box,
          flexDirection: isCurrentUser ? "row-reverse" : "row",
          alignSelf: isCurrentUser ? "flex-end" : "flex-start",
          maxWidth: "70%",
        }}
      >
        <Avatar
          sx={{
            visibility: isFirstInGroup && !isCurrentUser ? "visible" : "hidden",
            mt: 1
          }}
          src={msg.profile?.avatar}
        />
        <Box
          component="span"
          sx={{
            ...styles.tail,
            borderLeft: isCurrentUser ? "10px solid transparent" : "none",
            borderRight: !isCurrentUser ? "10px solid transparent" : "none",
            borderTop: "10px solid",
            borderTopColor: isCurrentUser ? "primary.main" : otherUserTailColor,
            transform: isCurrentUser ? "rotate(-90deg)" : "rotate(90deg)",
            visibility: isFirstInGroup ? "visible" : "hidden",
            filter: "drop-shadow(-6px 2px 8px rgba(0, 0, 0, 0.3))",
          }}
        />
        <Paper
          sx={{
            ...styles.messagePaper,
            bgcolor: isCurrentUser ? "primary.main" : "",
            color: isCurrentUser ? "white" : "",
            mt: !isFirstInGroup ? 0.35 : 1,
            borderRadius: borderRadius,
          }}
        >
          {isFirstInGroup && !isCurrentUser && <small>{"@" + msg.profile?.username}</small>}
          <Box display="flex" gap={1}>
            <Typography marginBlockEnd={1} variant="body1">{msg.message}</Typography>
            <Box sx={styles.time}>
              <Typography
                component="small"
                variant="caption"
                sx={{ position: "relative", top: "5px" }}
              >
                {msg.sent_at.split("T")[1].split(":").slice(0, 2).join(":")}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

const styles: MuiStyles = {
  box: {
    display: "flex",
    flexDirection: "column"
  },
  messagePaper: {
    maxWidth: "fit-content",
    p: 1,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
    // height: "fit-content",
    // zIndex: 1000,
    // "& MuiTypography-root MuiTypography-body1": {}
  },
  tail: {
    width: 0,
    height: 0,
    mt: 1,
  },
  date: {
    width: "fit-content",
    px: 1,
    alignSelf: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
  },
  time: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: "fit-content",
    textAlign: "right",
    justifyContent: "flex-end",
  },
};
