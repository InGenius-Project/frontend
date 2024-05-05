import CommunityMessageItem from '@/components/Community/CommunityMessageItem';
import UserAvatar, { OwnerAvatar } from '@/components/UserAvatar';
import { useGetChatGroupQuery } from '@/features/api/chat/getChatGroup';
import { selectConn } from '@/features/message/messageSlice';
import { useAppSelector } from '@/features/store';
import { ChatMessage } from '@/types/classes/ChatMessage';
import ChatReceiveMethod from '@/types/enums/ChatReceiveMethod';
import { IChatMessage } from '@/types/interfaces/IChat';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Send from '@mui/icons-material/Send';
import { Box, Button, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NIL } from 'uuid';

function CommunityDetail() {
  const groupId = useAppSelector((state) => state.messageState.groupId);
  const [input, setInput] = useState('');
  const [order, setOrder] = useState(false);
  const { data: chatGroupData, refetch } = useGetChatGroupQuery(
    { groupId: groupId || NIL },
    {
      skip: !groupId,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      pollingInterval: 60000,
    },
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!groupId) navigate('/Account/User/Community');
  }, [groupId, navigate]);

  const [messageState, setMessageState] = useState<ChatMessage[]>([]);

  useEffect(() => {
    setMessageState(
      chatGroupData?.result?.Messages?.map((message) => new ChatMessage(message))
        .sort((a, b) => a.compareSendTime(b))
        .slice(1)
        .reverse() || [],
    );
  }, [chatGroupData?.result?.Messages]);

  const conn = useAppSelector(selectConn);

  const firstMessage = useMemo(() => {
    if (chatGroupData?.result?.Messages && (chatGroupData?.result?.Messages || []).length > 0) {
      return new ChatMessage(chatGroupData?.result.Messages[0]);
    }
  }, [chatGroupData]);

  const firstRender = useRef(true);
  useEffect(() => {
    if (!firstRender.current) return;
    conn.on(ChatReceiveMethod.Message, (c: IChatMessage) => {
      setMessageState((prev) => [...prev, new ChatMessage(c)]); // TODO: fix this
    });
    firstRender.current = false;
  }, [conn]);

  const handleSend = () => {
    if (!input || input.trim() === '') return;
    setInput('');
    conn.invoke('SendMessageToGroup', input, groupId);
    refetch(); // TODO: remove this
  };

  const handleClickReorder = () => {
    setMessageState((prev) => [...prev].reverse());
    setOrder(!order);
  };

  return (
    <Stack spacing={1}>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h4">{chatGroupData?.result?.GroupName || '沒有標題'}</Typography>
          <Typography variant="h6">{chatGroupData?.result?.Description}</Typography>
          <Stack
            direction={'row'}
            spacing={1}
            sx={{
              alignItems: 'flex-end',
            }}
          >
            <Box
              sx={{
                width: '1.5em',
                height: '1.5em',
              }}
            >
              <UserAvatar
                uri={chatGroupData?.result?.Owner?.Avatar?.Uri}
                alt={chatGroupData?.result?.Owner?.Username}
              />
            </Box>
            <Typography variant="body1">{chatGroupData?.result?.Owner?.Username}</Typography>
            <Typography variant="caption">{firstMessage?.getTimeDiffer()}</Typography>
          </Stack>
          <Typography variant="body1">{firstMessage?.Message || '此貼文沒有內容'}</Typography>
          <Typography variant="caption">{(chatGroupData?.result?.Messages || []).length - 1 || 0}則回覆</Typography>
        </Stack>
      </Paper>

      <Stack spacing={1}>
        <Typography variant="h5">回覆</Typography>
        <Paper
          sx={{
            p: 2,
          }}
        >
          <Stack spacing={1}>
            <Box>
              <Button onClick={handleClickReorder} variant="text">
                {order ? <KeyboardDoubleArrowDownIcon /> : <KeyboardDoubleArrowUpIcon />}
                排序
              </Button>
            </Box>

            <TextField
              placeholder="輸入留言..."
              value={input}
              fullWidth
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              InputProps={{
                startAdornment: (
                  <Box sx={{ width: '1.5em', height: '1.5em', mr: 1 }}>
                    <OwnerAvatar />
                  </Box>
                ),
                endAdornment: (
                  <IconButton onClick={handleSend}>
                    <Send />
                  </IconButton>
                ),
              }}
            />
            {messageState?.map((message) => <CommunityMessageItem message={message} key={message.Id} />)}
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}

export default CommunityDetail;
