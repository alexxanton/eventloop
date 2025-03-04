import { useState } from "react";
import { PickerBase } from "mui-daterange-picker-plus/dist";
import type { DateRange } from "mui-daterange-picker-plus/dist";

export function CDateRangePicker() {
  const [dateRangeOnChange, setDateRangeOnChange] = useState<DateRange>({});
  const handleSetDateRangeOnChange = (dateRange: DateRange) => {
    setDateRangeOnChange(dateRange);
  };

  console.log("dateRangeOnChange", dateRangeOnChange);

  return (
    <PickerBase
      onChange={(range: DateRange) => handleSetDateRangeOnChange(range)}
    />
  );
}