import React from "react";
import ReactDOM from "react-dom/client";
import "assets/css/global.css";
import router from "./routes/router";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "./assets/theme/theme";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <CssVarsProvider theme={theme}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </CssVarsProvider>
);
