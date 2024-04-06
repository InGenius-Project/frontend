import { useAppSelector } from '@/features/store';
import { Avatar } from '@mui/material';
import React from 'react';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return `${name?.charAt(0)?.toUpperCase()}`;
}

type UserAvatarProps = {
  uri?: string;
  alt?: string;
};

function UserAvatar({ uri, alt }: UserAvatarProps) {
  return (
    <Avatar
      src={uri}
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: uri ? undefined : stringToColor(alt || ''),
      }}
    >
      {uri ? <></> : stringAvatar(alt || '')}
    </Avatar>
  );
}

export function OwnerAvatar() {
  const userState = useAppSelector((state) => state.userState);
  return <UserAvatar uri={userState.User?.Avatar?.Uri} alt={userState.User?.Username} />;
}

export default UserAvatar;
