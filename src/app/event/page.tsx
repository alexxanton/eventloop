"use client";
import { CDateRangePicker } from "@/components/CDateRangePicker";
import { useState } from "react";

export default function Event() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <CDateRangePicker value={value} onChange={(newValue) => {setValue(newValue)}} />
  );
}
