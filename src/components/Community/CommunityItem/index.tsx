import UserAvatar from '@/components/UserAvatar';
import { Box, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { IOwnerUser } from '@/types/interfaces/IUser';
import { IChatGroup } from '@/types/interfaces/IChat';
import { ChatMessage } from '@/types/classes/ChatMessage';
import PeopleIcon from '@mui/icons-material/People';
import ForumIcon from '@mui/icons-material/Forum';
import { useAppDispatch } from '@/features/store';
import { setGroupId } from '@/features/message/messageSlice';
import { useNavigate } from 'react-router-dom';

type CommunityItemProps = {
  owner?: IOwnerUser;
  chatGroup: IChatGroup;
};

function CommunityItem({ owner, chatGroup }: CommunityItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const lastMessage = useMemo(() => {
    if (chatGroup.Messages && chatGroup.Messages.length > 0) {
      return new ChatMessage(chatGroup.Messages[chatGroup.Messages.length - 1]);
    }
  }, [chatGroup.Messages]);

  const handleClickItem = () => {
    dispatch(setGroupId(chatGroup.Id));
    navigate('Detail');
  };
  return (
    <Stack
      spacing={1}
      sx={{
        py: 1,
        cursor: 'pointer',
      }}
      onClick={handleClickItem}
    >
      <Stack
        direction={'row'}
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '1.5em',
            height: '1.5em',
          }}
        >
          <UserAvatar uri={owner?.Avatar?.Uri} alt={owner?.Username} />
        </Box>
        <Typography variant={'caption'}>{owner?.Username}</Typography>
        <Typography variant={'caption'}>{lastMessage?.getTimeDiffer()}</Typography>
      </Stack>
      <Typography variant={'body1'}>{chatGroup.GroupName}</Typography>
      {chatGroup.Messages && (
        <Typography
          variant={'body2'}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.5em',
            height: '3em',
          }}
        >
          {chatGroup.Messages[0].Message}
        </Typography>
      )}
      <Stack direction="row" spacing={1}>
        <Typography color="primary" variant="caption">
          <PeopleIcon /> {chatGroup.Users.length}
        </Typography>
        <Typography color="primary" variant="caption">
          <ForumIcon /> {chatGroup.Messages?.length}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default CommunityItem;
