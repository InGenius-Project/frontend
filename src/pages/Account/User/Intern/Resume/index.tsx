import FullScreenLoader from '@/components/FullScreenLoader';
import { ResumeItem } from '@/components/Resume';
import ResumeEmpty from '@/components/Resume/ResumeEmpty';
import { DeleteTooltipWrapper, EditTooltipWrapper } from '@/components/Tooltip';
import { useDeleteResumeMutation } from '@/features/api/resume/deleteResume';
import { useGetResumesQuery } from '@/features/api/resume/getResumes';
import { usePostResumeMutation } from '@/features/api/resume/postResume';
import { useAppSelector } from '@/features/store';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, IconButton, MenuItem, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Resume() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const { data: resumeData, isLoading } = useGetResumesQuery(null);
  const { User } = useAppSelector((state) => state.userState);
  const [deleteResume] = useDeleteResumeMutation();
  const [postResume, { isLoading: isAddingNewResume }] = usePostResumeMutation();
  const navigate = useNavigate();
  const location = useLocation();
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
        {resumeData?.result &&
          resumeData.result.map((r) => (
            <ResumeItem
              key={r.Id}
              resume={r}
              control={
                isMobile ? (
                  <Stack>
                    <MenuItem onClick={() => navigate(`Edit/${r.Id}`)}>編輯</MenuItem>
                    <MenuItem onClick={() => handleDeleteClick}>刪除</MenuItem>
                  </Stack>
                ) : (
                  <Stack direction={'row'} spacing={1}>
                    <EditTooltipWrapper>
                      <IconButton onClick={() => navigate(`Edit/${r.Id}`)}>
                        <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
                      </IconButton>
                    </EditTooltipWrapper>

                    <DeleteTooltipWrapper>
                      <IconButton onClick={() => handleDeleteClick(r.Id)}>
                        <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                      </IconButton>
                    </DeleteTooltipWrapper>

                    <Tooltip title="履歷分析">
                      <IconButton
                        onClick={() =>
                          navigate(`Detail/${r.Id}`, {
                            state: {
                              from: location,
                            },
                          })
                        }
                      >
                        <AutoAwesome />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                )
              }
            />
          ))}
        {resumeData?.result?.length === 0 && <ResumeEmpty />}
      </Stack>
    </Stack>
  );
}
