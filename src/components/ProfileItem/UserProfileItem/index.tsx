import dummyCover from '@/assets/images/png/dummyCover.jpg';
import { IUserInfo } from '@/types/interfaces/IUser';
import Add from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, Button, Chip, Paper, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import { useState } from 'react';

type UserProfileItemProps = {
  editable?: boolean;
  coverUri?: string;
  avatar?: React.ReactNode;
  user?: IUserInfo;
  onChangeUserName?: (userName: string) => void;
};

const UserNameTextField = styled(TextField)(({ theme }) => ({
  '.MuiInputBase-root': {
    fontSize: theme.typography.h4.fontSize,
    width: '10em',
  },
}));
function UserProfileItem({ editable = false, user, avatar, onChangeUserName }: UserProfileItemProps) {
  const theme = useTheme();
  const [userNameState, setUserNameState] = useState(user?.Username);

  const handleChangeUserName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserNameState(event.target.value);
    onChangeUserName?.(event.target.value);
  };

  const handleDelete = () => {};
  return (
    <Paper
      sx={{
        overflow: 'clip',
        position: 'relative',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <img
          src={dummyCover}
          alt="cover"
          style={{
            width: '100%',
            height: 'var(--ing-height-profile-cover)',
            objectFit: 'cover',
          }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 'calc(var(--ing-height-profile-cover) - 50px)',
          left: theme.spacing(2),
          width: 'var(--ing-height-profile-avatar)',
          height: 'var(--ing-height-profile-avatar)',
        }}
      >
        {avatar}
      </Box>

      {editable && (
        <Button
          color="primary"
          sx={{
            position: 'absolute',
            right: theme.spacing(2),
          }}
          size="small"
        >
          <AddPhotoAlternateIcon />
          上傳背景
        </Button>
      )}

      <Stack
        spacing={1}
        sx={{
          mt: 'calc(var(--ing-height-profile-cover) + var(--ing-height-profile-avatar) / 4)',
        }}
      >
        {editable ? (
          <UserNameTextField variant={'standard'} value={userNameState} onChange={handleChangeUserName} />
        ) : (
          <Typography variant="h4">{user?.Username}</Typography>
        )}
        <Typography variant="caption">就讀於中正大學 資訊管理學系</Typography>
        <Stack direction={'row'} spacing={1}>
          {user?.Tags?.map((t) => <Chip label="積極" onDelete={editable ? handleDelete : undefined} />)}
          {editable && <Chip label="新增標籤" deleteIcon={<Add />} onDelete={() => {}} />}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default UserProfileItem;
