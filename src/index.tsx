import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/assets/css/global.css';
import '@/assets/css/editor.css';
import router from './routes/router';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from './assets/theme/muiTheme';
import { RouterProvider } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/features/store';

async function enableMocking() {
  if (import.meta.env.VITE_APP_NODE_ENV !== 'development') {
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
