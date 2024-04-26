import { MessageReceiveHandle } from '@/pages/Account/User/Message';
import { IChatGroupInfo, IChatMessage } from '@/types/interfaces/IChat';
import { Avatar, ButtonBase, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

type MessageChannelItemProps = {
  avatar?: React.ReactNode;
  message?: IChatMessage;
  chatGroupInfo?: IChatGroupInfo;
  onClick?: (c: IChatGroupInfo | undefined) => void;
};

const MessageChannelItem = forwardRef<MessageReceiveHandle, MessageChannelItemProps>(
  ({ avatar, message, chatGroupInfo, onClick }, ref) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
    const [lastMessage, setLastMessage] = useState(message);
    const [lastMessageTime, setLastMessageTime] = useState<string>('');

    useImperativeHandle(ref, () => ({
      onReceiveMessage: (message: IChatMessage) => {
        setLastMessage(message);
      },
    }));

    useEffect(() => {
      const interval = setInterval(() => {
        setLastMessageTime((prevMessage) => {
          if (lastMessage) {
            return getTimeDifference(new Date(lastMessage.SendTime));
          }
          return prevMessage;
        });
      }, 60000); // update every minute

      return () => {
        clearInterval(interval);
      };
    }, [lastMessage]);

    const getTimeDifference = useCallback((time: Date): string => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - time.getTime()) / 1000 / 60); // difference in minutes

      if (diff < 1) {
        return '1分鐘前';
      } else if (diff < 60) {
        return `${diff}分鐘前`;
      } else if (diff < 1440) {
        const hours = Math.floor(diff / 60);
        return `${hours}小時前`;
      } else {
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        return `${year}/${month}/${day}`;
      }
    }, []);

    return (
      <ButtonBase
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1,
          gap: 2,
          overflow: 'hidden',
          textAlign: 'start',
        }}
        component="button"
        onClick={() => onClick?.(chatGroupInfo)}
      >
        <Avatar>{avatar}</Avatar>
        {!isMobile && (
          <Stack spacing={1} direction={'row'} sx={{ flex: '1 1 auto', justifyContent: 'flex-start', width: '10em' }}>
            <Stack sx={{ flex: '1 1 auto' }}>
              <Typography variant={'body1'} sx={{ width: '100%', overflow: 'hidden', height: '1.5em' }}>
                {chatGroupInfo?.GroupName || '未命名聊天室'}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {lastMessage?.Message}
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
              {lastMessage && getTimeDifference(new Date(lastMessage.SendTime))}
            </Typography>
          </Stack>
        )}
      </ButtonBase>
    );
  },
);

export default MessageChannelItem;
