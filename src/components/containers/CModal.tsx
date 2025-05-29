import { MuiStyles } from "@/utils/types/types";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, ListItemButton, Modal, Paper, Typography, useTheme, Zoom } from "@mui/material";

type CProps = {
  children: React.ReactElement;
  title: string;
  buttonType: "normal" | "icon" | "list";
  ButtonContent: React.ElementType;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function CModal({ children, title, buttonType, ButtonContent, open, onOpen, onClose }: CProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = theme.breakpoints.down("sm");

  const buttonMap = {
    normal: Button,
    icon: IconButton,
    list: ListItemButton,
  };

  const ButtonType: React.ElementType = buttonMap[buttonType];

  return (
    <>
      <ButtonType onClick={onOpen}>
        <ButtonContent />
      </ButtonType>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        aria-labelledby="reusable-modal"
        aria-describedby="skeleton-for-reusable-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Zoom in={open}>
          <Paper sx={{...styles.box, width: isMobile ? "100%" : "70%"}}>
            <Box sx={styles.header} bgcolor={isDarkMode ? "#383434" : "secondary.main"}>
              <Typography sx={styles.title} component="h5" variant="h5" color="#f8f4fc">
                {title}
              </Typography>
              <IconButton sx={{ color: "white" }} onClick={onClose}>
                <Close />
              </IconButton>
            </Box>
            <Box sx={{ overflowY: "hidden" }}>
              {children}
            </Box>
          </Paper>
        </Zoom>
      </Modal>
    </>
  );
}

const styles: MuiStyles = {
  header: {
    px: 2,
    py: 1,
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  title: {
    flexGrow: 1,
  },
  box: {
    maxWidth: 700,
    borderRadius: 2,
    boxShadow: 5,
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
    overflowY: "auto",
  },
};
