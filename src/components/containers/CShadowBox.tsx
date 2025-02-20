import * as React from 'react';
import { Box } from "@mui/material";

export default function CShadowBox({children}: {children: React.ReactNode}) {
  return (
    <Box sx={{
      borderRadius: 2,
      height: "fit-content",
      width: "fit-content",
      boxShadow: 5,
      margin: "auto",
    }}>
      {children}
    </Box>
  );
}
