import { useAppSelector } from '@/features/store';
import { IOwnerUser } from '@/types/interfaces/IUser';
import { Avatar, AvatarGroup, Box } from '@mui/material';
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
  size?: string;
};

function UserAvatar({ uri, alt, size }: UserAvatarProps) {
  return (
    <Avatar
      src={uri}
      sx={{
        width: size ? size : '100%',
        height: size ? size : '100%',
        fontSize: '1em',
        bgcolor: uri ? undefined : stringToColor(alt || ''),
      }}
    >
      <Box sx={{ fontSize: '0.8em' }}>{uri ? <></> : stringAvatar(alt || '')}</Box>
    </Avatar>
  );
}

type OwnerAvatarProps = {
  size?: string;
};

export function OwnerAvatar({ size }: OwnerAvatarProps) {
  const userState = useAppSelector((state) => state.userState);
  return <UserAvatar uri={userState.User?.Avatar?.Uri} alt={userState.User?.Username} size={size} />;
}

type UserAvatarGroupProps = {
  users: IOwnerUser[] | React.ReactNode;
};

export function UserAvatarGroup({ users }: UserAvatarGroupProps) {
  return (
    <AvatarGroup max={3}>
      {users && React.isValidElement(users) ? (
        <Avatar>{users}</Avatar>
      ) : users && Array.isArray(users) ? (
        users.map((user) => <UserAvatar key={user.Id} uri={user.Avatar?.Uri} alt={user.Username} size={'2em'} />)
      ) : (
        <Avatar />
      )}
    </AvatarGroup>
  );
}

export default UserAvatar;
