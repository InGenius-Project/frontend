import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';

type MessageModelHeaderProps = {
  avatar: React.ReactNode;
  username: string;
  role: string;
};

function MessageModelHeader({ avatar, username, role }: MessageModelHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Avatar>{avatar}</Avatar>
      <Stack
        sx={{
          flex: '1 1 auto',
        }}
      >
        <Typography variant="body1">{username}</Typography>
        <Typography variant="caption">{role}</Typography>
      </Stack>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
}

export default MessageModelHeader;
