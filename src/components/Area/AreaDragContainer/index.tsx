import React, { useState, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProps,
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
};

const AreaDragContainer = ({ items, onDragEnd }: AreaDragContainerProps) => {
  const [areaItems, setAreaItems] = useState(items);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const updatedItems = reorder(
        areaItems,
        result.source.index,
        result.destination.index
      );

      setAreaItems(updatedItems);
      onDragEnd && onDragEnd(updatedItems);
    },
    [areaItems, onDragEnd]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StrictModeDroppable droppableId="droppable">
        {(provided, snapshot) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            spacing={1}
          >
            {areaItems.map((item, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    sx={{
                      opacity: snapshot.isDragging ? 0.7 : 1,
                      ...provided.draggableProps.style,
                    }}
                  >
                    <AreaItem
                      {...item}
                      dragProps={provided.dragHandleProps}
                      index={index}
                    />
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default AreaDragContainer;
