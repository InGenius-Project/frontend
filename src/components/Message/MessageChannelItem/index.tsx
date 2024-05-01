import UserAvatar from '@/components/UserAvatar';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { selectGroupId } from '@/features/message/messageSlice';
import { useAppSelector } from '@/features/store';
import { MessageReceiveHandle } from '@/pages/Account/User/Message';
import { ChatMessage } from '@/types/classes/ChatMessage';
import { IChatGroupInfo, IChatMessage } from '@/types/interfaces/IChat';
import { Avatar, Box, ButtonBase, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

type MessageChannelItemProps = {
  avatar?: JSX.Element;
  chatGroupInfo?: IChatGroupInfo;
  onClick?: (c: IChatGroupInfo | undefined) => void;
};

const MessageChannelItem = forwardRef<MessageReceiveHandle, MessageChannelItemProps>(
  ({ avatar, chatGroupInfo, onClick }, ref) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
    const [lastMessage, setLastMessage] = useState<ChatMessage>();
    const [lastMessageTime, setLastMessageTime] = useState<string>('');
    const groupIdState = useAppSelector(selectGroupId);
    const { data: userData } = useGetUserQuery();

    const ChannelAvatar = () => {
      if (avatar) return <Avatar>{avatar}</Avatar>;
      const firstUser = chatGroupInfo?.Users.filter((user) => user.Id === userData?.result?.Id)[0];
      return <UserAvatar uri={firstUser?.Avatar?.Uri} alt={firstUser?.Username}></UserAvatar>;
    };

    useImperativeHandle(ref, () => ({
      onReceiveMessage: (message: IChatMessage) => {
        const chatMessage = new ChatMessage(message);
        setLastMessage(chatMessage);
        setLastMessageTime(chatMessage.getTimeDiffer());
      },
    }));

    // Update Last Message Time
    useEffect(() => {
      const interval = setInterval(() => {
        setLastMessageTime(lastMessage?.getTimeDiffer() || '');
      }, 60000); // 1 minute

      return () => {
        clearInterval(interval);
      };
    }, [lastMessage]);

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
          backgroundColor: groupIdState === chatGroupInfo?.Id ? theme.palette.action.selected : 'inherit',
        }}
        component="button"
        onClick={() => onClick?.(chatGroupInfo)}
      >
        {!isMobile && (
          <Stack spacing={1} direction={'row'} sx={{ flex: '1 1 auto', justifyContent: 'flex-start', width: '10em' }}>
            <Box width="3em" height={'3em'}>
              <ChannelAvatar />
            </Box>
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
              {lastMessageTime}
            </Typography>
          </Stack>
        )}
      </ButtonBase>
    );
  },
);

export default MessageChannelItem;
