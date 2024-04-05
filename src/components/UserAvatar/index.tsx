import { useAppSelector } from '@/features/store';
import { Avatar } from '@mui/material';
import React from 'react';

function UserAvatar() {
  const userState = useAppSelector((state) => state.userState.User);

  return (
    <Avatar
      src={userState?.Avatar?.Uri}
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'contain',
      }}
    >
      {userState?.Username}
    </Avatar>
  );
}

export default UserAvatar;
