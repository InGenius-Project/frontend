import { Avatar, Box, Checkbox, Chip, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import MessageIcon from '@mui/icons-material/Message';
import ArticleIcon from '@mui/icons-material/Article';
import { IResume } from '@/types/interfaces/IResume';
import { useNavigate } from 'react-router-dom';

type ManageProfileItemProps = {
  resume: IResume;
};

function ManageProfileItem({ resume }: ManageProfileItemProps) {
  const navigate = useNavigate();
  return (
    <Paper>
      <Stack
        direction={'row'}
        spacing={1}
        sx={{
          alignItems: 'center',
          p: 1,
        }}
      >
        <Checkbox />
        <Avatar />
        <Stack
          sx={{
            flex: '1 1 auto',
          }}
        >
          <Typography variant="caption">2024/01/01</Typography>
          <Typography variant="body1">{resume.User.Username}</Typography>
          <Typography variant="caption">就讀於中正大學 | 資訊管理學系</Typography>
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <IconButton>
            <MessageIcon />
          </IconButton>
          <IconButton>
            <ArticleIcon onClick={() => navigate(`Resume/${resume.Id}`)} />
          </IconButton>
        </Stack>
        <Chip label="尚未應徵"></Chip>
      </Stack>
    </Paper>
  );
}

export default ManageProfileItem;
