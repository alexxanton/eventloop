"use client";
import { CDateRangePicker } from "@/components/calendars/CDateRangePicker";
import { CShadowBox } from "@/components/containers/CShadowBox";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Event() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <CShadowBox padding={1}>
      <CDateRangePicker value={value} onChange={(newValue) => {setValue(newValue)}} />
      <p>{value[0]?.toISOString()}</p>
      <p>{value[1]?.toISOString()}</p>
    </CShadowBox>
  );
}
