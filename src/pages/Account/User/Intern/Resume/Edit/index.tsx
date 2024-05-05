import AreaEditor from '@/components/Area/AreaEditor';
import { ResumeItem } from '@/components/Resume';
import { useLazyAnalyzeResumeQuery } from '@/features/api/resume/analyzeResume';
import { useDeleteResumeMutation } from '@/features/api/resume/deleteResume';
import { useGetResumeByIdQuery } from '@/features/api/resume/getResumeById';
import { usePostResumeMutation } from '@/features/api/resume/postResume';
import { useSearchRelativeRecruitmentQuery } from '@/features/api/resume/searchRelativeRecruitment';
import { AreasType, setAreas } from '@/features/areas/areasSlice';
import { useAppDispatch } from '@/features/store';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Chip, IconButton, MenuItem, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { NIL } from 'uuid';

export default function ResumeEdit() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const { resumeId = '' } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: resumeData } = useGetResumeByIdQuery(resumeId);
  const [postResume] = usePostResumeMutation();
  const [deleteResume] = useDeleteResumeMutation();
  const confirm = useConfirm();
  const [anaylzeResume, { isLoading: isAnalyzingResume }] = useLazyAnalyzeResumeQuery();
  const { data: relativeRecruitmentData } = useSearchRelativeRecruitmentQuery(
    { resumeId: resumeId || NIL },
    { skip: !resumeId },
  );

  const handleAnalyze = () => {
    anaylzeResume({ resumeId })
      .unwrap()
      .then(() => {
        handleNavigateRelative();
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
        deleteResume(id)
          .unwrap()
          .then(() => {
            navigate('..');
          });
      })
      .catch(() => {});
  };

  useEffect(() => {
    // set areas state after query subscription success
    if (resumeData?.result)
      dispatch(
        setAreas({
          id: resumeData.result.Id,
          type: AreasType.RESUME,
          areas: resumeData.result.Areas || [],
        }),
      );
  }, [resumeData, dispatch]);

  const handleChangeTitle = (title: string) => {
    if (resumeData && resumeData.result)
      postResume({
        Title: title,
        Id: resumeId,
        Visibility: resumeData.result.Visibility,
      });
  };

  const handleClickDelete = () => {
    resumeData?.result?.Id && handleDeleteClick(resumeData.result?.Id);
  };

  const handleNavigateRelative = () =>
    navigate(`/Search/Relative/Recruitment/${resumeId}`, {
      state: { from: location },
    });

  // If not provide id, redirect back
  if (!resumeId) {
    return <Navigate to=".." />;
  }
  if (resumeData && resumeData.result) {
    return (
      <Stack spacing={1}>
        <ResumeItem
          editable
          onChangeTitle={handleChangeTitle}
          resume={resumeData.result}
          control={
            isMobile ? (
              <>
                <MenuItem>
                  {relativeRecruitmentData?.result && relativeRecruitmentData.result.length > 0 ? (
                    <Button onClick={handleNavigateRelative} variant="text">
                      共有
                      <Chip
                        label={relativeRecruitmentData.result.length}
                        sx={{
                          mx: 1,
                        }}
                      />
                      相關職缺
                    </Button>
                  ) : (
                    <LoadingButton
                      variant="contained"
                      loading={isAnalyzingResume}
                      onClick={handleAnalyze}
                      startIcon={<AutoAwesome />}
                    >
                      履歷曝光
                    </LoadingButton>
                  )}
                </MenuItem>
                <MenuItem onClick={handleClickDelete}>刪除</MenuItem>
              </>
            ) : (
              <Stack direction={'row'}>
                {relativeRecruitmentData?.result && relativeRecruitmentData.result.length > 0 ? (
                  <Button onClick={handleNavigateRelative} variant="text">
                    共有
                    <Chip
                      label={relativeRecruitmentData.result.length}
                      sx={{
                        mx: 1,
                      }}
                    />
                    相關職缺
                  </Button>
                ) : (
                  <LoadingButton
                    variant="contained"
                    loading={isAnalyzingResume}
                    onClick={handleAnalyze}
                    startIcon={<AutoAwesome />}
                  >
                    履歷曝光
                  </LoadingButton>
                )}
                <IconButton onClick={handleClickDelete}>
                  <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                </IconButton>
              </Stack>
            )
          }
        ></ResumeItem>
        <AreaEditor />
      </Stack>
    );
  }
  return null;
}
