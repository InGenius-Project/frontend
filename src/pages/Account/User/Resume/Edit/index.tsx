import { Box, Button, Stack, Typography } from "@mui/material";
import { AreaControl } from "components/Area";
import AreaItem from "components/Area/AreaItem";
import AreaKeyValueListItem from "components/Area/AreaKeyValueListItem";
import AreaListItem from "components/Area/AreaListItem";
import DragDropContainer from "components/DragDropContainer";
import FullScreenLoader from "components/FullScreenLoader";
import { ResumeItem } from "components/Resume";
import RichTextEditor from "components/RichTextEditor";
import {
  useDeleteAreaMutation,
  usePostAreaMutation,
} from "features/api/area/area";
import {
  useDeleteResumeMutation,
  useGetResumeByIdQuery,
  usePostResumeMutation,
} from "features/api/resume/resume";
import { setFocusedAreaDTO, setType } from "features/layout/layoutSlice";
import { useAppDispatch, useAppSelector } from "features/store";
import React, { useEffect, useRef } from "react";
import { OnDragStartResponder } from "react-beautiful-dnd";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AreaDTO, LayoutArrangement, LayoutType } from "types/DTO/AreaDTO";

export default function ResumeEdit() {
  const { resumeId = "" } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [controlTop, setControlTop] = React.useState<number | undefined>(0);
  // const [focusedArea, setFocusedArea] = React.useState<AreaDTO>();
  const [isEmptyLayout, setIsEmptyLayout] = React.useState<boolean>(false);
  const areaContainerRef = useRef(null);

  const { focusedAreaDTO } = useAppSelector((state) => state.layoutState);
  const { data: resumeData, isLoading: isLoadingResume } =
    useGetResumeByIdQuery(resumeId);
  const [deleteArea] = useDeleteAreaMutation();
  const [postResume] = usePostResumeMutation();
  const [deleteResume] = useDeleteResumeMutation();
  const [postArea] = usePostAreaMutation();

  useEffect(() => {
    if (resumeData && resumeData.Data) {
      // Set Empty State
      setIsEmptyLayout(
        !resumeData.Data.Areas || resumeData.Data.Areas.length < 1
      );
    }
  }, [resumeData]);

  useEffect(() => {
    if (resumeData && resumeData.Data) {
      // Set FoucesArea to first Areas
      if (resumeData.Data.Areas && !focusedAreaDTO) {
        console.log("set");
        const firstAreas = resumeData.Data.Areas.find((a) => a.Sequence === 0);
        firstAreas && dispatch(setFocusedAreaDTO(firstAreas));
      }
    }
  }, [resumeData, dispatch, focusedAreaDTO]);

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    dispatch(setType(LayoutType.USER));
    navigate("New");
  };

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    focusedAreaDTO && deleteArea(focusedAreaDTO.Id);
  };

  const handleEditClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    focusedAreaDTO && navigate(`Area/${focusedAreaDTO.Id}`);
  };

  const handleAreaVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    focusedAreaDTO &&
      postArea({
        ...focusedAreaDTO,
        ResumeId: resumeId,
        IsDisplayed: !checked,
      });
  };

  const handleChangeTitle = (title: string) => {
    if (resumeData && resumeData.Data)
      postResume({
        Title: title,
        Id: resumeId,
        Areas: resumeData?.Data.Areas,
        Visibility: resumeData.Data.Visibility,
      });
  };

  const handleDeleteResume = async (id: string) => {
    await deleteResume(id)
      .unwrap()
      .then(() => navigate(".."));
  };

  const handleDragEnd = async (items: string[]) => {
    if (resumeData && resumeData.Data) {
      const newAreas = items.map((i, index) => {
        const findArea = resumeData!.Data!.Areas.find((a) => a.Id === i);
        if (findArea) {
          return { ...findArea, Sequence: index };
        } else {
          throw new Error("移動區塊時發生問題");
        }
      });

      await postResume({
        Title: resumeData.Data.Title,
        Id: resumeId,
        Areas: newAreas,
        Visibility: resumeData.Data.Visibility,
      });
    }
  };

  const handleDragStart: OnDragStartResponder = ({ draggableId }) => {
    if (resumeData && resumeData.Data) {
      const findArea = resumeData!.Data!.Areas.find(
        (a) => a.Id === draggableId
      );
      findArea && dispatch(setFocusedAreaDTO(findArea));
    }
  };

  // If not provide id, redirect back
  if (!resumeId) {
    return <Navigate to=".." />;
  }
  if (isLoadingResume) {
    return <FullScreenLoader />;
  }
  if (resumeData && resumeData.Data) {
    return (
      <Stack spacing={1}>
        <ResumeItem
          title={resumeData.Data.Title}
          id={resumeData.Data.Id}
          modifiedAt={resumeData.Data.ModifiedAt}
          isEditable={true}
          onChangeTitle={handleChangeTitle}
          onDelete={handleDeleteResume}
        ></ResumeItem>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexGrow: 1,
            gap: 1,
          }}
          ref={areaContainerRef}
        >
          <Stack
            spacing={1}
            sx={{
              flex: "1 1 auto",
              position: "relative",
            }}
          >
            {isEmptyLayout && (
              <Stack spacing={1} direction={"row"}>
                <Typography variant="h5">暫無區塊</Typography>
                <Box>
                  <Button onClick={handleAddClick} variant="text">
                    + 按此新增區塊
                  </Button>
                </Box>
              </Stack>
            )}

            <DragDropContainer
              droppableId={resumeData.Data.Id}
              items={resumeData.Data.Areas.map((a) => a.Id)}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
            >
              {resumeData.Data.Areas.map((a) => (
                <AreaItem
                  key={a.Id}
                  id={a.Id}
                  title={a.Title}
                  focused={focusedAreaDTO?.Id === a.Id}
                  onClick={(element) => {
                    setControlTop(element.offsetTop);
                    dispatch(setFocusedAreaDTO(a));
                  }}
                >
                  {a.Arrangement === LayoutArrangement.TEXT && (
                    <RichTextEditor
                      controllable={false}
                      initialEditorState={a.TextLayout?.Content}
                    ></RichTextEditor>
                  )}
                  {a.Arrangement === LayoutArrangement.LIST &&
                    a.ListLayout?.Items?.map((i) => (
                      <AreaListItem id={i.Id} content={i.Name} key={i.Id} />
                    ))}

                  {a.Arrangement === LayoutArrangement.KEYVALUELIST &&
                    a.KeyValueListLayout?.Items?.map((i) => (
                      <AreaKeyValueListItem
                        id={i.Id}
                        key={i.Id}
                        itemKey={{
                          id: i.Key.Id,
                          name: i.Key.Name,
                          type: i.Key.Type,
                        }}
                        value={i.Value}
                      />
                    ))}
                </AreaItem>
              ))}
            </DragDropContainer>
          </Stack>

          {!isEmptyLayout && (
            <Box
              sx={{
                flexShrink: 0,
                width: "var(--ing-width-areaControl)",
                position: "relative",
              }}
            >
              <AreaControl
                top={controlTop}
                disabled={!focusedAreaDTO || isLoadingResume}
                visibled={focusedAreaDTO && focusedAreaDTO.IsDisplayed}
                onAddClick={handleAddClick}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
                onVisibilityChange={handleAreaVisibilityChange}
              />
            </Box>
          )}
        </Box>
      </Stack>
    );
  } else {
    return null;
  }
}
