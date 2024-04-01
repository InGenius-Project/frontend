import { usePostMessageMutation } from '@/features/api/chat/postMessage';
import SmartToy from '@mui/icons-material/SmartToy';
import { Divider, Stack } from '@mui/material';
import { useWebSocket } from 'ahooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import MessageItem from '../MessageItem';
import MessageModelHeader from '../MessageModelHeader';
import MessageModelInput from '../MessageModelInput';
import { IChat } from '@/types/interfaces/IChat';
import { useGetMessageQuery } from '@/features/api/chat/getMessage';

function MessageModel() {
  const { data: messageData } = useGetMessageQuery();
  const listRef = useRef<HTMLHRElement>(null);
  const [messages, setMessages] = useState<IChat[]>([]);

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // 在组件加载时建立 WebSocket 连接
    const ws = new WebSocket('ws://danny10132024-atlas.nord:8000/ws');
    ws.onopen = () => {
      console.log('WebSocket connection opened');
      setSocket(ws); // 保存 WebSocket 实例
    };
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, { role: 'assistent', content: event.data }]);
      listRef?.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setMessages(messageData || []);
    listRef?.current?.lastElementChild?.scrollIntoView({ block: 'end' });

    // 组件卸载时关闭 WebSocket 连接
    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [messageData, socket]); // 仅在组件加载时建立连接

  // 发送消息到 WebSocket 服务器
  const handleSend = (text: string) => {
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: text }]);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(text);
    }
  };

  return (
    <Stack
      spacing={1}
      sx={{
        p: 1,
        height: 'var(--ing-height-user-inner)',
      }}
    >
      <MessageModelHeader avatar={<SmartToy />} username={'InGAI'} role={'assistent'}></MessageModelHeader>
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
      </Stack>
      <MessageModelInput onSend={handleSend} />
    </Stack>
  );
}

export default MessageModel;
