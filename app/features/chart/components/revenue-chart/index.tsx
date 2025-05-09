"use client";

import { StockMeta } from "@/app/types";
import { Paper } from "@mui/material";
import * as echarts from "echarts";
import { useCallback, useEffect, useRef } from "react";
type EChartsOption = echarts.EChartsOption;

interface IProps {
  stockData: StockMeta[];
}

const RevenueChart: React.FC<IProps> = ({ stockData }) => {
  const chartRef = useRef<echarts.ECharts>(null);

  const draw = useCallback(() => {
    let preYear: string | null = null;

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        textStyle: {
          align: "left",
        },
      },
      xAxis: [
        {
          data: stockData.map(
            (d) =>
              `${d.revenue_year}/${d.revenue_month.toString().padStart(2, "0")}`
          ),
          axisLabel: {
            // Merge years and avoid displaying duplicate years
            formatter: (value: string) => {
              const year = value.split("/")[0];
              if (!preYear || year !== preYear) {
                preYear = year;
                return year;
              }
              return "";
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "千元",
          position: "left",
          alignTicks: true,
          axisLine: {
            show: true,
            // lineStyle: {
            //   color: colors[2]
            // }
          },
          axisLabel: {
            formatter: (value: number) => `${(value / 1000).toLocaleString()}`,
          },
        },
        {
          type: "value",
          name: "%",
          position: "right",
          alignTicks: true,
          axisLine: {
            show: true,
            // lineStyle: {
            //   color: colors[2]
            // }
          },
          axisLabel: {
            formatter: "{value}",
          },
          boundaryGap: [0, "100%"],
        },
      ],

      series: [
        {
          name: "revenue",
          type: "bar",
          data: stockData.map((d) => d.revenue),
        },
        {
          name: "rate",
          type: "line",
          data: stockData.map((d) => d.MoM),
          yAxisIndex: 1,
        },
      ],
    };

    if (!chartRef.current) {
      // chartRef.current.dispose();
      chartRef.current = echarts.init(
        document.getElementById("chart-container")
      );
    }

    chartRef.current.setOption(option);
  }, [stockData]);

  const handleResize = () => {
    chartRef.current?.resize();
  };

  useEffect(() => {
    draw();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [draw]);

  return (
    <Paper
      sx={{ margin: 1, height: 300 }}
      elevation={3}
      id="chart-container"
    ></Paper>
  );
};

export default RevenueChart;
