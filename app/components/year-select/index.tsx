'use client';

import { MenuItem, Select } from "@mui/material";

interface IProps {
  year: number;
  handleChange: (v: number) => void;
}

const YearSelect: React.FC<IProps> = ({ year, handleChange }) => {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={year.toString()}
      label="Year"
      onChange={(e) => handleChange(parseInt(e.target.value))}
    >
      <MenuItem value={3}>3</MenuItem>
      <MenuItem value={5}>5</MenuItem>
      <MenuItem value={8}>8</MenuItem>
      <MenuItem value={0}>自訂</MenuItem>
    </Select>
  );
};

export default YearSelect;
