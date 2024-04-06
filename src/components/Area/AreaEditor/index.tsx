import DragDropContainer from '@/components/DragDropContainer';
import { CustomError } from '@/components/ErrorBoundary';
import { useDeleteAreaMutation } from '@/features/api/area/deleteArea';
import { usePostAreaMutation } from '@/features/api/area/postArea';
import { usePostSequenceMutation } from '@/features/api/area/postSequence';
import { AreasType, selectIsEmptyAreas } from '@/features/areas/areasSlice';
import { getUpdateAreaPost, initializeState } from '@/features/layout/layoutSlice';
import { store, useAppDispatch, useAppSelector } from '@/features/store';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Box, IconButton, Portal, Stack } from '@mui/material';
import React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { NIL } from 'uuid';
import AreaControl from '../AreaControl';
import AreaEmpty from '../AreaEmpty';
import AreaItem from '../AreaItem';

function AreaEditor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const areasState = useAppSelector((state) => state.areasState);
  const layoutState = useAppSelector((state) => state.layoutState);
  const isEmptyAreas = useAppSelector(selectIsEmptyAreas);
  const [controlTop, setControlTop] = React.useState<number | undefined>(0);
  const [deleteArea] = useDeleteAreaMutation();
  const [postArea] = usePostAreaMutation();
  const [postSequence] = usePostSequenceMutation();

  const handleDragEnd = async (items: string[], result?: DropResult) => {
    if (areasState.areas) {
      const newAreas = items.map((i, index) => {
        const findArea = areasState.areas?.find((a) => a.Id === i);
        if (findArea) {
          return { ...findArea, Sequence: index };
        } else {
          throw new CustomError('移動區塊時發生問題', 403);
        }
      });

      // post new sequence
      postSequence(newAreas.map((a) => ({ Id: a.Id, Sequence: a.Sequence })));

      // set AreaControl top after drag end
      const dragItem = result
        ? document.querySelector<HTMLElement>(`[data-rbd-draggable-id='${result.draggableId}']`)
        : undefined;
      dragItem && setControlTop(dragItem?.offsetTop);
    }
  };

  // const handleDragStart: OnDragStartResponder = ({ draggableId }) => {
  //   if (areasState && areasState.areas) {
  //     const findArea = areasState.areas.find((a) => a.Id === draggableId);
  //     findArea && dispatch(setLayoutByArea(findArea));
  //   }
  // };

  const handleAddClick = () => {
    dispatch(initializeState());

    postArea({
      Id: NIL,
      Sequence: layoutState.sequence + 1,
      IsDisplayed: true,
      Title: 'New Area',
      UserId: areasState.type === AreasType.PROFILE ? areasState.id : undefined,
      RecruitmentId: areasState.type === AreasType.RECRUITMENT ? areasState.id : undefined,
    });
  };

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    layoutState.areaId && deleteArea(layoutState.areaId);
  };

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (layoutState.areaId) {
      const updatedArea = getUpdateAreaPost(store.getState());
      postArea({
        ...updatedArea,
        IsDisplayed: !checked,
      });
    }
  };

  const handleClickItem = (element: HTMLElement) => {
    setControlTop(element.offsetTop);
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
            <AreaEmpty onClick={handleAddClick} />
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
            // onDragStart={handleDragStart}
          >
            {areasState.areas.map((a) => (
              <AreaItem
                key={a.Id}
                id={a.Id}
                area={a}
                focused={layoutState.areaId === a.Id}
                onClick={handleClickItem}
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
