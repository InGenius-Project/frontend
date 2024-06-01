import Footer from '@/components/Footer';
import { getUserApi } from '@/features/api/user/getUser';
import { selectConn, setGroupId } from '@/features/message/messageSlice';
import { useAppDispatch, useAppSelector } from '@/features/store';
import ChatReceiveMethod from '@/types/enums/ChatReceiveMethod';
import { IChatGroupInfo } from '@/types/interfaces/IChat';
import { Box, CircularProgress, CssBaseline, Typography, useTheme } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';

export default function MainRoute() {
  const theme = useTheme();
  const firstRender = useRef(true);
  const conn = useAppSelector(selectConn);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!firstRender.current) return;
    const connect = async () => {
      await conn.stop();

      conn.on(ChatReceiveMethod.NewGroup, (groupInfo: IChatGroupInfo) => {
        dispatch(setGroupId(groupInfo.Id));
      });

      await conn.start();
    };
    connect();
    firstRender.current = false;
  }, [conn, dispatch]);

  const { isLoading, isFetching } = getUserApi.endpoints.getUser.useQuery(undefined, {
    skip: false,
  });

  // Scroll to top when route changes
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const loading = isLoading || isFetching;

  return (
    <Box
      sx={{
        maxWidth: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexFlow: 'column',
        flexGrow: 1,
        cursor: loading ? 'wait' : undefined,
      }}
    >
      <CssBaseline />
      <Header />

      <ToastContainer />

      <AnimatePresence mode="wait">
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            minHeight: 'calc(100vh - var(--ing-height-navbar))',
            justifyContent: 'center',
            py: 2,
          }}
        >
          <Outlet />
        </Box>
      </AnimatePresence>

      {loading && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.2)',
            width: '100%',
            height: '100%',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: theme.spacing(2),
          }}
        >
          <CircularProgress />
          <Typography color={'white'} variant="h6">
            載入中...
          </Typography>
        </Box>
      )}

      <Footer />
    </Box>
  );
}
