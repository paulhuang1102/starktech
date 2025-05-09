"use client";

import React, { useState, useRef } from "react";
import { Autocomplete, TextField, Box, Container } from "@mui/material";
import { endpoint } from "@/app/const";
import { StockInfo } from "@/app/types";
import { useRouter } from "next/navigation";

interface Option {
  id: string | number;
  label: string;
  category: string;
}

const SearchInput: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { push } = useRouter();

  const handleInputChange = (_: React.SyntheticEvent, value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!value.trim()) {
      setOptions([]);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      await fetchOptions(value);
    }, 500);
  };

  const fetchOptions = async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${endpoint}?dataset=TaiwanStockInfo&token=${process.env.NEXT_PUBLIC_FINMIND_API_TOKEN}`
      );

      const json = await res.json();

      const { data } = json as { data: StockInfo[] };

      const result = data
        .filter((option) => option.stock_id.startsWith(query))
        .slice(0, 10)
        .sort((a, b) => a.industry_category.localeCompare(b.industry_category))
        .map(
          (option): Option => ({
            id: option.stock_id,
            label: `${option.stock_id} ${option.stock_name}`,
            category: option.industry_category,
          })
        );

      setOptions(result);
    } catch (error) {
      setOptions([]);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Container>
        <Autocomplete
          freeSolo
          options={options}
          loading={loading}
          groupBy={(option) => option.category}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              placeholder="輸入台股代號，查看公司價值"
              error={error !== null}
              helperText={error?.message}
              {...params}
              variant="standard"
            />
          )}
          onChange={(_, value) => {
            if (value) {
              push(`/?id=${(value as Option).id}`);
            }
          }}
        />
      </Container>
    </Box>
  );
};

export default SearchInput;
