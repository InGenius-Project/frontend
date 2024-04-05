import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate, useLocation } from 'react-router-dom';
import ErrorSvg from '@/assets/images/svg/error.svg?react';
import ErrorSvgBackground from '@/assets/images/svg/errorBackground.svg?react';
import Header from '../Header';
import Footer from '../Footer';

function generateErrorMessage(errorCode: number | undefined): string {
  if (errorCode === 404) {
    return '此頁面不存在';
  }

  if (errorCode === 401) {
    return '你沒有權限閱讀此頁';
  }
  if (errorCode === 400) {
    return '錯誤請求';
  }

  if (errorCode === 503 || errorCode === 500) {
    return '伺服器錯誤';
  }

  if (errorCode === 418) {
    return '🫖';
  }
  return '似乎發生一些未預期的錯誤';
}

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
export function throwError(message: string, status: number) {
  throw new CustomError(message, status);
}

function ErrorBoundary() {
  const navigate = useNavigate();
  const location = useLocation();

  const error = useRouteError() as any;
  const [errorTitle, setErrorTitle] = useState<string>('Oops!');
  const [errorMessage, setErrorMessage] = useState<string>('似乎發生一些未預期的錯誤');
  const [errorDetail, setErrorDetail] = useState<string>();
  const [errorCode, setErrorCode] = useState<number>();
  const from = ((location.state as any)?.from.pathname as string) || '';

  useEffect(() => {
    if (error instanceof CustomError) {
      /** Custom Error */
      setErrorTitle(error.message);
      setErrorMessage(generateErrorMessage(error.status));
      setErrorCode(error.status);
    } else if (isRouteErrorResponse(error)) {
      /** react-router-dom: erro */
      setErrorTitle(error.statusText || error.data);
      setErrorMessage(generateErrorMessage(error.status));
      setErrorCode(error.status);
      setErrorDetail('React router dom error');
    }

    // show in console
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        maxWidth: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexFlow: 'column',
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          minHeight: 'calc(100vh - var(--ing-height-navbar))',
          justifyContent: 'center',
        }}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Typography variant="h3">{errorTitle}</Typography>

          <Typography variant="body1">
            {errorCode}: {errorMessage}
          </Typography>
          <ErrorSvg
            style={{
              height: '40%',
              objectFit: 'contain',
            }}
          />
          {errorDetail && import.meta.env.VITE_APP_ENV === 'development' && (
            <div className="error__detail">{errorDetail && errorDetail}</div>
          )}
          <Stack
            spacing={1}
            direction="row"
            sx={{
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={() => {
                navigate(from, {
                  replace: true,
                });
              }}
            >
              按此返回上一頁
            </Button>
            <Button color="white">問題回報</Button>
          </Stack>
        </Stack>
      </Box>

      <Footer />
      <ErrorSvgBackground
        style={{
          zIndex: -1,
          position: 'absolute',
          paddingLeft: '30%',
          top: 'calc(var(--ing-height-user-header) + 2em)',
        }}
      />
    </Box>
  );
}

export default ErrorBoundary;
