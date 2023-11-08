import { createTheme } from "@mui/material";
import color from "./constants/colors/color";

let theme = createTheme({
  palette: {
    primary: {
      main: color.orange.default,
      contrastText: color.white,
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: color.grey.darker,
          textDecorationColor: color.grey.light,
          fontWeight: theme.typography.fontWeightBold,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 50,
        }),
      },
    },
  },
});

export default theme;
