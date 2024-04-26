import { usePostMessageMutation } from '@/features/api/chat/postMessage';
import SmartToy from '@mui/icons-material/SmartToy';
import { Divider, Stack } from '@mui/material';
import { useDebounce, useDebounceFn, useWebSocket } from 'ahooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import MessageItem from '../MessageItem';
import MessageModelHeader from '../MessageModelHeader';
import MessageModelInput from '../MessageModelInput';
import { IChat } from '@/types/interfaces/IChat';
import { useGetMessageQuery } from '@/features/api/chat/getMessage';

type MessageModelProps = {
  onChangeMessage?: (message: string) => void;
};

function MessageAIModel({ onChangeMessage }: MessageModelProps) {
  const { data: messageData } = useGetMessageQuery();
  const listRef = useRef<HTMLHRElement>(null);
  const [messages, setMessages] = useState<IChat[]>([]);
  const [receiveMessage, setreceiveMessage] = useState<string>('');

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

  // 发送消息到 WebSocket 服务器
  const handleSend = (text: string) => {
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: text }]);

    const fetchData = async () => {
      try {
        const response = await fetch('http://danny10132024-atlas.nord:8000/chat', {
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
          listRef?.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
