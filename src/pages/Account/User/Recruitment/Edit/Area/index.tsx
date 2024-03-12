import { AreaEditModel } from "@/components/Area";
import { useGetAreaByIdQuery } from "@/features/api/area/getArea";
import { usePostAreaMutation } from "@/features/api/area/postArea";
import { useGetRecruitmentByIdQuery } from "@/features/api/recruitment/getRecruitmentById";
import { usePostRecruitmentMutation } from "@/features/api/recruitment/postRecruitment";
import {
  getUpdatedArea,
  getUpdatedAreas,
  setLayoutByArea,
} from "@/features/layout/layoutSlice";
import { store, useAppDispatch, useAppSelector } from "@/features/store";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RecruitmentArea() {
  const { recruitmentId = "", areaId } = useParams();
  const [postArea, { isLoading }] = usePostAreaMutation();
  const { data: areaData } = useGetAreaByIdQuery(areaId!, {
    skip: !areaId,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: recruitementData } = useGetRecruitmentByIdQuery(recruitmentId);
  const [postRecruitment] = usePostRecruitmentMutation();
  const areasState = useAppSelector((state) => state.areasState);

  useLayoutEffect(() => {
    if (areaData && areaData.result) {
      dispatch(setLayoutByArea(areaData.result));
    }
  }, [areaData, dispatch]);

  const handleSubmit = () => {
    if (recruitementData && recruitementData.result) {
      let areas = Array.from(recruitementData.result.Areas);

      const existAreaIndex = areas.findIndex(
        (area) => area.Id === areaData?.result?.Id
      );

      const state = store.getState();
      // Create a new area if not exist
      if (existAreaIndex === -1) {
        // Post full Resume for update the sequence of the areas
        postRecruitment({
          Id: recruitmentId,
          Name: recruitementData.result.Name,
          Enable: recruitementData.result.Enable,
          Areas: getUpdatedAreas(
            state,
            areasState.focusedArea
              ? areasState.focusedArea.Sequence
              : recruitementData.result.Areas.length
          ),
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
