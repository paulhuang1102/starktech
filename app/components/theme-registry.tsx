'use client';

import { ThemeProvider } from "@mui/material";
import theme from "../style/theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
