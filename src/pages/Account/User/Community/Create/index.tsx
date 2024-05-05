import { selectConn } from '@/features/message/messageSlice';
import { store, useAppSelector } from '@/features/store';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CommunityCreate() {
  const conn = useAppSelector(selectConn);
  const location = useLocation();
  const navigate = useNavigate();

  const [titleState, setTitleState] = useState<string>('');
  const [contentState, setContentState] = useState<string>('');

  const handleCancel = () => {
    navigate(location.state.from ? location.state.from : '/Account/User/Community');
  };

  const handleSend = async () => {
    if (titleState === '' || contentState === '') return;

    await conn.invoke('AddGroup', titleState, false);
    const state = store.getState();
    await conn.invoke('SendMessageToGroup', contentState, state.messageState.groupId);
    navigate('/Account/User/Community/Detail');
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h1">建立話題</Typography>
      <Typography variant="caption">在此詢問或發表你對實習的想法</Typography>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Stack spacing={1}>
          <TextField label="標題" value={titleState} onChange={(e) => setTitleState(e.target.value)} />
          <TextField
            multiline
            minRows={5}
            placeholder="輸入內容..."
            value={contentState}
            onChange={(e) => setContentState(e.target.value)}
          />
          <Stack direction={'row'} spacing={1}>
            <Button onClick={handleSend}>發布</Button>
            <Button variant="outlined" onClick={handleCancel}>
              取消
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default CommunityCreate;
