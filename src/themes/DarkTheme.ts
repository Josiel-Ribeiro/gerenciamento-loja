import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: orange[500],
      light: orange[400],
      dark: orange[700],
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
