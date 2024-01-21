import { AreaEditModel } from "components/Area";
import {
  useGetAreaByIdQuery,
  usePostAreaMutation,
} from "features/api/area/area";
import { useGetRecruitmentByIdQuery } from "features/api/recruitment/getRecruitmentById";
import { usePostRecruitmentMutation } from "features/api/recruitment/postRecruitment";
import { useGetResumeByIdQuery } from "features/api/resume/getResumeById";
import { usePostResumeMutation } from "features/api/resume/postResume";
import { setLayoutByArea } from "features/layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "features/store";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AreaDTO, LayoutArrangement } from "types/DTO/AreaDTO";
import { NIL } from "uuid";

export default function RecruitmentArea() {
  const { recruitmentId = "", areaId } = useParams();
  const [postArea, { isLoading }] = usePostAreaMutation();
  const { data: areaData } = useGetAreaByIdQuery(areaId!, {
    skip: !areaId,
  });
  const layoutState = useAppSelector((state) => state.layoutState);
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
        const newAreaSequence = areasState.focusedArea
          ? areasState.focusedArea.Sequence
          : recruitementData.Data.Areas.length;
        const newArea: AreaDTO = {
          Id: NIL,
          Sequence: newAreaSequence,
          Type: layoutState.type,
          IsDisplayed: true,
          Title: layoutState.title,
          Arrangement: layoutState.arrangement,
          TextLayout:
            layoutState.arrangement === LayoutArrangement.TEXT
              ? {
                  Id: NIL,
                  Content: JSON.stringify(layoutState.content),
                }
              : undefined,
          ImageTextLayout:
            layoutState.arrangement === LayoutArrangement.IMAGETEXT
              ? {
                  Id: NIL,
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
                  Items: (layoutState.listItems || []).map((i) => ({
                    Id: NIL,
                    Name: i.name,
                    Type: "CUSTOM", // TODO: Base on area type
                  })),
                }
              : undefined,
          KeyValueListLayout:
            layoutState.arrangement === LayoutArrangement.KEYVALUELIST
              ? {
                  Id: NIL,
                  Items: (layoutState.keyValueListItems || []).map((i) => ({
                    Id: NIL,
                    Key: {
                      Id: NIL,
                      Name: i.key.name,
                      Type: "CUSTOM",
                    },
                    Value: i.value,
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

        // Post full Resume for update the sequence of the areas
        postRecruitment({
          Id: recruitmentId,
          Name: recruitementData.Data.Name,
          Enable: recruitementData.Data.Enable,
          Areas: areas,
        })
          .unwrap()
          .then(() => {
            navigate("..");
            return;
          });
      } else {
        // Update the existing area
        areas[existAreaIndex] = {
          ...areas[existAreaIndex],
          Title: layoutState.title,
          Arrangement: layoutState.arrangement,
          Type: layoutState.type,
          TextLayout:
            layoutState.arrangement === LayoutArrangement.TEXT
              ? {
                  Id: areaData?.Data?.TextLayout?.Id
                    ? areaData.Data.TextLayout.Id
                    : NIL,

                  Content: JSON.stringify(layoutState.content),
                }
              : undefined,
          ImageTextLayout:
            layoutState.arrangement === LayoutArrangement.IMAGETEXT
              ? {
                  Id: areaData?.Data?.TextLayout?.Id
                    ? areaData.Data.TextLayout.Id
                    : NIL,
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
                  Id: areaData?.Data?.ListLayout?.Id
                    ? areaData.Data.ListLayout.Id
                    : NIL,

                  Items: (layoutState.listItems || []).map((i) => ({
                    Id: NIL,
                    Name: i.name,
                    Type: "CUSTOM", // TODO: Base on area type
                  })),
                }
              : undefined,
          KeyValueListLayout:
            layoutState.arrangement === LayoutArrangement.KEYVALUELIST
              ? {
                  Id: areaData?.Data?.KeyValueListLayout?.Id
                    ? areaData.Data.KeyValueListLayout.Id
                    : NIL,
                  Items: (layoutState.keyValueListItems || []).map((i) => ({
                    Id: NIL,
                    Key: {
                      Id: NIL,
                      Name: i.key.name,
                      Type: "CUSTOM",
                    },
                    Value: i.value,
                  })),
                }
              : undefined,
        };

        postArea({
          ...areas[existAreaIndex],
        })
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
