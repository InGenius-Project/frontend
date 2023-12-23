import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProps,
  OnDragStartResponder,
  OnDragUpdateResponder,
} from "react-beautiful-dnd";
import { Box, Stack } from "@mui/material";
import AreaItem, { AreaItemProps } from "../AreaItem";

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  React.useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

const reorder = (
  list: Array<AreaItemProps>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type AreaDragContainerProps = {
  items: Array<AreaItemProps>;
  onDragEnd?: (items: AreaItemProps[]) => void;
  onDragStart?: OnDragStartResponder;
  onDragUpdate?: OnDragUpdateResponder;
};

const AreaDragContainer = ({
  items,
  onDragEnd,
  onDragStart,
  onDragUpdate,
}: AreaDragContainerProps) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    onDragEnd && onDragEnd(updatedItems);
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <StrictModeDroppable droppableId="droppable">
        {(provided, snapshot) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            spacing={1}
          >
            {items.map((item, index: number) => (
              <DraggableAreaItem item={item} index={index} key={item.id} />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

type DraggableAreaItemProps = {
  item: AreaItemProps;
  index: number;
};

function DraggableAreaItem({ item, index }: DraggableAreaItemProps) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            opacity: snapshot.isDragging ? 0.7 : 1,
            ...provided.draggableProps.style,
          }}
        >
          <AreaItem {...item} dragProps={provided.dragHandleProps} />
        </Box>
      )}
    </Draggable>
  );
}

export default AreaDragContainer;
