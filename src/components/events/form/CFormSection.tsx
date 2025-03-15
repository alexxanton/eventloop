import { MuiStyles } from "@/utils/types/types";
import { Box, Typography, Icon } from "@mui/material";
import React from "react";

interface CProps {
  children: React.ReactNode;
  title: string;
  SectionIcon: React.ElementType;
};

export function CFormSection({children, title, SectionIcon}: CProps) {
  return (
    <Box>
      <Box sx={styles.title}>
        <Typography variant="h6" sx={styles.sectionTitle}>{title}</Typography>
        <Icon>
          <SectionIcon />
        </Icon>
      </Box>
      <Box sx={styles.section}>
        {children}
      </Box>
    </Box>
  );
}

const styles: MuiStyles = {
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mb: 1,
  },
  sectionTitle: {
    mb: 1,
    fontWeight: "bold",
  },
  title: {
    display: "flex",
    justifyContent: "space-between"
  },
};
