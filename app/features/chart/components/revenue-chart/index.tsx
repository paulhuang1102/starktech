"use client";

import { Paper } from "@mui/material";
import {
  LinePlot,
  BarPlot,
  ChartContainer,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
} from "@mui/x-charts";

import data from "../../../../data";

const RevenueChart = () => {

  return (
    <Paper sx={{ margin: 1, height: 300 }} elevation={3}>
      <ChartContainer
        series={[
          {
            type: "bar",
            data: data.map((d) => d.revenue),
          },
          {
            type: "line",
            data: [4, 3, 1, 3, 4],
            
          },
          
        ]}
        xAxis={[
          {
            data: data.map((d) => d.date),
            scaleType: "band",
            id: "x-axis-id",
            // height: 45,
          },
        ]}
      >
        <BarPlot />
        <LinePlot/>
        <ChartsXAxis />
        <ChartsYAxis />

        <ChartsTooltip trigger="axis" />
      </ChartContainer>

    </Paper>
  );
};

export default RevenueChart;
