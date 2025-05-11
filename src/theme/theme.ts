import { createTheme } from "@mui/material";

let theme = createTheme({});

theme = createTheme({
  palette: {
    primary: {
      main: "#43B1AA",
      dark: "#358E89",
      light: "#71C7C2",
    },
    grey: {
      400: "#374151",
      600: "#666666",
      700: "#525F7E",
      900: "#101828",
    },
    error: {
      main: "#d32f2f",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 650,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          width: "100%",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // color: "#F04438 !important",
          marginLeft: 0,
          fontSize: "12px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
          "::before": { display: "none" },

          outline: "none",
          fontSize: "16px",

          [theme.breakpoints.up("sm")]: {
            fontSize: "12px",
          },
          color: "#101828",
          width: "100%",
          borderRadius: "12px !important",
          "& .MuiInputBase-inputMultiline": {
            paddingLeft: "14px",
          },
          "& input": {
            height: "10px",
          },
          overflow: "hidden",
          "& textarea": {
            overflow: "auto !important",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },

          "&.MuiInput-underline": {
            height: "22px",
            boxShadow: "none",
            "::after": { display: "none" },
            "&.Mui-focused:before": {
              display: "none",
            },
          },
          "& input[type='date']": {
            height: "22px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          height: "44px",
          borderRadius: "12px",
          fontSize: "12px",
          color:
            ownerState.variant === "outlined"
              ? "#43B1AA"
              : ownerState.variant === "contained"
              ? "#ffffff"
              : undefined,
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: "-4px",
          fontSize: "14px",
          [theme.breakpoints.up("sm")]: {
            fontSize: "12px",
          },
          "&.Mui-focused": {
            color: "#43B1AA",
            top: 0,
          },
          "&.MuiFormLabel-filled": {
            top: 0,
          },
          "&.MuiInputLabel-shrink": {
            top: 2,
          },
          "&.Mui-error": {
            color: "#d32f2f",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          display: "flex",
          padding: "0",
          alignItems: "center",
          paddingLeft: "14px",

          height: "44px",
          [theme.breakpoints.up("sm")]: {
            height: "42px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 6px -2px rgba(16, 24, 40, 0.08)",
          overflowY: "auto",
          scrollbarWidth: "none",
          borderRadius: "12px",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
          marginTop: 8,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          padding: "10px 12px",
          "&.Mui-selected": {
            backgroundColor: "#F9FAFB",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#F9FAFB",
          },
          "&:hover": {
            backgroundColor: "#F1F5F9",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: "none",
          padding: "20px 20px",

          [theme.breakpoints.up("xs")]: {
            width: "255px !important",
          },
          [theme.breakpoints.up("sm")]: {
            width: "235px !important",
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: "5px",

          ":active": {
            backgorund: "none",
          },
          ":hover": {
            color: "none",
          },
          "& .MuiPaper-root": {
            width: "100%",
          },
          "& .MuiAccordionSummary-content.MuiBox-root": {
            alignitems: "center",
          },
          "&:hover .MuiListItemIcon-root": {
            svg: {
              path: {
                fill: "#43B1AA",
              },
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          span: {
            fontSize: "14px",
          },
          ":hover": {
            color: "#43B1AA",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

export default theme;
