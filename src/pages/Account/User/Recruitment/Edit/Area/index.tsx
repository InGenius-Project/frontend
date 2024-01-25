import { AreaEditModel } from "components/Area";
import { useGetAreaByIdQuery } from "features/api/area/getArea";
import { usePostAreaMutation } from "features/api/area/postArea";
import { useGetRecruitmentByIdQuery } from "features/api/recruitment/getRecruitmentById";
import { usePostRecruitmentMutation } from "features/api/recruitment/postRecruitment";
import {
  getUpdatedArea,
  getUpdatedAreas,
  setLayoutByArea,
} from "features/layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "features/store";
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
    if (areaData && areaData.Data) {
      dispatch(setLayoutByArea(areaData.Data));
    }
  }, [areaData, dispatch]);

  const handleSubmit = () => {
    if (recruitementData && recruitementData.Data) {
      let areas = Array.from(recruitementData.Data.Areas);

      const existAreaIndex = areas.findIndex(
        (area) => area.Id === areaData?.Data?.Id
      );

      // Create a new area if not exist
      if (existAreaIndex === -1) {
        // Post full Resume for update the sequence of the areas
        postRecruitment({
          Id: recruitmentId,
          Name: recruitementData.Data.Name,
          Enable: recruitementData.Data.Enable,
          Areas: getUpdatedAreas(
            areasState.focusedArea
              ? areasState.focusedArea.Sequence
              : recruitementData.Data.Areas.length
          ),
        })
          .unwrap()
          .then(() => {
            navigate("..");
            return;
          });
      } else {
        postArea(getUpdatedArea())
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
