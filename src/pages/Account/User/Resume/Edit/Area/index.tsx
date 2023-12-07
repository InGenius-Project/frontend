import { AreaEditModel } from "components/Area";
import { useGetResumeByIdQuery } from "features/api/resume/resume";
import { usePostResumeAreaMutation } from "features/api/resume/resumeArea";
import { setTextLayout } from "features/layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "features/store";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutArrangement, TextLayoutDTO } from "types/DTO/ResumeDTO";

export default function ResumeArea() {
  const { resumeId = "", areaId } = useParams();
  const [postResumeArea, { isLoading, isSuccess }] =
    usePostResumeAreaMutation();
  const { data: resumeData } = useGetResumeByIdQuery(resumeId);
  const areaState = useAppSelector((state) => state.layoutState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (resumeData && resumeData.Data?.TextLayouts) {
      const findArea = resumeData.Data.TextLayouts.find((t) => t.Id === areaId);
      if (findArea?.Layout.Arrangement === LayoutArrangement.TEXT) {
        dispatch(setTextLayout(findArea.Layout));
      }
    }
  }, [resumeData]);

  const handleSubmit = () => {
    postResumeArea({
      ResumeId: resumeId,
      TextLayout: {
        Id: areaId,
        Title: areaState.title,
        Type: areaState.type,
        Arrangement: LayoutArrangement.TEXT,
        ...areaState.textLayout,
      } as TextLayoutDTO,
    })
      .unwrap()
      .then((res) => {
        if (res.Success) {
          navigate(`/Account/User/Resume/Edit/${resumeId}`);
        }
      });
  };

  return <AreaEditModel onAddClick={handleSubmit} loading={isLoading} />;
}
