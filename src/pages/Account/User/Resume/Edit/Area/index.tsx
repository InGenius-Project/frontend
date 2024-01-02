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
import { NIL } from "uuid";

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
      let areas = Array.from(resumeData.Data.Areas);

      const existAreaIndex = areas.findIndex(
        (area) => area.Id === areaData?.Data?.Id
      );

      // Create a new area if not exist
      if (existAreaIndex === -1) {
        const newAreaSequence = layoutState.focusedIndex;
        const newArea: AreaDTO = {
          Id: NIL,
          Sequence: newAreaSequence,
          IsDisplayed: areaData?.Data?.IsDisplayed || true,
          TextLayout:
            layoutState.arrangement === LayoutArrangement.TEXT
              ? {
                  Id: NIL,
                  Title: layoutState.title,
                  Arrangement: LayoutArrangement.TEXT,
                  Type: layoutState.type,
                  Content: JSON.stringify(layoutState.content),
                }
              : undefined,
          ImageTextLayout:
            layoutState.arrangement === LayoutArrangement.IMAGETEXT
              ? {
                  Id: NIL,
                  Title: layoutState.title,
                  Arrangement: LayoutArrangement.IMAGETEXT,
                  Type: layoutState.type,
                  Content: JSON.stringify(layoutState.content),
                  Image: {
                    Id: NIL,
                    Content: layoutState.image || "",
                  },
                }
              : undefined,
          ListLayout:
            layoutState.arrangement === LayoutArrangement.LIST
              ? {
                  Id: NIL,
                  Title: layoutState.title,
                  Arrangement: LayoutArrangement.LIST,
                  Type: layoutState.type,
                  Items: layoutState.listItems.map((i) => ({
                    Id: NIL,
                    Name: i.name,
                    Type: "CUSTOM", // TODO: Base on area type
                  })),
                }
              : undefined,
        };

        // Insert the new area at the specified sequence
        areas.splice(newAreaSequence + 1, 0, newArea);

        // Update the Sequence for the rest of the areas
        const updatedAreas = areas.map((area, i) => {
          return {
            ...area,
            Sequence: i,
          };
        });

        // Replace the old areas array with the updated one
        areas = updatedAreas;
      } else {
        // Update the existing area
        areas[existAreaIndex] = {
          ...areas[existAreaIndex],
          IsDisplayed: areaData?.Data?.IsDisplayed || true,
          TextLayout:
            layoutState.arrangement === LayoutArrangement.TEXT
              ? {
                  Id: areaData?.Data?.TextLayout?.Id
                    ? areaData.Data.TextLayout.Id
                    : NIL,
                  Title: layoutState.title,
                  Arrangement: LayoutArrangement.TEXT,
                  Type: layoutState.type,
                  Content: JSON.stringify(layoutState.content),
                }
              : undefined,
          ImageTextLayout:
            layoutState.arrangement === LayoutArrangement.IMAGETEXT
              ? {
                  Id: areaData?.Data?.TextLayout?.Id
                    ? areaData.Data.TextLayout.Id
                    : NIL,
                  Title: layoutState.title,
                  Arrangement: LayoutArrangement.IMAGETEXT,
                  Type: layoutState.type,
                  Content: JSON.stringify(layoutState.content),
                  Image: {
                    Id: areaData?.Data?.ImageTextLayout?.Id
                      ? areaData?.Data?.ImageTextLayout?.Id
                      : NIL,
                    Content: layoutState.image || "",
                  },
                }
              : undefined,
          ListLayout:
            layoutState.arrangement === LayoutArrangement.LIST
              ? {
                  Id: areaData?.Data?.TextLayout?.Id
                    ? areaData.Data.TextLayout.Id
                    : NIL,
                  Title: layoutState.title,
                  Arrangement: LayoutArrangement.LIST,
                  Type: layoutState.type,
                  Items: layoutState.listItems.map((i) => ({
                    Id: i.id,
                    Name: i.name,
                    Type: "CUSTOM", // TODO: Base on area type
                  })),
                }
              : undefined,
        };
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
