import theme from '@/assets/theme/muiTheme';
import { store } from '@/features/store';
import { routes } from '@/routes/router';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { RenderOptions, render } from '@testing-library/react';
import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider, createMemoryRouter, createRoutesFromElements } from 'react-router-dom';
const indexWrpper = () => {
  return (
    <CssVarsProvider theme={theme}>
      <React.StrictMode>
        <ReduxProvider store={store}>
          <ConfirmProvider>
            <RouterProvider router={createMemoryRouter(createRoutesFromElements(routes))} />
          </ConfirmProvider>
        </ReduxProvider>
      </React.StrictMode>
    </CssVarsProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {
    wrapper: indexWrpper,
    ...options,
  });

export { customRender as render };
