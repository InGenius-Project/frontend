import '@/assets/css/editor.css';
import '@/assets/css/global.css';
import { store } from '@/features/store';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import theme from './assets/theme/muiTheme';
import router from './routes/router';

async function enableMocking() {
  if (import.meta.env.VITE_APP_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./tests/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <CssVarsProvider theme={theme}>
      <React.StrictMode>
        <ReduxProvider store={store}>
          <ConfirmProvider>
            <RouterProvider router={router} />
          </ConfirmProvider>
        </ReduxProvider>
      </React.StrictMode>
    </CssVarsProvider>,
  );
});
