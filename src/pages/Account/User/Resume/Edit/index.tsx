import AreaEditor from '@/components/Area/AreaEditor';
import { ResumeItem } from '@/components/Resume';
import { useDeleteResumeMutation } from '@/features/api/resume/deleteResume';
import { useGetResumeByIdQuery } from '@/features/api/resume/getResumeById';
import { usePostResumeMutation } from '@/features/api/resume/postResume';
import { AreasType, setAreas } from '@/features/areas/areasSlice';
import { useAppDispatch } from '@/features/store';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export default function ResumeEdit() {
  const { resumeId = '' } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: resumeData } = useGetResumeByIdQuery(resumeId);
  const [postResume] = usePostResumeMutation();
  const [deleteResume] = useDeleteResumeMutation();

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

  const handleDeleteResume = async (id: string) => {
    await deleteResume(id)
      .unwrap()
      .then(() => navigate('..'));
  };

  // If not provide id, redirect back
  if (!resumeId) {
    return <Navigate to=".." />;
  }
  if (resumeData && resumeData.result) {
    return (
      <Stack spacing={1}>
        <ResumeItem
          title={resumeData.result.Title}
          id={resumeData.result.Id}
          modifiedAt={resumeData.result.ModifiedAt}
          isEditable={true}
          onChangeTitle={handleChangeTitle}
          onDelete={handleDeleteResume}
        ></ResumeItem>
        <AreaEditor />
      </Stack>
    );
  }
  return null;
}
