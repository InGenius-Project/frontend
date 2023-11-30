import React, { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { setupStore, type AppStore, type RootState } from "features/store";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routes } from "routes/router";
import userEvent from "@testing-library/user-event";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  route?: string;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    route = "/",
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const router = createMemoryRouter(routes, { initialEntries: ["/"] });

  window.history.pushState({}, "Test page", route);

  const Wrapper = () => {
    return (
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    );
  };

  // Return an object with the store and all of RTL's query functions
  return {
    user: userEvent.setup(),
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
