import { aiChatUrl } from '@/assets/utils/urls';
import { useGetAiChatHistoryQuery } from '@/features/api/chat/getAiChatHistory';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { IChat } from '@/types/interfaces/IChat';
import SmartToy from '@mui/icons-material/SmartToy';
import { Divider, Stack } from '@mui/material';
import { useDebounce } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import { NIL } from 'uuid';
import MessageItem from '../MessageItem';
import MessageModelHeader from '../MessageModelHeader';
import MessageModelInput from '../MessageModelInput';

type MessageModelProps = {
  onChangeMessage?: (message: string) => void;
};

function MessageAIModel({ onChangeMessage }: MessageModelProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IChat[]>([]);
  const [receiveMessage, setreceiveMessage] = useState<string>('');
  const { data: userData } = useGetUserQuery(null);
  const { data: messageData } = useGetAiChatHistoryQuery(
    {
      userId: userData?.result?.Id || NIL,
    },
    {
      skip: !userData?.result?.Id,
    },
  );

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages(messageData || []);
  }, [messageData]);

  const debounceMessage = useDebounce(receiveMessage, { wait: 1000 });
  useEffect(() => {
    if (debounceMessage.length > 0) {
      setMessages((prevMessages) => [...prevMessages, { role: 'assistent', content: debounceMessage }]);
      setreceiveMessage('');
    }
  }, [debounceMessage]);

  useEffect(() => {
    onChangeMessage && onChangeMessage(messages[messages.length - 1]?.content || '');
  }, [messages, onChangeMessage]);

  const handleSend = (text: string) => {
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: text }]);

    const fetchData = async () => {
      try {
        const response = await fetch(aiChatUrl + `/chat?user_id=${userData?.result?.Id}`, {
          method: 'POST',
          body: JSON.stringify({ content: text }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok || !response.body) {
          throw response.statusText;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          const decodedChunk = decoder.decode(value, { stream: true });
          setreceiveMessage((state) => (state += decodedChunk));
        }
      } catch (error) {}
    };

    fetchData();
  };

  return (
    <Stack
      spacing={1}
      sx={{
        p: 1,
        height: 'var(--ing-height-user-inner)',
      }}
    >
      <MessageModelHeader users={<SmartToy />} groupName={'InGAI'} role={'assistent'}></MessageModelHeader>
      <Divider />
      <Stack
        spacing={1}
        sx={{
          flex: '1 1 auto',
          overflowY: 'scroll',
          px: 1,
        }}
        ref={listRef}
      >
        {messages?.map((message, index) => (
          <MessageItem key={index} align={message.role === 'user' ? 'right' : 'left'} label={message?.content || ''} />
        ))}
        {receiveMessage.length > 0 && <MessageItem align="left" label={receiveMessage} />}
      </Stack>
      <MessageModelInput onSend={handleSend} />
    </Stack>
  );
}

export default MessageAIModel;
