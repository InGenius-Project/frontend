import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

let theme = extendTheme({
  cssVarPrefix: "ing",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#874983",
        },
        secondary: {
          main: "#00C9C8",
        },
        common: {
          background: "#fcebfb",
        },
        text: {
          primary: "#404040",
        },
      },
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "Noto Sans TC",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "3.5rem",
      fontWeight: "default",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "1.3rem",
      fontWeight: "bold",
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "laptop",
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          fontWeight: t.typography.fontWeightBold,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: () => ({
          borderRadius: 50,
        }),
      },
      defaultProps: {
        variant: "contained",
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          color: theme.vars.palette.text.primary,
        }),
      },
    },
  },
});

export default theme;
