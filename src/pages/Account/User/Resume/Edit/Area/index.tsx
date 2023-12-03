import { AreaEditModel } from "components/Area";
import { usePostResumeAreaMutation } from "features/api/resume/resume";
import { useAppSelector } from "features/store";
import { useParams } from "react-router-dom";

export default function ResumeArea() {
  const { resumeId = "", areaId = "" } = useParams();
  const [postResumeArea, isLoading] = usePostResumeAreaMutation();
  const areaState = useAppSelector((state) => state.areaState);

  const handleSubmit = () => {
    // postResumeArea({
    //   ResumeId : id,
    //   TextLayout: {
    //     Id: areaId,
    //     Title: areaState.title,
    //     Type : areaState.type,
    //     Arrangement: areaState.arrangement,
    //     Content:
    //   }
    // })
  };

  return <AreaEditModel onAddClick={handleSubmit} />;
}
