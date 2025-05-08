"use client";

import { StockMeta } from "@/app/types";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useEffect, useRef } from "react";

const TableLeft = () => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>年度月份</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>每月營收</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>單月營收年增率(%)</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

interface IProps {
  stocks: StockMeta[];
}

const PerformanceTable: React.FC<IProps> = ({ stocks }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [stocks]);

  return (
    <Grid container>
      <Grid size={3}>
        <TableLeft />
      </Grid>

      <Grid size={9}>
        <TableContainer ref={scrollRef}>
          <Table>
            <TableBody>
              <TableRow>
                {stocks.map((s) => (
                  <TableCell key={s.date}>
                    {s.revenue_year}/{s.revenue_month}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                {stocks.map((s) => (
                  <TableCell key={s.date}>{s.revenue}</TableCell>
                ))}
              </TableRow>

              <TableRow>
                {stocks.map((s) => (
                  <TableCell key={s.date}>{s.MoM}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default PerformanceTable;
