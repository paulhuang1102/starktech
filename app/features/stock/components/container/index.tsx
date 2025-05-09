"use client";

import { timestampToDateString } from "@/app/utils/formater";
import { useState } from "react";
import useStock from "../../hook/use-stock";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import YearSelect from "@/app/components/year-select";
import RevenueChart from "@/app/features/chart/components/revenue-chart";
import PerformanceTable from "../performance-table";
import { DEFAULT_YEARS } from "@/app/const";

interface IProps {
  id: string;
}

const StockContainer: React.FC<IProps> = ({ id }) => {
  const now = new Date();
  const yearsBefore = new Date();

  yearsBefore.setFullYear(now.getFullYear() - DEFAULT_YEARS);

  const [startDate, setStartDate] = useState(
    timestampToDateString(yearsBefore.getTime())
  );
  const [years, setYears] = useState(5);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [endDate, setEndDate] = useState(timestampToDateString(now.getTime()));

  const { data, isLoading, error } = useStock({
    id,
    start: startDate,
    end: endDate,
  });

  const handleDateRangeChange = (v: number) => {
    if (v === 0) {
      return;
    }

    const yearsBefore = new Date();

    yearsBefore.setFullYear(now.getFullYear() - v);
    setStartDate(timestampToDateString(yearsBefore.getTime()));
    setYears(v);
  };

  if (error) {
    return (
      <Container>
        <h2>{error.message}</h2>
      </Container>
    );
  }

  return (
    <Container>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="contained">每月營收</Button>

        <YearSelect
          year={years}
          handleChange={handleDateRangeChange}
        ></YearSelect>
      </Stack>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        {isLoading ? <CircularProgress /> : <RevenueChart stockData={data} />}
      </Box>

      <Grid>
        <Stack direction="row" sx={{ padding: "1rem 0" }}>
          <Button variant="contained">詳細數據</Button>
        </Stack>

        <Box sx={{ textAlign: "center" }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <PerformanceTable stocks={data} />
          )}
        </Box>
      </Grid>
    </Container>
  );
};

export default StockContainer;
