import { isDarkModeOn } from "@/utils/isDarkModeOn";
import { MuiStyles } from "@/utils/types/types";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Paper, Typography, Zoom } from "@mui/material";
import React, { useState } from "react";

type CProps = {
  children: React.ReactElement;
  title: string;
  Icon: React.ElementType;
};

export function CModal({ children, title, Icon }: CProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Icon />
      </IconButton>
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
            <Box sx={styles.header} bgcolor={isDarkModeOn() ? "#383434" : "secondary.main"}>
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
    width: 400,
    borderRadius: 2,
    boxShadow: 5,
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
    overflowY: "auto",
  },
};
