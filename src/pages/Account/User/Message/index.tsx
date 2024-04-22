import { MessageChannelItem } from '@/components/Message';
import MessageModel from '@/components/Message/MessageModel';
import { useGetUserConnectionQuery } from '@/features/api/user/getUserConnection';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import SmartToy from '@mui/icons-material/SmartToy';
import { Box, Button, Paper, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { IConnection } from './../../../../types/interfaces/IUser';

function Message() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const [lastMessage, setLastMessage] = useState('');
  const { data: connectionData } = useGetUserConnectionQuery(null);

  const handleClickChannelItem = async (conn: IConnection | undefined) => {
    const c = new HubConnectionBuilder()
      .withUrl('http://localhost:5230/Chat', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => localStorage.getItem('accessToken') || '',
      })
      .configureLogging(LogLevel.Information)
      .build();

    c.on('ReceiveMessage', (msg) => {
      console.log(msg);
    });

    await c.start();
    await c.invoke('JoinGroup', conn?.GroupName); //TODO: GroupName unique

    await c.start();
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        direction: 'row',
        height: '100%',
        gap: 2,
      }}
    >
      <Stack
        sx={{
          py: !isMobile ? 2 : 1,
        }}
      >
        {!isMobile && (
          <Stack spacing={1} direction={'row'} sx={{ pb: 1, px: 1 }}>
            <Button>未讀</Button>
            <Button variant="outlined">所有</Button>
          </Stack>
        )}
        <MessageChannelItem userName="InG AI" message={lastMessage} avatar={<SmartToy />} />
        {connectionData?.result?.map((c) => {
          return (
            <MessageChannelItem
              userName={c.GroupName}
              message={lastMessage}
              onClick={handleClickChannelItem}
              key={c.ConnectionId}
              connection={c}
            />
          );
        })}
      </Stack>
      <Box
        sx={{
          flex: '1 1 auto',
        }}
      >
        <MessageModel onChangeMessage={(message) => setLastMessage(message)} />
      </Box>
    </Paper>
  );
}

export default Message;
