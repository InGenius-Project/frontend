import { Box, CssBaseline, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ResumeItem } from '@/components/Resume';
import { useAppSelector } from '@/features/store';
import LoadingButton from '@mui/lab/LoadingButton';
import FullScreenLoader from '@/components/FullScreenLoader';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { useDeleteResumeMutation } from '@/features/api/resume/deleteResume';
import { usePostResumeMutation } from '@/features/api/resume/postResume';
import { useGetResumesQuery } from '@/features/api/resume/getResumes';
import { useConfirm } from 'material-ui-confirm';

export default function Resume() {
  const { data: resumes, isLoading } = useGetResumesQuery(null);
  const { User } = useAppSelector((state) => state.userState);
  const [deleteResume] = useDeleteResumeMutation();
  const [postResume, { isLoading: isAddingNewResume }] = usePostResumeMutation();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const handleAddNewResumeClick = () => {
    postResume({
      Title: `${User?.Username}的履歷`,
      Visibility: false,
    })
      .unwrap()
      .then((res) => {
        if (res && res.result) {
          navigate(`Edit/${res.result.Id}`);
        }
      });
  };
  const handleDeleteClick = (id: string) => {
    confirm({
      title: '確定要刪除此履歷?',
      confirmationText: '確定刪除',
      cancellationText: '取消',
      cancellationButtonProps: {
        variant: 'outlined',
      },
    })
      .then(() => {
        deleteResume(id);
      })
      .catch(() => {});
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <LoadingButton
          variant="text"
          loading={isAddingNewResume}
          startIcon={<AddIcon />}
          onClick={handleAddNewResumeClick}
        >
          新增履歷
        </LoadingButton>
      </Box>
      <CssBaseline />

      <Stack spacing={1}>
        {resumes?.result?.length &&
          resumes.result.length > 0 &&
          resumes.result.map((r) => (
            <ResumeItem
              key={r.Id}
              resume={r}
              control={
                <Stack direction={'row'} spacing={1}>
                  <IconButton onClick={() => navigate(`Edit/${r.Id}`)}>
                    <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
                  </IconButton>
                  <IconButton>
                    <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon>
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(r.Id)}>
                    <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                  </IconButton>
                </Stack>
              }
            />
          ))}
      </Stack>
    </Stack>
  );
}
