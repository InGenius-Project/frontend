import { AreaEditModel } from "components/Area";
import { useGetAreaByIdQuery } from "features/api/area/getArea";
import { usePostAreaMutation } from "features/api/area/postArea";
import { useGetResumeByIdQuery } from "features/api/resume/getResumeById";
import { usePostResumeMutation } from "features/api/resume/postResume";
import {
  getUpdatedArea,
  getUpdatedAreas,
  setLayoutByArea,
} from "features/layout/layoutSlice";
import { store, useAppDispatch, useAppSelector } from "features/store";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResumeArea() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { resumeId = "", areaId } = useParams();

  const [postArea, { isLoading }] = usePostAreaMutation();
  const [postResume] = usePostResumeMutation();
  const { data: resumeData } = useGetResumeByIdQuery(resumeId);
  const { data: areaData } = useGetAreaByIdQuery(areaId!, {
    skip: !areaId,
  });

  const areasState = useAppSelector((state) => state.areasState);

  useLayoutEffect(() => {
    if (areaData && areaData.Data) {
      dispatch(setLayoutByArea(areaData.Data));
    }
  }, [areaData, dispatch]);

  const handleSubmit = () => {
    if (resumeData && resumeData.Data) {
      let areas = Array.from(resumeData.Data.Areas);

      const existAreaIndex = areas.findIndex(
        (area) => area.Id === areaData?.Data?.Id
      );

      const state = store.getState();
      // Create a new area if not exist
      if (existAreaIndex === -1) {
        // Post full Resume for update the sequence of the areas
        postResume({
          Id: resumeId,
          Title: resumeData.Data.Title,
          Areas: getUpdatedAreas(
            state,
            areasState.focusedArea
              ? areasState.focusedArea.Sequence
              : resumeData.Data.Areas.length
          ),
          Visibility: resumeData.Data.Visibility,
        })
          .unwrap()
          .then(() => {
            navigate("..");
            return;
          });
      } else {
        postArea(getUpdatedArea(state))
          .unwrap()
          .then(() => {
            navigate("..");
            return;
          });
      }
    }
  };

  return <AreaEditModel onAddClick={handleSubmit} loading={isLoading} />;
}
