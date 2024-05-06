import { IUserInfo } from '@/types/interfaces/IUser';
import { Box, Paper, Skeleton, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import { forwardRef, useState } from 'react';

type UserProfileItemProps = {
  editable?: boolean;
  coverUri?: string;
  avatar?: React.ReactNode;
  education?: string;
  user?: IUserInfo;
  cover?: React.ReactNode;
  isLoading?: boolean;
  onChangeUserName?: (userName: string) => void;
};

const UserNameTextField = styled(TextField)(({ theme }) => ({
  '.MuiInputBase-root': {
    fontSize: theme.typography.h4.fontSize,
    width: '10em',
  },
}));
const UserProfileItem = forwardRef<HTMLDivElement, UserProfileItemProps>(
  ({ editable = false, user, avatar, onChangeUserName, education, cover, isLoading = false }, ref) => {
    const theme = useTheme();
    const [userNameState, setUserNameState] = useState(user?.Username);

    const handleChangeUserName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      setUserNameState(event.target.value);
      onChangeUserName?.(event.target.value);
    };

    return (
      <Paper
        sx={{
          overflow: 'clip',
          position: 'relative',
          padding: 2,
        }}
        ref={ref}
      >
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            height: 'var(--ing-height-profile-cover)',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          {isLoading ? (
            <Skeleton
              sx={{
                height: 'var(--ing-height-profile-cover)',
                width: '100%',
              }}
              variant="rectangular"
            />
          ) : (
            cover
          )}
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: 'calc(var(--ing-height-profile-cover) - 50px)',
            left: theme.spacing(2),
            width: 'var(--ing-height-profile-avatar)',
            height: 'var(--ing-height-profile-avatar)',
            zIndex: 2,
          }}
        >
          {isLoading ? (
            <Skeleton
              variant="circular"
              sx={{
                width: 'var(--ing-height-profile-avatar)',
                height: 'var(--ing-height-profile-avatar)',
              }}
            />
          ) : (
            avatar
          )}
        </Box>

        <Stack
          spacing={1}
          sx={{
            mt: 'calc(var(--ing-height-profile-cover) + var(--ing-height-profile-avatar) / 4)',
          }}
        >
          {editable ? (
            isLoading ? (
              <Skeleton width="10em" height="2em" />
            ) : (
              <UserNameTextField variant={'standard'} value={userNameState} onChange={handleChangeUserName} />
            )
          ) : (
            <Typography variant="h4">{user?.Username}</Typography>
          )}
          {education && <Typography variant="caption">{education}</Typography>}
          {/* <Stack direction={'row'} spacing={1}> */}
          {/* {user?.Tags?.map((t) => <Chip label="積極" onDelete={editable ? handleDelete : undefined} />)} */}
          {/* TODO: add Tag crud */}
          {/* {editable && <Chip label="新增標籤" deleteIcon={<Add />} onDelete={() => {}} />} */}
          {/* </Stack> */}
        </Stack>
      </Paper>
    );
  },
);

export default UserProfileItem;
