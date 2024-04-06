import { MessageChannelItem } from '@/components/Message';
import MessageModel from '@/components/Message/MessageModel';
import { Box, Button, Paper, Stack, useMediaQuery, useTheme } from '@mui/material';

function Message() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

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
        <MessageChannelItem />
      </Stack>
      <Box
        sx={{
          flex: '1 1 auto',
        }}
      >
        <MessageModel />
      </Box>
    </Paper>
  );
}

export default Message;
