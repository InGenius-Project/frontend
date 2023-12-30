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

const reorder = (list: Array<string>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type DragDropContainerProps = {
  /** Droppable container unique id  */
  droppableId: string;
  /** Storing the list of item's id */
  items: Array<string>;
  /** Should put the element that extends DraggableProvidedDragHandleProps*/
  children: React.ReactNode;
  /** Spacing between items */
  spacing?: number;
  /** return the list of item's id onDragEnd */
  onDragEnd: (items: string[]) => void;
  onDragStart?: OnDragStartResponder;
  onDragUpdate?: OnDragUpdateResponder;
};

/**
 *  A Component that feature the drag drop function on the children
 */
const DragDropContainer = ({
  droppableId,
  items,
  children,
  spacing = 1,
  onDragEnd,
  onDragStart,
  onDragUpdate,
}: DragDropContainerProps) => {
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
      <StrictModeDroppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            spacing={spacing}
          >
            {React.Children.map(children, (child, index) => {
              if (React.isValidElement(child)) {
                return (
                  <Draggable draggableId={child.props.id} index={index}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                          opacity: snapshot.isDragging ? 0.7 : 1,
                          ...provided.draggableProps.style,
                        }}
                      >
                        {React.cloneElement(child, {
                          ...provided.dragHandleProps,
                        })}
                      </Box>
                    )}
                  </Draggable>
                );
              }
              return child;
            })}

            {provided.placeholder}
          </Stack>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default DragDropContainer;
