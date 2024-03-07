import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { zhTW } from "@mui/material/locale";

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

  interface PaletteColor {
    lighter?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
  }
  interface Palette {
    white: Palette["primary"];
  }

  interface PaletteOptions {
    white?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

let theme = extendTheme(
  {
    cssVarPrefix: "ing",
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: "#874983",
            lighter: "#F2F0FE",
          },
          secondary: {
            main: "#00C9C8",
          },
          common: {
            background: "#fcebfb",
          },
          info: {
            main: "#808080",
          },
          text: {
            primary: "#404040",
          },
          white: {
            main: "#FFFFFF",
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
      MuiDialog: {
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
            color: t.vars.palette.text.primary,
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme: t }) => ({
            borderRadius: "0.5em",
          }),
        },
      },
    },
  },
  zhTW
);

export default theme;
