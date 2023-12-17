import { AreaEditModel } from "components/Area";
import {
  useGetAreaByIdQuery,
  usePostAreaMutation,
} from "features/api/area/area";
import { setLayoutByArea } from "features/layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "features/store";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutArrangement } from "types/DTO/AreaDTO";

export default function ResumeArea() {
  const { resumeId = "", areaId } = useParams();
  const [postArea, { isLoading }] = usePostAreaMutation();
  const { data: areaData } = useGetAreaByIdQuery(areaId!, {
    skip: !areaId,
  });
  const layoutState = useAppSelector((state) => state.layoutState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (areaData && areaData.Data) {
      dispatch(setLayoutByArea(areaData.Data));
    }
  }, [areaData, dispatch]);

  const handleSubmit = () => {
    postArea({
      ResumeId: resumeId,
      Id: areaId ? areaId : undefined,
      Sequence: areaData?.Data?.Sequence || 0,
      IsDisplayed: areaData?.Data?.IsDisplayed || true,
      TextLayout:
        layoutState.arrangement === LayoutArrangement.TEXT
          ? {
              Id: areaData?.Data?.TextLayout.Id!,
              Title: layoutState.title,
              Arrangement: LayoutArrangement.TEXT,
              Type: layoutState.type,
              Content: JSON.stringify(layoutState.content),
            }
          : undefined,
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
