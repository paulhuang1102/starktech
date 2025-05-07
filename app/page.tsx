import { Box, Container, Grid, Stack } from "@mui/material";
import RevenueChart from "./features/chart/components/revenue-chart";
import PerformanceTable from "./features/stock/components/performance-table";
import StockContainer from "./features/stock/components/container";
// import { fetchStockMonthRevenue } from "./api/stock";

const DEFAULT_YEAR = 5;

export default async function Home() {
  // const a = await fetchStockById("2867");
  // const a = await fetchStockMonthRevenue({ id: "2867", start: "2024-01-01", end: "2025-06-01" });
  return (
    <Box>
      <Container>
        <Stack>
          <h2>
            三商壽
            <span>(2867)</span>
          </h2>
        </Stack>

        <Box>
          <StockContainer />
        </Box>
        <Box>
          <Grid>
            <RevenueChart />
          </Grid>
        </Box>

        <Grid>
          <Stack>詳細數據</Stack>

          <PerformanceTable />
        </Grid>
      </Container>
    </Box>
  );
}
