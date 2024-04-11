import { MessageChannelItem } from '@/components/Message';
import MessageModel from '@/components/Message/MessageModel';
import { Box, Button, Paper, Stack, useMediaQuery, useTheme } from '@mui/material';
import SmartToy from '@mui/icons-material/SmartToy';
import { useState } from 'react';

function Message() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const [lastMessage, setLastMessage] = useState('');

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
