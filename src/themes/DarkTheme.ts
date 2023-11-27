import { createTheme } from "@mui/material";
import { blue, green } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[700],
      light: blue[500],
      dark: blue[900],
      contrastText: "#ffffff",
    },
    background: {
      default: "#303134",
      paper: "#202124",
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});
