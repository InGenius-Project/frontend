import { GuidEmpty } from "assets/utils/guid";
import { AreaEditModel } from "components/Area";
import {
  useGetAreaByIdQuery,
  usePostAreaMutation,
} from "features/api/area/area";
import {
  useGetResumeByIdQuery,
  usePostResumeMutation,
} from "features/api/resume/resume";
import { setLayoutByArea } from "features/layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "features/store";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AreaDTO, LayoutArrangement } from "types/DTO/AreaDTO";

export default function ResumeArea() {
  const { resumeId = "", areaId } = useParams();
  const [postArea, { isLoading }] = usePostAreaMutation();
  const { data: areaData } = useGetAreaByIdQuery(areaId!, {
    skip: !areaId,
  });
  const layoutState = useAppSelector((state) => state.layoutState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: resumeData } = useGetResumeByIdQuery(resumeId);
  const [postResume] = usePostResumeMutation();

  useLayoutEffect(() => {
    if (areaData && areaData.Data) {
      dispatch(setLayoutByArea(areaData.Data));
    }
  }, [areaData, dispatch]);

  const handleSubmit = () => {
    if (resumeData && resumeData.Data) {
      const areas = Array.from(resumeData.Data.Areas);

      const newAreaSequence = layoutState.focusedIndex + 1 || 0;
      const newAreas: AreaDTO = {
        Id: areaId ? areaId : GuidEmpty,
        Sequence: newAreaSequence, // set new index after focuslayout
        IsDisplayed: areaData?.Data?.IsDisplayed || true,
        TextLayout:
          layoutState.arrangement === LayoutArrangement.TEXT
            ? {
                Id: areaData?.Data?.TextLayout?.Id
                  ? areaData.Data.TextLayout.Id
                  : GuidEmpty,
                Title: layoutState.title,
                Arrangement: LayoutArrangement.TEXT,
                Type: layoutState.type,
                Content: JSON.stringify(layoutState.content),
              }
            : undefined,
      };

      // Insert the new area at the specified sequence
      areas.splice(newAreaSequence, 0, newAreas);

      // Update the Sequence for the rest of the areas
      for (let i = newAreaSequence + 1; i < areas.length; i++) {
        areas[i].Sequence = i;
      }

      postResume({
        Id: resumeId,
        Title: resumeData.Data.Title,
        Areas: areas,
      })
        .unwrap()
        .then(() => {
          navigate("..");
        });
    }
  };

  return <AreaEditModel onAddClick={handleSubmit} loading={isLoading} />;
}
