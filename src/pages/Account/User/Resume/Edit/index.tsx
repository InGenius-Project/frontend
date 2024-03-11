import { Stack } from "@mui/material";
import AreaEditor from "@/components/Area/AreaEditor";
import { ResumeItem } from "@/components/Resume";
import { useDeleteResumeMutation } from "@/features/api/resume/deleteResume";
import { useGetResumeByIdQuery } from "@/features/api/resume/getResumeById";
import { usePostResumeMutation } from "@/features/api/resume/postResume";
import { AreasType, setAreas } from "@/features/areas/areasSlice";
import { useAppDispatch } from "@/features/store";
import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AreaDTO } from "@/types/DTO/AreaDTO";

export default function ResumeEdit() {
  const { resumeId = "" } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: resumeData } = useGetResumeByIdQuery(resumeId);
  const [postResume] = usePostResumeMutation();
  const [deleteResume] = useDeleteResumeMutation();

  useEffect(() => {
    // set areas state after query subscription success
    if (resumeData?.Data)
      dispatch(
        setAreas({
          id: resumeData.Data.Id,
          type: AreasType.RESUME,
          areas: resumeData.Data.Areas,
        })
      );
  }, [resumeData, dispatch]);

  const handleChangeTitle = (title: string) => {
    if (resumeData && resumeData.Data)
      postResume({
        Title: title,
        Id: resumeId,
        Areas: resumeData?.Data.Areas,
        Visibility: resumeData.Data.Visibility,
      });
  };

  const handleDeleteResume = async (id: string) => {
    await deleteResume(id)
      .unwrap()
      .then(() => navigate(".."));
  };
  const handlePostAreas = async (areas: Array<AreaDTO>) => {
    if (resumeData && resumeData.Data)
      await postResume({
        Title: resumeData.Data.Title,
        Id: resumeId,
        Areas: areas,
        Visibility: resumeData.Data.Visibility,
      });
  };

  // If not provide id, redirect back
  if (!resumeId) {
    return <Navigate to=".." />;
  }
  if (resumeData && resumeData.Data) {
    return (
      <Stack spacing={1}>
        <ResumeItem
          title={resumeData.Data.Title}
          id={resumeData.Data.Id}
          modifiedAt={resumeData.Data.ModifiedAt}
          isEditable={true}
          onChangeTitle={handleChangeTitle}
          onDelete={handleDeleteResume}
        ></ResumeItem>
        <AreaEditor onPost={handlePostAreas} />
      </Stack>
    );
  }
  return null;
}
