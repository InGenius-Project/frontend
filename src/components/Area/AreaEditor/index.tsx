import DragDropContainer from '@/components/DragDropContainer';
import { CustomError } from '@/components/ErrorBoundary';
import { useDeleteAreaMutation } from '@/features/api/area/deleteArea';
import { usePostAreaMutation } from '@/features/api/area/postArea';
import { usePostSequenceMutation } from '@/features/api/area/postSequence';
import { AreasType, selectIsEmptyAreas } from '@/features/areas/areasSlice';
import { getUpdateAreaPost, initializeState, setLayoutByArea } from '@/features/layout/layoutSlice';
import { store, useAppDispatch, useAppSelector } from '@/features/store';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { NIL } from 'uuid';
import AreaControl from '../AreaControl';
import AreaEmpty from '../AreaEmpty';
import AreaItem from '../AreaItem';

function AreaEditor() {
  const dispatch = useAppDispatch();
  const areasState = useAppSelector((state) => state.areasState);
  const layoutState = useAppSelector((state) => state.layoutState);
  const isEmptyAreas = useAppSelector(selectIsEmptyAreas);
  const [controlTop, setControlTop] = React.useState<number | undefined>(0);
  const [deleteArea, { isLoading: isDeletingArea }] = useDeleteAreaMutation();
  const [postArea, { isLoading: isPostingArea }] = usePostAreaMutation();
  const [postSequence, { isLoading: isPostingSequence }] = usePostSequenceMutation();
  const areaItemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (areasState.areas) {
      const index = areasState.areas.findIndex((a) => a.Id === layoutState.areaId);
      if (index) {
        setControlTop(areaItemsRef.current[index]?.offsetTop);
        areaItemsRef.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [areasState.areas, layoutState.areaId]);

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

  const handleAddClick = () => {
    dispatch(initializeState());

    postArea({
      Id: NIL,
      Sequence: layoutState.sequence + 1,
      IsDisplayed: true,
      Title: 'New Area',
      UserId: areasState.type === AreasType.PROFILE ? areasState.id : undefined,
      RecruitmentId: areasState.type === AreasType.RECRUITMENT ? areasState.id : undefined,
      ResumeId: areasState.type === AreasType.RESUME ? areasState.id : undefined,
    });
  };

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (layoutState.areaId) {
      const areaIndex = areasState.areas?.findIndex((a) => a.Id === layoutState.areaId) || 0;
      deleteArea(layoutState.areaId)
        .unwrap()
        .then(() => {
          areasState.areas &&
            areasState.areas[areaIndex - 1] &&
            dispatch(setLayoutByArea(areasState.areas[areaIndex - 1]));
        });
    }
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
            <AreaEmpty onClick={handleAddClick} editable />
          </>
        )}

        {areasState.areas && (
          <DragDropContainer
            droppableId={areasState.id}
            items={areasState.areas.map((a) => a.Id)}
            onDragEnd={handleDragEnd}
            // onDragStart={handleDragStart}
          >
            {areasState.areas.map((a, i) => (
              <AreaItem
                key={a.Id}
                area={a}
                id={a.Id}
                ref={(el) => (areaItemsRef.current[i] = el)}
                focused={layoutState.areaId === a.Id}
                isLoadingSequence={isPostingSequence}
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
            isLoadingAdd={isPostingArea}
            isLoadingDelete={isDeletingArea}
            isLoadingVisibility={isPostingArea}
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
