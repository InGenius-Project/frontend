import {
  Box,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { useDeleteResumeMutation } from "features/api/resume/resume";
import { useConfirm } from "material-ui-confirm";

function getLastModifiedTimeString(modifiedAt: Date): string {
  const now = new Date();
  const timeDifference = now.getTime() - modifiedAt.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    // If the difference is more than 24 hours, return the actual modifiedAt time
    return modifiedAt.toLocaleString();
  } else if (hours > 0) {
    return `${hours} 小時前`;
  } else if (minutes > 0) {
    return `${minutes} 分鐘前`;
  } else {
    return `${seconds} 秒前`;
  }
}

type ResumeItemProps = {
  title: string;
  id: string;
  modifiedAt?: Date;
  children?: React.ReactNode;
  isEditable?: boolean;
};

const ResumeItem = ({ title, id, modifiedAt, isEditable }: ResumeItemProps) => {
  const [deleteResume] = useDeleteResumeMutation();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const handleDeleteClick = () => {
    confirm({
      title: "確定要刪除此履歷?",
      confirmationText: "確定刪除",
      cancellationText: "取消",
      cancellationButtonProps: {
        variant: "outlined",
      },
    })
      .then(() => {
        deleteResume(id);
      })
      .catch(() => {});
  };

  return (
    <Paper
      sx={{
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          height: "100%",
        }}
      >
        <Box>
          <Stack spacing={1}>
            {isEditable ? (
              <TextField defaultValue={title} />
            ) : (
              <Typography variant="h4">{title} </Typography>
            )}
            {modifiedAt && (
              <Typography variant="caption">
                上次編輯時間: {getLastModifiedTimeString(modifiedAt)}
              </Typography>
            )}
          </Stack>
        </Box>
        <Box alignSelf={"center"}>
          <Stack direction={"row"} spacing={1}>
            {!isEditable && (
              <IconButton onClick={() => navigate(`Edit/${id}`)}>
                <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
              </IconButton>
            )}
            {!isEditable && (
              <IconButton>
                <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon>
              </IconButton>
            )}
            <IconButton onClick={handleDeleteClick}>
              <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default ResumeItem;
