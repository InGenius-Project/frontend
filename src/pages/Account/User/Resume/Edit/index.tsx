import { Box, Button, Stack, Typography } from "@mui/material";
import { GuidEmpty } from "assets/utils/guid";
import { AreaControl } from "components/Area";
import AreaDragContainer from "components/Area/AreaDragContainer";
import { AreaItemProps } from "components/Area/AreaItem";
import FullScreenLoader from "components/FullScreenLoader";
import { ResumeItem } from "components/Resume";
import RichTextEditor from "components/RichTextEditor";
import {
  useDeleteAreaMutation,
  usePostAreaMutation,
} from "features/api/area/area";
import {
  resumeApi,
  useDeleteResumeMutation,
  useGetResumeByIdQuery,
  usePostResumeMutation,
} from "features/api/resume/resume";
import { setType } from "features/layout/layoutSlice";
import { useAppDispatch } from "features/store";
import React, { useEffect, useRef } from "react";
import {
  OnDragStartResponder,
  OnDragUpdateResponder,
} from "react-beautiful-dnd";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AreaDTO, LayoutType } from "types/DTO/AreaDTO";
import { useDebounce, useEffectOnce, useOnClickOutside } from "usehooks-ts";

export default function ResumeEdit() {
  const { resumeId = "" } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [controlTop, setControlTop] = React.useState<number | undefined>(0);
  const [focusedArea, setFocusedArea] = React.useState<AreaDTO>();
  const deboucedFocusArea = useDebounce(focusedArea, 500);
  const [isEmptyLayout, setIsEmptyLayout] = React.useState<boolean>(false);
  const areaContainerRef = useRef(null);

  const { data: resumeData, isLoading: isLoadingResume } =
    useGetResumeByIdQuery(resumeId);
  const [deleteArea, { isLoading: isDeletingArea }] = useDeleteAreaMutation();
  const [postResume, { isLoading: isPostingResume }] = usePostResumeMutation();
  const [deleteResume, { isLoading: isDeletingResume }] =
    useDeleteResumeMutation();
  const [postArea, { isLoading: isPostingArea }] = usePostAreaMutation();

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
      if (resumeData.Data.Areas && !focusedArea) {
        const firstAreas = resumeData.Data.Areas.find((a) => a.Sequence === 0);
        setFocusedArea(firstAreas);
      }
    }
  }, [resumeData, focusedArea]);

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    dispatch(setType(LayoutType.USER));
    navigate("New");
  };

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    focusedArea && deleteArea(focusedArea.Id);
  };

  const handleEditClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    focusedArea && navigate(`Area/${focusedArea.Id}`);
  };

  const handleAreaVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    focusedArea &&
      postArea({
        ...focusedArea,
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
      });
  };

  const handleDeleteResume = async (id: string) => {
    await deleteResume(id)
      .unwrap()
      .then(() => navigate(".."));
  };

  const handleDragEnd = async (items: AreaItemProps[]) => {
    if (resumeData && resumeData.Data) {
      const newAreas = items.map((i, index) => {
        const findArea = resumeData!.Data!.Areas.find((a) => a.Id === i.id);
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
      });
    }
  };
  // React.useEffect(() => {
  //   console.log(resumeData?.Data?.Areas);
  // }, [resumeData]);

  const handleDragStart: OnDragStartResponder = ({ draggableId }) => {
    if (resumeData && resumeData.Data) {
      const findArea = resumeData!.Data!.Areas.find(
        (a) => a.Id === draggableId
      );
      setFocusedArea(findArea);
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
            {resumeData.Data.Areas && (
              <AreaDragContainer
                items={resumeData.Data.Areas.map((a) => ({
                  id: a.Id,
                  title: a.TextLayout?.Title,
                  index: a.Sequence,
                  focused: deboucedFocusArea?.Id === a.Id,
                  onClick: (top: number | undefined) => {
                    setFocusedArea(a);
                    setControlTop(top);
                  },
                  children: (
                    <RichTextEditor
                      controllable={false}
                      initialEditorState={a.TextLayout?.Content}
                    ></RichTextEditor>
                  ),
                }))}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
              />
            )}
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
                disabled={
                  !focusedArea ||
                  isLoadingResume ||
                  isDeletingArea ||
                  isPostingArea ||
                  isDeletingResume ||
                  isPostingResume
                }
                visibled={focusedArea && focusedArea.IsDisplayed}
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
