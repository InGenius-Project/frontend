import UserAvatar from '@/components/UserAvatar';
import { useGetChatGroupQuery } from '@/features/api/chat/getChatGroup';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { selectConn, selectGroupId } from '@/features/message/messageSlice';
import { useAppSelector } from '@/features/store';
import { MessageReceiveHandle } from '@/pages/Account/User/Message';
import { ChatMessage } from '@/types/classes/ChatMessage';
import { IChatMessage } from '@/types/interfaces/IChat';
import { Box, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { NIL } from 'uuid';
import MessageEmpty from '../MessageEmpty';
import MessageItem from '../MessageItem';
import MessageModelHeader from '../MessageModelHeader';
import MessageModelInput from '../MessageModelInput';

type MessageModelProps = {};

const MessageModel = forwardRef<MessageReceiveHandle, MessageModelProps>(({}, ref) => {
  const listRef = useRef<HTMLDivElement>(null);
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
        width: '100%',
      }}
    >
      <MessageModelHeader
        users={chatGroupData?.result?.Users}
        groupName={chatGroupData?.result?.GroupName || ''}
      ></MessageModelHeader>
      <Divider />
      {conn ? (
        <Stack
          spacing={1}
          sx={{
            flex: '1 1 auto',
            overflowY: 'scroll',
            px: 1,
            width: '100%',
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
                time={message.SendTime}
              />
            ))
          ) : (
            <MessageEmpty />
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
          <CircularProgress />
          <Typography variant={'body1'}>連線中...</Typography>
        </Box>
      )}
      <MessageModelInput onSend={handleSend} />
    </Stack>
  );
});

export default MessageModel;
