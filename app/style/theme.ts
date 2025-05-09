import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#e3e3e3",
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiTableRow-root:nth-of-type(odd)": {
            backgroundColor: theme.palette.secondary.main,
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f0f0",
          borderRadius: 4,
          padding: '4px 12px',
        },
      },
    },
  },
});

export default theme;
