import { useConfirm } from 'material-ui-confirm';
import React, { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { Box, Button, Paper, Step, StepLabel, Stepper, Typography, useTheme } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { v4 as uuid } from 'uuid';
import {
  usePostAreaMutation,
  usePostKeyValueListLayoutMutation,
  usePostListLayoutMutation,
  usePostTextLayoutMutation,
  usePostImageTextLayoutMutation,
} from '@/features/api/area';
import {
  AreaStep,
  getUpdateAreaPost,
  getUpdatedArea,
  initializeState,
  selectLayoutType,
  setAreaTypeId,
  setLayoutByArea,
} from '@/features/layout/layoutSlice';
import { store, useAppDispatch, useAppSelector } from '@/features/store';
import { LayoutType } from '@/types/enums/LayoutType';
import { IArea } from '@/types/interfaces/IArea';

import AreaDisplayItem from '../AreaDisplayItem';
import AreaEditItem from '../AreaEditItem';
import AreaLayoutItem from '../AreaLayoutItem';
import AreaNewItem from '../AreaNewItem';

export type AreaItemProps = {
  onClick?: (element: HTMLElement) => void;
  area: IArea;
  focused?: boolean;
  id: string; // for draggable id
} & Partial<DraggableProvidedDragHandleProps>;

const AreaItem = ({ onClick, area, children, focused, ...props }: PropsWithChildren<AreaItemProps>) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const ref = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [focusedState, setFocusState] = useState(false);

  const [activeStep, setActiveStep] = useState(AreaStep.New);
  const [warning, setWarning] = useState('');
  const [hisSteps, setHisSteps] = useState(new Set<AreaStep>());

  const layoutState = useAppSelector((state) => state.layoutState);
  const layoutType = useAppSelector(selectLayoutType);

  const [postArea] = usePostAreaMutation();
  const [postListLayout] = usePostListLayoutMutation();
  const [postTextLayout] = usePostTextLayoutMutation();
  const [postKeyValueListLayout] = usePostKeyValueListLayoutMutation();
  const [postImageTextLayout] = usePostImageTextLayoutMutation();

  const isStepDone = useCallback(
    (step: number) => {
      return hisSteps.has(step);
    },
    [hisSteps],
  );

  const isStepOptional = useCallback((step: number) => {
    return step === 0;
  }, []);

  const handleNext = useCallback(() => {
    let newHisSteps = new Set<AreaStep>(hisSteps);

    if (activeStep === AreaStep.New) {
      newHisSteps.add(AreaStep.New);

      if (!!layoutType) {
        setActiveStep(AreaStep.Edit);
      } else {
        setActiveStep(AreaStep.Layout);
      }
    }

    if (activeStep === AreaStep.Layout) {
      newHisSteps.add(AreaStep.Layout);

      if (layoutType === undefined) {
        setWarning('請選擇類型');
        return;
      }
      setWarning('');
      setActiveStep(AreaStep.Edit);
    }

    setHisSteps(newHisSteps);
  }, [hisSteps, activeStep, layoutType]);

  const handleSkip = useCallback(() => {
    setHisSteps(new Set<AreaStep>([AreaStep.New]));

    setActiveStep(AreaStep.Layout);

    dispatch(setAreaTypeId(null));
  }, [dispatch]);

  const handleBack = useCallback(() => {
    const prevStep = Math.max(...hisSteps);

    if (prevStep >= 0) {
      const handleStepChange = () => {
        setHisSteps((prevSteps) => {
          const newHisSteps = new Set(prevSteps);
          newHisSteps.delete(prevStep);
          return newHisSteps;
        });
        setActiveStep(prevStep);
      };

      if (activeStep === AreaStep.Edit) {
        confirm({ description: '確定要捨棄目前的內容嗎' })
          .then(handleStepChange)
          .catch(() => {
            return;
          });
      } else {
        handleStepChange();
      }
    } else {
      dispatch(initializeState());
    }
  }, [hisSteps, activeStep, confirm, dispatch]);

  const handleItemClick = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    onClick && onClick(ref.current as HTMLElement);
  }, [onClick]);

  const handleSave = useCallback(async () => {
    const state = store.getState();
    const updateAreaPost = getUpdateAreaPost(state);
    const updateArea = getUpdatedArea(state);

    postArea(updateAreaPost)
      .then(async (res: any) => {
        if (res.data.result) {
          switch (layoutType) {
            case LayoutType.List:
              postListLayout({
                areaId: res.data.result.Id,
                Items: updateArea.ListLayout?.Items,
              });
              break;
            case LayoutType.Text:
              postTextLayout({
                areaId: res.data.result.Id,
                Content: updateArea.TextLayout?.Content || '',
              });
              break;
            case LayoutType.KeyValueList:
              const a = {
                areaId: res.data.result.Id,
                Items: (updateArea.KeyValueListLayout?.Items || []).map((i) => ({
                  Id: i.Id,
                  TagId: i.Key?.Id,
                  Value: i.Value,
                })),
              };
              postKeyValueListLayout(a);
              break;
            case LayoutType.ImageText:
              const form = new FormData();

              let blob = await fetch(updateArea.ImageTextLayout?.Image?.Uri || '').then((r) => r.blob());

              form.append('Image', blob, updateArea.ImageTextLayout?.Image?.AltContent || 'Untitled');
              form.append('TextContent', updateArea.ImageTextLayout?.TextContent || '');
              form.append('AltContent', updateArea.ImageTextLayout?.Image?.AltContent || 'Untitled');
              form.append('ImageUri', updateArea.ImageTextLayout?.Image?.Uri || '');

              postImageTextLayout({
                AreaId: res.data.result.Id,
                FormData: form,
              });

              break;
          }
        }
      })
      .then(() => {
        dispatch(initializeState());
      });
  }, [layoutType, postArea, postListLayout, postTextLayout, postKeyValueListLayout, postImageTextLayout, dispatch]);

  const steps = useMemo(
    () => [
      {
        step: AreaStep.New,
        label: '選擇預設類型',
        item: <AreaNewItem onClickNext={handleNext} key="new" />,
      },
      {
        step: AreaStep.Layout,
        label: '選擇版面',
        item: <AreaLayoutItem key={'layout'} />,
      },
      {
        step: AreaStep.Edit,
        label: '編輯內容',
        item: <AreaEditItem key={'edit'} />,
      },
    ],
    [handleNext],
  );

  const handleDisplayItemClick = useCallback(() => {
    dispatch(setLayoutByArea(area));
    const state = store.getState().layoutState;

    if (typeof state.areaTypeId === 'number') {
      setActiveStep(AreaStep.Edit);
      setHisSteps(new Set<AreaStep>([AreaStep.New]));
      return;
    } else if (typeof state.layoutType === 'number') {
      setActiveStep(AreaStep.Edit);
      setHisSteps(new Set<AreaStep>([AreaStep.New, AreaStep.Layout]));
    } else {
      setActiveStep(AreaStep.New);
    }
  }, [dispatch, area]);

  useEffect(() => {
    setFocusState(focused ? focused : false);
  }, [focused]);

  return (
    <Paper
      ref={ref}
      tabIndex={0}
      sx={{
        padding: 3,
        position: 'relative',
        '&::before': focusedState
          ? {
              content: '""',
              height: '100%',
              position: 'absolute',
              borderRadius: 4,
              left: 0,
              top: 0,
              backgroundColor: theme.palette.primary.main,
              width: 5,
            }
          : undefined,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleItemClick}
    >
      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          justifyContent: 'center',
          cursor: 'move',
          display: isHover ? 'flex' : 'none',
        }}
        {...props}
      >
        <DragHandleIcon color="primary" />
      </Box>

      {layoutState.areaId === area.Id ? (
        <>
          <Stepper activeStep={activeStep}>
            {steps.map(({ label }, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">(選填)</Typography>;
              }
              if (isStepDone(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Box sx={{ py: 2 }}>
            <Typography color="error">{warning}</Typography>
            {steps[activeStep].item}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                {activeStep === AreaStep.New ? '取消' : '上一步'}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  跳過
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button onClick={handleSave}>儲存</Button>
              ) : (
                <Button onClick={handleNext}>下一步</Button>
              )}
            </Box>
          </Box>
        </>
      ) : (
        <AreaDisplayItem area={area} onClick={handleDisplayItemClick} editable />
      )}
    </Paper>
  );
};

export default AreaItem;
