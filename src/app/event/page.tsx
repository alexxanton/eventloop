"use client";
import { CDateRangePicker } from "@/components/CDateRangePicker";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Event() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <Box padding={1} width="fit-content" borderRadius={2} boxShadow={5}>
      <CDateRangePicker value={value} onChange={(newValue) => {setValue(newValue)}} />
    </Box>
  );
}
