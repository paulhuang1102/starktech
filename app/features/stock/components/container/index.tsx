"use client";

import { timestampToDateString } from "@/app/utils/formater";
import { useState } from "react";
import useStock from "../../hook/use-stock";
import { Button, Stack } from "@mui/material";
import YearSelect from "@/app/components/year-select";

const StockContainer = () => {
  const now = new Date();
  const yearsBefore = new Date();

  // TODO: 5 should be from props
  yearsBefore.setFullYear(now.getFullYear() - 5);

  const [startDate, setStartDate] = useState(
    timestampToDateString(yearsBefore.getTime())
  );
  const [years, setYears] = useState(5);

  const [endDate, setEndDate] = useState(timestampToDateString(now.getTime()));

  const { data, isLoading, error } = useStock({
    id: "2867",
    start: startDate,
    end: endDate,
  });

  console.log(data, isLoading, error);

  const handleDateRangeChange = (v: number) => {
    if (v === 0) {
      return;
    }

    const yearsBefore = new Date();

    yearsBefore.setFullYear(now.getFullYear() - v);
    setStartDate(timestampToDateString(yearsBefore.getTime()));
    setYears(v);
  };

  return (
    <Stack>
      <Button>每月營收</Button>

      <YearSelect
        year={years}
        handleChange={handleDateRangeChange}
      ></YearSelect>
    </Stack>
  );
};

export default StockContainer;
