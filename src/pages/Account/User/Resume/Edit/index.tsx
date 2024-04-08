import AreaEditor from '@/components/Area/AreaEditor';
import { ResumeItem } from '@/components/Resume';
import { useDeleteResumeMutation } from '@/features/api/resume/deleteResume';
import { useGetResumeByIdQuery } from '@/features/api/resume/getResumeById';
import { usePostResumeMutation } from '@/features/api/resume/postResume';
import { AreasType, setAreas } from '@/features/areas/areasSlice';
import { useAppDispatch } from '@/features/store';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Stack } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export default function ResumeEdit() {
  const { resumeId = '' } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: resumeData } = useGetResumeByIdQuery(resumeId);
  const [postResume] = usePostResumeMutation();
  const [deleteResume] = useDeleteResumeMutation();
  const confirm = useConfirm();

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
          areas: resumeData.result.Areas,
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
            <Stack>
              <IconButton>
                <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon>
              </IconButton>
              <IconButton
                onClick={() => {
                  resumeData.result?.Id && handleDeleteClick(resumeData.result?.Id);
                }}
              >
                <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
              </IconButton>
            </Stack>
          }
        ></ResumeItem>
        <AreaEditor />
      </Stack>
    );
  }
  return null;
}
