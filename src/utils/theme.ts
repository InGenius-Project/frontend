import { createTheme } from "@mui/material";
import color from "./constants/colors/color";

const theme = createTheme({
  palette: {
    primary: {
      main: color.orange.default,
      contrastText: color.white
    }
  }
})

export default theme;