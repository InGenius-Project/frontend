import FullScreenLoader from '@/components/FullScreenLoader';
import { ResumeItem } from '@/components/Resume';
import ResumeEmpty from '@/components/Resume/ResumeEmpty';
import { useDeleteResumeMutation } from '@/features/api/resume/deleteResume';
import { useGetResumesQuery } from '@/features/api/resume/getResumes';
import { usePostResumeMutation } from '@/features/api/resume/postResume';
import { useAppSelector } from '@/features/store';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, IconButton, Stack } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useNavigate } from 'react-router-dom';

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
      <Stack spacing={1} direction={'row'}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          endIcon={<AutoAwesomeOutlinedIcon />}
          onClick={() => navigate('./Generate')}
        >
          新增履歷
        </Button>
        <LoadingButton
          variant="contained"
          loading={isAddingNewResume}
          color="white"
          startIcon={<AddIcon />}
          onClick={handleAddNewResumeClick}
        >
          新增空白履歷
        </LoadingButton>
      </Stack>

      <Stack spacing={1}>
        {resumes?.result &&
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
        {resumes?.result?.length === 0 && <ResumeEmpty />}
      </Stack>
    </Stack>
  );
}
