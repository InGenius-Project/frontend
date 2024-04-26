import UserAvatar from '@/components/UserAvatar';
import { IOwnerUser } from '@/types/interfaces/IUser';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, AvatarGroup, Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

type MessageModelHeaderProps = {
  groupName: string;
  users?: IOwnerUser[] | React.ReactNode;
  role?: string;
  control?: React.ReactNode;
};

function MessageModelHeader({ groupName, role, users, control }: MessageModelHeaderProps) {
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
      <AvatarGroup max={3}>
        {users && React.isValidElement(users) ? (
          <Avatar>{users}</Avatar>
        ) : users && Array.isArray(users) ? (
          users.map((user) => <UserAvatar key={user.Id} uri={user.Avatar?.Uri} alt={user.Username} size="2em" />)
        ) : (
          <Avatar />
        )}
      </AvatarGroup>
      <Stack
        sx={{
          flex: '1 1 auto',
        }}
      >
        <Typography variant="body1">{groupName}</Typography>
        <Typography variant="caption">{role}</Typography>
      </Stack>
      {control}
    </Box>
  );
}

export default MessageModelHeader;
