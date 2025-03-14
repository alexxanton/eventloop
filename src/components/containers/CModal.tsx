import { purple } from "@/utils/constants/purple";
import { MuiStyles } from "@/utils/types/types";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Paper, SvgIconTypeMap, Typography, Zoom } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { useState } from "react";

type CProps = {
  children: React.ReactElement;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};

export function CModal({ children, title, icon }: CProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        {React.createElement(icon)}
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
            <Box sx={styles.header}>
              <Typography
                sx={styles.title}
                component="h6"
                variant="h6"
                color="#f8f4fc"
              >
                {title}
              </Typography>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
            <Box sx={{ overflowY: "auto" }}>
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
    bgcolor: purple,
    alignItems: "center"
  },
  title: {
    flexGrow: 1,
  },
  box: {
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 5,
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
    overflow: "auto",
  },
};
