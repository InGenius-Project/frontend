import React from "react";
import ReactDOM from "react-dom/client";
import "assets/css/global.css";
import browserRouter from "./routes/router";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "./assets/theme/theme";
import { RouterProvider } from "react-router-dom";
import { ConfirmProvider } from "material-ui-confirm";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "features/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <CssVarsProvider theme={theme}>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <ConfirmProvider>
          <RouterProvider router={browserRouter} />
        </ConfirmProvider>
      </ReduxProvider>
    </React.StrictMode>
  </CssVarsProvider>
);
