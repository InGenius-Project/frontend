import UserAvatar from '@/components/UserAvatar';
import { useDeleteChatGroupMutation } from '@/features/api/chat/deleteChatGroup';
import { useGetUserQuery } from '@/features/api/user/getUser';
import { setGroupId } from '@/features/message/messageSlice';
import { useAppDispatch } from '@/features/store';
import { ChatMessage } from '@/types/classes/ChatMessage';
import { IChatGroup } from '@/types/interfaces/IChat';
import { IOwnerUser } from '@/types/interfaces/IUser';
import ForumIcon from '@mui/icons-material/Forum';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type CommunityItemProps = {
  owner?: IOwnerUser;
  chatGroup: IChatGroup;
};

function CommunityItem({ owner, chatGroup }: CommunityItemProps) {
  const { data: userData } = useGetUserQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [deleteChatGroup] = useDeleteChatGroupMutation();

  const lastMessage = useMemo(() => {
    if (chatGroup.Messages && chatGroup.Messages.length > 0) {
      return new ChatMessage(chatGroup.Messages[chatGroup.Messages.length - 1]);
    }
  }, [chatGroup.Messages]);

  const handleClickItem = () => {
    dispatch(setGroupId(chatGroup.Id));
    navigate('Detail');
  };

  const handleDelete = () => {
    deleteChatGroup({ groupId: chatGroup.Id });
  };
  return (
    <Stack
      spacing={1}
      direction={'row'}
      sx={{
        alignItems: 'flex-start',
      }}
    >
      <Stack
        spacing={1}
        sx={{
          py: 1,
          cursor: 'pointer',
          flex: '1 1 auto',
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
      {chatGroup?.Owner?.Id === userData?.result?.Id && (
        <Box>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleDelete}>刪除</MenuItem>
          </Menu>
        </Box>
      )}
    </Stack>
  );
}

export default CommunityItem;
