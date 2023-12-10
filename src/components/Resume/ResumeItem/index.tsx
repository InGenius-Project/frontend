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
import {
  resumeApi,
  useDeleteResumeMutation,
  useLazyGetResumeByIdQuery,
  usePostResumeMutation,
} from "features/api/resume/resume";
import { useConfirm } from "material-ui-confirm";
import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import FullScreenLoader from "components/FullScreenLoader";
import { EditRoad } from "@mui/icons-material";

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
  id: string;
  children?: React.ReactNode;
  isEditable?: boolean;
  title: string;
  modifiedAt: string;
};

const ResumeItem = ({ id, isEditable, title, modifiedAt }: ResumeItemProps) => {
  const [deleteResume] = useDeleteResumeMutation();
  const [getResumeData, { data: resumeData }] = useLazyGetResumeByIdQuery();
  const [postResume] = usePostResumeMutation();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const [currentTitle, setCurrentTitle] = useState<string | undefined>(title);
  const debouncedCurrentTitle = useDebounce<string | undefined>(
    currentTitle,
    500
  );

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

  const handleChangeTitle: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setCurrentTitle(event.target.value);
  };

  useEffect(() => {
    if (isEditable) {
      getResumeData(id, true);

      if (resumeData && resumeData.Data)
        postResume({
          Title: debouncedCurrentTitle,
          Id: id,
          Areas: resumeData?.Data.Areas,
        });
    }
  }, [debouncedCurrentTitle, postResume, isEditable]);

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
              <TextField defaultValue={title} onChange={handleChangeTitle} />
            ) : (
              <Typography variant="h4">{title} </Typography>
            )}
            <Typography variant="caption">
              上次編輯時間:{" "}
              {getLastModifiedTimeString(new Date(modifiedAt)) || "?"}
            </Typography>
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
