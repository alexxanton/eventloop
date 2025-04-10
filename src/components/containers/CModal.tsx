import { useDarkMode } from "@/utils/hooks/useDarkMode";
import { MuiStyles } from "@/utils/types/types";
import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, ListItemButton, Modal, Paper, Typography, Zoom } from "@mui/material";
import React, { useState } from "react";

type CProps = {
  children: React.ReactElement;
  title: string;
  buttonType: "normal" | "icon" | "list";
  ButtonContent: React.ElementType;
};

export function CModal({ children, title, buttonType, ButtonContent }: CProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isDarkMode = useDarkMode();

  const buttonMap = {
    "normal": Button,
    "icon": IconButton,
    "list": ListItemButton,
  };

  const ButtonType: React.ElementType = buttonMap[buttonType];

  return (
    <>
      <ButtonType onClick={handleOpen}>
        <ButtonContent />
      </ButtonType>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="Event form"
        aria-describedby="Form to create events"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Zoom in={open}>
          <Paper sx={styles.box}>
            <Box sx={styles.header} bgcolor={isDarkMode ? "#383434" : "secondary.main"}>
              <Typography
                sx={styles.title}
                component="h5"
                variant="h5"
                color="#f8f4fc"
              >
                {title}
              </Typography>
              <IconButton sx={{ color: "white" }} onClick={handleClose}>
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
    width: "70%",
    maxWidth: 700,
    borderRadius: 2,
    boxShadow: 5,
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
    overflowY: "auto",
  },
};
