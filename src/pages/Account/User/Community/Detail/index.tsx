import CommunityMessageItem from '@/components/Community/CommunityMessageItem';
import RichTextEditor from '@/components/RichTextEditor';
import UserAvatar, { OwnerAvatar } from '@/components/UserAvatar';
import { useGetChatGroupQuery } from '@/features/api/chat/getChatGroup';
import { useJoinGroupMutation } from '@/features/api/chat/joinGroup';
import { useGetUserQuery } from '@/features/api/user/getUser';
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
  const { data: userData } = useGetUserQuery();
  const [joinGroup] = useJoinGroupMutation();

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

  const handleSend = async () => {
    if (!input || input.trim() === '' || !groupId) return;

    // join group if user not in group
    if (!chatGroupData?.result?.Users?.find((user) => user.Id === userData?.result?.Id)) {
      await joinGroup({ groupId });
    }

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
          {/* Title */}
          <Typography variant="h4">{chatGroupData?.result?.GroupName || '沒有標題'}</Typography>
          {/* Description */}
          <Typography variant="h6">{chatGroupData?.result?.Description}</Typography>
          {/* Owner Info */}
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
          {/* Content */}
          {firstMessage?.Message ? (
            <RichTextEditor
              initJsonString={firstMessage?.Message}
              initMarkdownString={firstMessage?.Message}
            ></RichTextEditor>
          ) : (
            <Typography variant="body1">此貼文沒有內容</Typography>
          )}
          {/* Apply Count */}
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

            <Stack
              direction={'row'}
              sx={{
                p: 1,
              }}
            >
              <Box sx={{ width: '2em', height: '2em', mr: 1 }}>
                <OwnerAvatar />
              </Box>
              <TextField
                placeholder="輸入留言..."
                value={input}
                fullWidth
                multiline
                onChange={(e) => setInput(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleSend}>
                      <Send />
                    </IconButton>
                  ),
                }}
              />
            </Stack>
            {messageState?.map((message) => <CommunityMessageItem message={message} key={message.Id} />)}
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}

export default CommunityDetail;
