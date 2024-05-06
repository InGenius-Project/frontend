import UserAvatar from '@/components/UserAvatar';
import { useCancelInvitationMutation } from '@/features/api/chat/cancelInvitation';
import { useJoinGroupMutation } from '@/features/api/chat/joinGroup';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { selectGroupId } from '@/features/message/messageSlice';
import { useAppSelector } from '@/features/store';
import { MessageReceiveHandle } from '@/pages/Account/User/Message';
import { ChatMessage } from '@/types/classes/ChatMessage';
import { IChatGroupInfo, IChatMessage } from '@/types/interfaces/IChat';
import Check from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
import { Box, ButtonBase, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

type MessageChannelItemProps = {
  avatar?: JSX.Element;
  chatGroupInfo?: IChatGroupInfo;
  type?: 'chat' | 'invited';
  onClick?: (c: IChatGroupInfo | undefined) => void;
};

const MessageChannelItem = forwardRef<MessageReceiveHandle, MessageChannelItemProps>(
  ({ avatar, chatGroupInfo, onClick, type = 'chat' }, ref) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
    const [lastMessage, setLastMessage] = useState<ChatMessage>();
    const [lastMessageTime, setLastMessageTime] = useState<string>('');
    const groupIdState = useAppSelector(selectGroupId);
    const { data: userData } = useGetUserQuery();

    const [cancelInvitation] = useCancelInvitationMutation();
    const [joinGroup] = useJoinGroupMutation();

    const ChannelAvatar = () => {
      if (avatar) return avatar;

      if (type === 'invited') {
        return (
          <Box
            sx={{
              width: '3em',
              height: '3em',
            }}
          >
            <UserAvatar uri={chatGroupInfo?.Owner?.Avatar?.Uri} alt={chatGroupInfo?.Owner?.Username}></UserAvatar>
          </Box>
        );
      }

      const firstUser = chatGroupInfo?.Users.filter((user) => user.Id === userData?.result?.Id)[0];
      return (
        <Box
          sx={{
            width: '3em',
            height: '3em',
          }}
        >
          <UserAvatar uri={firstUser?.Avatar?.Uri} alt={firstUser?.Username}></UserAvatar>
        </Box>
      );
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

    const handleAcceptInvitation = async () => {
      if (chatGroupInfo) {
        joinGroup({ groupId: chatGroupInfo?.Id });
      }
    };

    const handleCancelInvitation = async () => {
      if (chatGroupInfo && userData?.result?.Id) {
        cancelInvitation({ groupId: chatGroupInfo?.Id, userId: userData?.result?.Id });
      }
    };

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
          flex: '0 0 auto',
          textAlign: 'start',
          backgroundColor: groupIdState === chatGroupInfo?.Id ? theme.palette.action.selected : 'inherit',
        }}
        component="button"
        onClick={() => onClick?.(chatGroupInfo)}
      >
        <Stack
          spacing={1}
          direction={'row'}
          sx={{
            flex: '1 1 auto',
            justifyContent: isMobile ? 'center' : 'flex-start',
            width: isMobile ? 'fit-content' : '10em',
          }}
        >
          <Box
            sx={{
              width: '3em',
              height: '3em',
            }}
          >
            <ChannelAvatar />
          </Box>
          {!isMobile && (
            <>
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
                {type === 'invited' && (
                  <Stack
                    spacing={1}
                    direction="row"
                    sx={{
                      widht: '100%',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <IconButton onClick={handleAcceptInvitation}>
                      <Check />
                    </IconButton>
                    <IconButton onClick={handleCancelInvitation}>
                      <Clear />
                    </IconButton>
                  </Stack>
                )}
              </Stack>

              <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>
                {lastMessageTime}
              </Typography>
            </>
          )}
        </Stack>
      </ButtonBase>
    );
  },
);

export default MessageChannelItem;
