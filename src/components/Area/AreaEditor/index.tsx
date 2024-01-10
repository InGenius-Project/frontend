import { Box, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/store";
import React from "react";
import AreaEmpty from "../AreaEmpty";
import AreaControl from "../AreaControl";
import {
  AreasType,
  selectIsEmptyAreas,
  setFocusedArea,
} from "features/areas/areasSlice";
import DragDropContainer from "components/DragDropContainer";
import { DropResult, OnDragStartResponder } from "react-beautiful-dnd";
import { AreaDTO, LayoutType } from "types/DTO/AreaDTO";
import AreaItem from "../AreaItem";
import { useNavigate } from "react-router-dom";
import {
  useDeleteAreaMutation,
  usePostAreaMutation,
} from "features/api/area/area";
import { setType } from "features/layout/layoutSlice";

type AreaContainerProps = {
  onPost?: (areas: Array<AreaDTO>) => Promise<void>;
};

function AreaEditor({ onPost }: AreaContainerProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const areasState = useAppSelector((state) => state.areasState);
  const isEmptyAreas = useAppSelector(selectIsEmptyAreas);
  const [controlTop, setControlTop] = React.useState<number | undefined>(0);
  const [deleteArea] = useDeleteAreaMutation();
  const [postArea] = usePostAreaMutation();

  const handleDragEnd = async (items: string[], result?: DropResult) => {
    if (areasState.areas) {
      const newAreas = items.map((i, index) => {
        const findArea = areasState.areas?.find((a) => a.Id === i);
        if (findArea) {
          return { ...findArea, Sequence: index };
        } else {
          throw new Error("移動區塊時發生問題");
        }
      });

      onPost && (await onPost(newAreas));

      // set AreaControl top after drag end
      const dragItem = result
        ? document.querySelector<HTMLElement>(
            `[data-rbd-draggable-id='${result.draggableId}']`
          )
        : undefined;
      dragItem && setControlTop(dragItem?.offsetTop);
    }
  };

  const handleDragStart: OnDragStartResponder = ({ draggableId }) => {
    if (areasState && areasState.areas) {
      const findArea = areasState.areas.find((a) => a.Id === draggableId);
      findArea && dispatch(setFocusedArea(findArea));
    }
  };

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    dispatch(setType(LayoutType.USER));
    navigate("New");
  };

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    areasState.focusedArea && deleteArea(areasState.focusedArea.Id);
  };

  const handleEditClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    areasState.focusedArea && navigate(`Area/${areasState.focusedArea.Id}`);
  };

  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    areasState.focusedArea &&
      postArea({
        ...areasState.focusedArea,
        ResumeId:
          areasState.type === AreasType.RESUME ? areasState.id : undefined,
        //TODO: PROFILE ID
        IsDisplayed: !checked,
      });
  };

  return (
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
        {isEmptyAreas && <AreaEmpty />}

        {areasState.areas && (
          <DragDropContainer
            droppableId={areasState.id}
            items={areasState.areas.map((a) => a.Id)}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            {areasState.areas.map((a) => (
              <AreaItem
                key={a.Id}
                id={a.Id}
                area={a}
                focused={areasState.focusedArea?.Id === a.Id}
                onClick={(element) => {
                  setControlTop(element.offsetTop);
                  dispatch(setFocusedArea(a));
                }}
              ></AreaItem>
            ))}
          </DragDropContainer>
        )}
      </Stack>

      <Box
        sx={{
          flexShrink: 0,
          width: "var(--ing-width-areaControl)",
          position: "relative",
        }}
      >
        <AreaControl
          top={controlTop}
          disabled={!areasState.focusedArea}
          visibled={
            areasState.focusedArea && areasState.focusedArea.IsDisplayed
          }
          onAddClick={handleAddClick}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
          onVisibilityChange={handleVisibilityChange}
        />
      </Box>
    </Box>
  );
}

export default AreaEditor;
