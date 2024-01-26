import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useDebounce, useUpdateEffect } from "ahooks";
import dummyCover from "assets/images/png/dummyCover.jpg";
import dummyUserImage from "assets/images/png/dummyUserImage.jpg";
import { usePostUserMutation } from "features/api/user/postUser";
import { useAppSelector } from "features/store";
import { useState } from "react";

type ProfileItemProps = {
  editable?: boolean;
};

const UserNameTextField = styled(TextField)(({ theme }) => ({
  ".MuiInputBase-root": {
    fontSize: theme.typography.h4.fontSize,
    width: "10em",
  },
}));
function ProfileItem({ editable = false }: ProfileItemProps) {
  const theme = useTheme();

  const userState = useAppSelector((state) => state.userState);
  const [userNameState, setUserNameState] = useState(userState.User?.Username);
  const debouncedUserName = useDebounce(userNameState);

  const [postUser, { isLoading: isPostingUser }] = usePostUserMutation();

  const handleChangeUserName: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUserNameState(event.target.value);
  };

  useUpdateEffect(() => {
    postUser({
      Username: debouncedUserName || "",
    });
  }, [debouncedUserName]);

  useUpdateEffect(() => {
    setUserNameState(userState.User?.Username);
  }, [userState.User?.Username]);

  const handleDelete = () => {};
  return (
    <Paper
      sx={{
        overflow: "clip",
        position: "relative",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <img
          src={dummyCover}
          alt="cover"
          style={{
            width: "100%",
            height: "var(--ing-height-profile-cover)",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "calc(var(--ing-height-profile-cover) - 50px)",
          left: theme.spacing(2),
        }}
      >
        <img
          src={dummyUserImage}
          alt="user"
          style={{
            width: "var(--ing-height-profile-avatar)",
            height: "var(--ing-height-profile-avatar)",
            borderRadius: "50%",
          }}
        />
      </Box>

      <Button
        color="primary"
        sx={{
          position: "absolute",
          right: theme.spacing(2),
        }}
        size="small"
      >
        <AddPhotoAlternateIcon />
        上傳背景
      </Button>

      <Stack
        spacing={1}
        sx={{
          mt: "calc(var(--ing-height-profile-cover) + var(--ing-height-profile-avatar) / 4)",
        }}
      >
        {editable ? (
          <UserNameTextField
            variant={"standard"}
            value={userNameState}
            onChange={handleChangeUserName}
            InputProps={{
              endAdornment: isPostingUser ? (
                <InputAdornment position="start">
                  <CircularProgress />
                </InputAdornment>
              ) : undefined,
            }}
          />
        ) : (
          <Typography variant="h4">{userState.User?.Username}</Typography>
        )}
        <Typography variant="caption">就讀於中正大學 資訊管理學系</Typography>
        <Stack direction={"row"} spacing={1}>
          <Chip label="積極" onDelete={handleDelete} />
          <Chip
            label="新增標籤"
            onDelete={handleDelete}
            deleteIcon={<AddCircleIcon />}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}

export default ProfileItem;
