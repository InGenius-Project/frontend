import DragDropContainer from '@/components/DragDropContainer';
import { useDeleteAreaMutation } from '@/features/api/area/deleteArea';
import { usePostAreaMutation } from '@/features/api/area/postArea';
import { selectIsEmptyAreas } from '@/features/areas/areasSlice';
import { getUpdatedArea, setLayoutByArea } from '@/features/layout/layoutSlice';
import { store, useAppDispatch, useAppSelector } from '@/features/store';
import { IArea } from '@/types/interfaces/IArea';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Box, IconButton, Portal, Stack } from '@mui/material';
import React from 'react';
import { DropResult, OnDragStartResponder } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import AreaControl from '../AreaControl';
import AreaEmpty from '../AreaEmpty';
import AreaItem from '../AreaItem';
type AreaContainerProps = {
  onPost?: (areas: Array<IArea>) => Promise<void>;
};

function AreaEditor({ onPost }: AreaContainerProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const areasState = useAppSelector((state) => state.areasState);
  const layoutState = useAppSelector((state) => state.layoutState);
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
          throw new Error('移動區塊時發生問題');
        }
      });

      onPost && (await onPost(newAreas));

      // set AreaControl top after drag end
      const dragItem = result
        ? document.querySelector<HTMLElement>(`[data-rbd-draggable-id='${result.draggableId}']`)
        : undefined;
      dragItem && setControlTop(dragItem?.offsetTop);
    }
  };

  const handleDragStart: OnDragStartResponder = ({ draggableId }) => {
    if (areasState && areasState.areas) {
      const findArea = areasState.areas.find((a) => a.Id === draggableId);
      findArea && dispatch(setLayoutByArea(findArea));
    }
  };

  const handleAddClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // TODO: post emptyArea
  };

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    layoutState.areaId && deleteArea(layoutState.areaId);
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (layoutState.areaId) {
      const updatedArea = getUpdatedArea(store.getState());
      postArea({
        ...updatedArea,
        //TODO: PROFILE ID
        IsDisplayed: !checked,
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexGrow: 1,
        gap: 1,
        minHeight: 'var(--ing-height-area-control)',
      }}
    >
      <Stack
        spacing={1}
        sx={{
          flex: '1 1 auto',
          position: 'relative',
        }}
      >
        {isEmptyAreas && (
          <>
            <AreaEmpty />
            <Portal container={() => document.getElementById('userHeader')}>
              <IconButton size="small" sx={{ ml: 1 }} onClick={() => navigate('New')}>
                <CreateOutlinedIcon />
              </IconButton>
            </Portal>
          </>
        )}

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
                focused={layoutState.areaId === a.Id}
                onClick={(element) => {
                  setControlTop(element.offsetTop);
                }}
              ></AreaItem>
            ))}
          </DragDropContainer>
        )}
      </Stack>

      {!isEmptyAreas && (
        <Box
          sx={{
            flexShrink: 0,
            width: 'var(--ing-width-area-control)',
            position: 'relative',
          }}
        >
          <AreaControl
            top={controlTop}
            disabled={!layoutState.areaId}
            visibled={layoutState.isDisplayed}
            onAddClick={handleAddClick}
            onDeleteClick={handleDeleteClick}
            onVisibilityChange={handleVisibilityChange}
          />
        </Box>
      )}
    </Box>
  );
}

export default AreaEditor;
