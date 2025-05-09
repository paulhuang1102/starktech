import { Box, Container } from "@mui/material";
import StockContainer from "./features/stock/components/container";
import { fetchStockById } from "./api/stock";
import { DEFAULT_ID } from "./const";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = ((await searchParams).id ?? DEFAULT_ID) as string;

  const res = await fetchStockById(id);

  if (!res.success) {
    return (
      <Box>
        <Container>
          <h2>Stock not found</h2>
        </Container>
      </Box>
    );
  }

  const { data } = res;

  if (!data) {
    return (
      <Box>
        <Container>
          <h2>Stock not found</h2>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      <Container>
        <Box>
          <Container>
            <h2>
              {data.stock_name}
              <span>({data.stock_id})</span>
            </h2>
          </Container>
        </Box>

        <Box>
          <StockContainer id={id} />
        </Box>
      </Container>
    </Box>
  );
}
