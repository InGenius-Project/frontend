import UserAvatar from '@/components/UserAvatar';
import { useGetChatGroupQuery } from '@/features/api/chat/getChatGroup';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { IChatMessage } from '@/types/interfaces/IChat';
import { HubConnection } from '@microsoft/signalr';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import MessageItem from '../MessageItem';
import MessageModelHeader from '../MessageModelHeader';
import MessageModelInput from '../MessageModelInput';
import { MessageReceiveHandle } from '@/pages/Account/User/Message';
import { ChatMessage } from '@/types/classes/ChatMessage';
import { useLazyJoinGroupQuery } from '@/features/api/chat/joinGroup';
import { useAppSelector } from '@/features/store';
import { selectConn, selectGroupId } from '@/features/message/messageSlice';
import { NIL } from 'uuid';
import MessageEmpty from '../MessageEmpty';

type MessageModelProps = {};

const MessageModel = forwardRef<MessageReceiveHandle, MessageModelProps>(({}, ref) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [joinGroup] = useLazyJoinGroupQuery();
  const groupId = useAppSelector(selectGroupId);
  const [messageState, setMessages] = useState<IChatMessage[]>([]);
  const conn = useAppSelector(selectConn);
  const { data: chatGroupData } = useGetChatGroupQuery(
    { groupId: groupId || NIL },
    {
      skip: !groupId,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );
  const { data: userData } = useGetUserQuery();

  useEffect(() => {
    setMessages(chatGroupData?.result?.Messages || []);
  }, [chatGroupData?.result?.Messages, groupId]);

  useImperativeHandle(ref, () => ({
    onReceiveMessage: (message: IChatMessage) => {
      setMessages((prev) => [...prev, message]);
    },
  }));

  const handleClickConfirmInvited = async () => {
    chatGroupData?.result?.Id && joinGroup({ groupId: chatGroupData?.result?.Id });
  };
  const handleClickRemoveInvited = async () => {};
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messageState]);

  const handleSend = (message: string) => {
    conn?.invoke('SendMessageToGroup', message, groupId);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        p: 1,
        height: 'var(--ing-height-user-inner)',
      }}
    >
      <MessageModelHeader
        users={chatGroupData?.result?.Users}
        groupName={chatGroupData?.result?.GroupName || ''}
        control={
          chatGroupData?.result?.InvitedUsers?.find((user) => user.Id === userData?.result?.Id) ? (
            <Stack direction={'row'} spacing={1}>
              <Button onClick={handleClickConfirmInvited}>接受</Button>
              <Button variant="outlined" onClick={handleClickRemoveInvited}>
                移除
              </Button>
            </Stack>
          ) : (
            <></>
          )
        }
      ></MessageModelHeader>
      <Divider />
      {conn ? (
        <Stack
          spacing={1}
          sx={{
            flex: '1 1 auto',
            overflowY: 'scroll',
            px: 1,
          }}
          ref={listRef}
        >
          {messageState && messageState.length > 0 ? (
            messageState.map((message, index) => (
              <MessageItem
                key={index}
                label={message.Message}
                avatar={<UserAvatar uri={message.Sender?.Avatar?.Uri} alt={message.Sender.Username} />}
                align={message.SenderId === userData?.result?.Id ? 'right' : 'left'}
                time={new Date(new ChatMessage(message).SendTime)}
              />
            ))
          ) : (
            <MessageEmpty label={chatGroupData?.result?.GroupName} />
          )}
        </Stack>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant={'body1'}>Connecting...</Typography>
        </Box>
      )}
      <MessageModelInput onSend={handleSend} />
    </Stack>
  );
});

export default MessageModel;
