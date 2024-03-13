import { zhTW } from '@mui/material/locale';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
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
    white: Palette['primary'];
  }

  interface PaletteOptions {
    white?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

let theme = extendTheme(
  {
    cssVarPrefix: 'ing',
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#874983',
            lighter: '#F2F0FE',
          },
          secondary: {
            main: '#00C9C8',
          },
          common: {
            background: '#fcebfb',
          },
          info: {
            main: '#808080',
          },
          text: {
            primary: '#404040',
          },
          white: {
            main: '#FFFFFF',
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
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'Noto Sans TC',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: 'laptop',
        },
      },
      MuiDialog: {
        defaultProps: {
          maxWidth: 'laptop',
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
          variant: 'contained',
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme: t }) => ({
            borderRadius: '0.5em',
          }),
        },
      },
    },
  },
  zhTW,
);

theme.typography = {
  ...theme.typography,
  h1: {
    fontWeight: 'bold',
    fontSize: '2rem', // Default font size for mobile
    color: theme.colorSchemes.light.palette.text.primary,

    [theme.breakpoints.up('tablet')]: {
      fontSize: '2.5rem', // Adjust font size for tablet
    },
    [theme.breakpoints.up('laptop')]: {
      fontSize: '3rem', // Adjust font size for laptop
    },
    [theme.breakpoints.up('desktop')]: {
      fontSize: '3.5rem', // Adjust font size for desktop
    },
  },
  h2: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: theme.colorSchemes.light.palette.text.primary,
    [theme.breakpoints.up('tablet')]: {
      fontSize: '2.2rem',
    },
    [theme.breakpoints.up('laptop')]: {
      fontSize: '2.5rem',
    },
    [theme.breakpoints.up('desktop')]: {
      fontSize: '3rem',
    },
  },
  h3: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: theme.colorSchemes.light.palette.text.primary,
    [theme.breakpoints.up('tablet')]: {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.up('laptop')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.up('desktop')]: {
      fontSize: '2.5rem',
    },
  },
  h4: {
    fontSize: '1.4rem',
    color: theme.colorSchemes.light.palette.text.primary,
    [theme.breakpoints.up('tablet')]: {
      fontSize: '1.6rem',
    },
    [theme.breakpoints.up('laptop')]: {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.up('desktop')]: {
      fontSize: '2rem',
    },
  },
  h5: {
    fontSize: '1.2rem',
    color: theme.colorSchemes.light.palette.text.primary,
    [theme.breakpoints.up('tablet')]: {
      fontSize: '1.4rem',
    },
    [theme.breakpoints.up('laptop')]: {
      fontSize: '1.6rem',
    },
    [theme.breakpoints.up('desktop')]: {
      fontSize: '1.8rem',
    },
  },
  h6: {
    fontSize: '1rem',
    color: theme.colorSchemes.light.palette.text.primary,
    [theme.breakpoints.up('tablet')]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('laptop')]: {
      fontSize: '1.4rem',
    },
    [theme.breakpoints.up('desktop')]: {
      fontSize: '1.6rem',
    },
  },
  subtitle1: {
    fontSize: '1rem',
    color: theme.colorSchemes.light.palette.text.primary,
    fontWeight: '600',
    [theme.breakpoints.up('tablet')]: {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('laptop')]: {
      fontSize: '1.4rem',
    },
    [theme.breakpoints.up('desktop')]: {
      fontSize: '1.6rem',
    },
  },

  body1: {
    color: theme.colorSchemes.light.palette.text.primary,
  },
  body2: {
    color: theme.colorSchemes.light.palette.text.secondary,
  },
  caption: {
    fontSize: '0.8rem',
    color: theme.colorSchemes.light.palette.text.secondary,
  },
};

export default theme;
