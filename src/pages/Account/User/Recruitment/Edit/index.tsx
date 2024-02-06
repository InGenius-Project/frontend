import AreaEditor from "components/Area/AreaEditor";
import { RecruitmentItem } from "components/Recruitment";
import { useGetRecruitmentByIdQuery } from "features/api/recruitment/getRecruitmentById";
import { usePostRecruitmentMutation } from "features/api/recruitment/postRecruitment";
import { AreasType, setAreas } from "features/areas/areasSlice";
import { useAppDispatch } from "features/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AreaDTO } from "types/DTO/AreaDTO";

function RecruitmentEdit() {
  const { recruitmentId = "" } = useParams();
  const dispatch = useAppDispatch();
  const [postRecruitment] = usePostRecruitmentMutation();
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId, {
    skip: recruitmentId === "",
  });

  const handlePostAreas = async (areas: Array<AreaDTO>) => {
    if (recruitmentData && recruitmentData.result)
      await postRecruitment({
        Id: recruitmentId,
        Areas: areas,
        Name: recruitmentData.result.Name,
        Enable: recruitmentData.result.Enable,
      });
  };

  useEffect(() => {
    // set areas state after query subscription success
    if (recruitmentData?.result)
      dispatch(
        setAreas({
          id: recruitmentData.result.Id,
          type: AreasType.RECRUITMENT,
          areas: recruitmentData.result.Areas,
        })
      );
  }, [recruitmentData, dispatch]);

  return (
    <>
      {recruitmentData && recruitmentData.result && (
        <>
          <RecruitmentItem
            id={recruitmentId}
            title={recruitmentData.result.Name}
          />
          <AreaEditor onPost={handlePostAreas} />
        </>
      )}
    </>
  );
}

export default RecruitmentEdit;
