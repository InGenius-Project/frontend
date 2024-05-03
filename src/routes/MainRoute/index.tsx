import Footer from '@/components/Footer';
import { getUserApi } from '@/features/api/user/getUser';
import { selectConn, setGroupId } from '@/features/message/messageSlice';
import { useAppDispatch, useAppSelector } from '@/features/store';
import ChatReceiveMethod from '@/types/enums/ChatReceiveMethod';
import { IChatGroupInfo } from '@/types/interfaces/IChat';
import { Box, CssBaseline } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';

export default function MainRoute() {
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
          }}
        >
          <Outlet />
        </Box>
      </AnimatePresence>

      <Footer />
    </Box>
  );
}
