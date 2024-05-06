import { UserAvatarGroup } from '@/components/UserAvatar';
import { IOwnerUser } from '@/types/interfaces/IUser';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

type MessageModelHeaderProps = {
  groupName: string;
  users?: IOwnerUser[] | React.ReactNode;
  role?: string;
  control?: React.ReactNode;
};

function MessageModelHeader({ groupName, role, users, control }: MessageModelHeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

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
      {!isMobile && <UserAvatarGroup users={users} />}
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
