import {
  Box,
  Button,
  Chip,
  CssBaseline,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import dummyCover from "assets/images/png/dummyCover.jpg";
import dummyUserImage from "assets/images/png/dummyUserImage.jpg";
import { useAppSelector } from "features/store";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React from "react";

function ProfileItem() {
  const theme = useTheme();
  const userState = useAppSelector((state) => state.userState);

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
        <Typography variant="h3">{userState.User?.Username}</Typography>
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
