"use client";

import { selectYearOptions } from "@/app/const";
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
      onChange={(e) => handleChange(parseInt(e.target.value))}
    >
      {selectYearOptions.map((v) => (
        <MenuItem key={v} value={v}>
          {v}
        </MenuItem>
      ))}
      {/* <MenuItem value={0}>自訂</MenuItem> */}
    </Select>
  );
};

export default YearSelect;
