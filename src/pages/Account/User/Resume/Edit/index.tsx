import { Box, Button, Stack, Typography } from "@mui/material";
import { AreaControl } from "components/Area";
import AreaDragContainer from "components/Area/AreaDragContainer";
import FullScreenLoader from "components/FullScreenLoader";
import { ResumeItem } from "components/Resume";
import { useDeleteAreaMutation } from "features/api/area/area";
import { useGetResumeByIdQuery } from "features/api/resume/resume";
import { setType } from "features/layout/layoutSlice";
import { useAppDispatch } from "features/store";
import React from "react";
import ReactQuill from "react-quill";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { LayoutType } from "types/DTO/AreaDTO";

export default function ResumeEdit() {
  const { resumeId = "" } = useParams();
  const { data: res, isLoading } = useGetResumeByIdQuery(resumeId);
  const [deleteArea] = useDeleteAreaMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [controlTop, setControlTop] = React.useState<number | undefined>(0);
  const [focusedAreaId, setFocusedArea] = React.useState<string | undefined>();
  const [isEmptyLayout, setIsEmptyLayout] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (res && res.Data) {
      setIsEmptyLayout(!res.Data.Areas || res.Data.Areas.length < 1);
    }
  }, [res]);

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    dispatch(setType(LayoutType.USER));
    navigate("New");
  };

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    focusedAreaId && deleteArea(focusedAreaId);
  };

  const handleEditClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate(`Area/${focusedAreaId}`);
  };

  // If not provide id, redirect back
  if (!resumeId) {
    return <Navigate to=".." />;
  }
  if (isLoading) {
    return <FullScreenLoader />;
  }
  if (res && res.Data) {
    return (
      <Stack spacing={1}>
        <ResumeItem
          title={res.Data.Title}
          id={res.Data.Id}
          modifiedAt={res.Data.ModifiedAt}
          isEditable={true}
        ></ResumeItem>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexGrow: 1,
            gap: 1,
          }}
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
            {res.Data.Areas && (
              <AreaDragContainer
                items={res.Data.Areas.map((t) => ({
                  id: t.Id,
                  title: t.TextLayout.Title,
                  onClick: (top: number | undefined) => {
                    setFocusedArea(t.Id);
                    setControlTop(top);
                  },
                  children: (
                    <ReactQuill
                      theme="bubble"
                      value={t.TextLayout.Content}
                    ></ReactQuill>
                  ),
                }))}
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
                onAddClick={handleAddClick}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
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
