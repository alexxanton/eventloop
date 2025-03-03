import * as React from 'react';
import { Box, BoxProps } from "@mui/material";

export function CShadowBox({children, ...rest}: {children: React.ReactNode} & BoxProps) {
  return (
    <Box sx={{
      borderRadius: 2,
      height: "fit-content",
      width: "fit-content",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.51)",
      margin: "auto",
      ...rest
    }}>
      {children}
    </Box>
  );
}
