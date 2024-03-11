import AreaEditor from "@/components/Area/AreaEditor";
import { RecruitmentItem } from "@/components/Recruitment";
import { useGetRecruitmentByIdQuery } from "@/features/api/recruitment/getRecruitmentById";
import { usePostRecruitmentMutation } from "@/features/api/recruitment/postRecruitment";
import { AreasType, setAreas } from "@/features/areas/areasSlice";
import { useAppDispatch } from "@/features/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AreaDTO } from "@/types/DTO/AreaDTO";

function RecruitmentEdit() {
  const { recruitmentId = "" } = useParams();
  const dispatch = useAppDispatch();
  const [postRecruitment] = usePostRecruitmentMutation();
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId, {
    skip: recruitmentId === "",
  });

  const handlePostAreas = async (areas: Array<AreaDTO>) => {
    if (recruitmentData && recruitmentData.Data)
      await postRecruitment({
        Id: recruitmentId,
        Areas: areas,
        Name: recruitmentData.Data.Name,
        Enable: recruitmentData.Data.Enable,
      });
  };

  useEffect(() => {
    // set areas state after query subscription success
    if (recruitmentData?.Data)
      dispatch(
        setAreas({
          id: recruitmentData.Data.Id,
          type: AreasType.RECRUITMENT,
          areas: recruitmentData.Data.Areas,
        })
      );
  }, [recruitmentData, dispatch]);

  return (
    <>
      {recruitmentData && recruitmentData.Data && (
        <>
          <RecruitmentItem
            id={recruitmentId}
            title={recruitmentData.Data.Name}
          />
          <AreaEditor onPost={handlePostAreas} />
        </>
      )}
    </>
  );
}

export default RecruitmentEdit;
