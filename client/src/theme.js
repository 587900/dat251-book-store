import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";


export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        black: {
          1: "#353535",
          2: "#161717",
        },

        brown: {
          //100: "#0d1b2c",
          //200: "#1a3758",
          //300: "#275285",
          //400: "#346eb1",
          1: "#BC6F03",
          2: "#874000",
          3: "#4C231A",
          //600: "#67a1e4",
          //700: "#8cb8e8",
          //800: "#b3d0f1",
          //900: "#d9e7f8",
        },
      }
    : {
        white: {
          1: "#FFFFFF",
          3: "#F8F7F7",
          2: "#f5f5f5",
        },

        brown: {
          1: "#BC6F03",
          2: "#874000",
          3: "#4C231A",
        },

        pink: {
          1: "#D0AA3A",
          2: "#DFCB90",
        },

        red: {
          1: "#F50057"
        },

        black: {
          1: "#1B1B1B",
        }

      }),
});



export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.brown[3] + " !important",
              white: colors.white[2] + " !important",
            },
            secondary: {
              main: colors.brown[1],
            },
            tertiary: {
              main: colors.white[2],
            },
            text: {
              primary: "#fff",
            },
            background: {
              // background colors arent being properly overwritten so
              // so I added !important
              default: colors.black[1] + " !important",
              paper: colors.black[2] + " !important",
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.brown[1],
              dark: colors.brown[3],
            },
            secondary: {
              main: colors.red[1],
              light: colors.brown[1],
              dark: colors.pink[1],
            },
            tertiary: {
              main: colors.brown[2],
            },
            text: {
              primary: colors.black[1],
              secondary: colors.brown[2],
              light: colors.brown[1],
            },
            background: {
              default: colors.white[2],
              paper: colors.white[1],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "monospace"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["montserrat", "monospace"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["montserrat", "monospace"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["montserrat", "monospace"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["montserrat", "monospace"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["montserrat", "monospace"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["montserrat", "monospace"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "#2879AA25", // Change this to your desired color
            },
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 360,
        sm: 430,
        md: 768,
        lg: 1280,
        xl: 1920,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};