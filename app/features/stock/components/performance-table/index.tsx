import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";


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

const PerformanceTable = () => {
  return (
    <Stack>
      <TableLeft />

      <TableContainer>

        
      </TableContainer>
    </Stack>
  );
};

export default PerformanceTable;
