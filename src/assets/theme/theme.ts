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
  interface Shape {
    height: string | number;
  }
}

let theme = extendTheme({
  cssVarPrefix: "lng",
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
    h2: {
      fontWeight: "bold",
    },
    h3: {
      fontWeight: "default",
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
          color: theme.vars.palette.text.secondary,
          textDecorationColor: theme.vars.palette.text.secondary,
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
  },
});

export default theme;
