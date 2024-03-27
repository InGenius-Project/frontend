import React, { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { Box, Button, Paper, Stack, Step, StepLabel, Stepper, Typography, useTheme } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import { store, useAppDispatch, useAppSelector } from '@/features/store';
import { Area } from '@/types/classes/Area';
import { LayoutType } from '@/types/enums/LayoutType';
import { IArea } from '@/types/interfaces/IArea';

import RichTextEditor from '@/components/RichTextEditor';
import AreaEditItem from '../AreaEditItem';
import AreaKeyValueListItem from '../AreaKeyValueListItem';
import AreaListItem from '../AreaListItem';
import AreaNewItem from '../AreaNewItem';
import AreaDisplayItem from '../AreaDisplayItem';
import AreaLayoutItem from '../AreaLayoutItem';

import {
  getUpdatedArea,
  selectLayoutType,
  setAreaTypeId,
  setLayoutByArea,
  setLayoutType,
} from '@/features/layout/layoutSlice';
import { usePostAreaMutation } from '@/features/api/area/postArea';

export type AreaItemProps = {
  onClick?: (element: HTMLElement) => void;
  id: string;
  area: IArea;
  focused?: boolean;
} & Partial<DraggableProvidedDragHandleProps>;

enum AreaStep {
  New,
  Layout,
  Edit,
}

const AreaItem = ({ onClick, area, children, focused, ...props }: PropsWithChildren<AreaItemProps>) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const ref = React.useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = React.useState(false);
  const [focusedState, setFocusState] = useState(false);

  const [activeStep, setActiveStep] = React.useState<AreaStep>(AreaStep.New);
  const [warning, setWarning] = useState('');
  const [hisSteps, setHisSteps] = React.useState(new Set<AreaStep>());

  const layoutState = useAppSelector((state) => state.layoutState);
  const layoutType = useAppSelector(selectLayoutType);

  const [postArea] = usePostAreaMutation();

  const isStepDone = (step: number) => {
    return hisSteps.has(step);
  };

  const isStepOptional = (step: number) => {
    return step === 0;
  };

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

      if (!layoutType) {
        setWarning('請選擇類型');
        return;
      }
      setWarning('');
      setActiveStep(AreaStep.Edit);
    }

    setHisSteps(newHisSteps);
  }, [activeStep, hisSteps, layoutType]);

  const handleSkip = useCallback(() => {
    setHisSteps(new Set<AreaStep>([AreaStep.New]));

    setActiveStep(AreaStep.Layout);

    // reset type when skip choose default type
    dispatch(setLayoutType(undefined));
    dispatch(setAreaTypeId(null));
  }, [dispatch]);

  const handleBack = () => {
    const prevStep = Math.max(...hisSteps);

    setHisSteps((prevSteps) => {
      const newHisSteps = new Set(prevSteps);
      newHisSteps.delete(prevStep);
      return newHisSteps;
    });
    setActiveStep(prevStep);
  };

  const handleItemClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    onClick && onClick(ref.current as HTMLElement);
  };

  const handleSave = () => {
    setActiveStep(0);
    postArea(getUpdatedArea(store.getState()));
  };

  const steps = useMemo(
    () => [
      {
        step: AreaStep.New,
        label: '選擇預設類型',
        item: <AreaNewItem onClickNext={handleNext} />,
      },
      {
        step: AreaStep.Layout,
        label: '選擇版面',
        item: <AreaLayoutItem />,
      },
      {
        step: AreaStep.Edit,
        label: '編輯內容',
        item: <AreaEditItem />,
      },
    ],
    [handleNext],
  );

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
      onClick={() => handleItemClick()}
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
          {activeStep === steps.length ? (
            <AreaDisplayItem area={area} />
          ) : (
            <Box sx={{ py: 2 }}>
              <Typography color="error">{warning}</Typography>
              {steps[activeStep].item}

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  上一步
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
          )}
        </>
      ) : (
        <AreaDisplayItem area={area} />
      )}
    </Paper>
  );
};

export default AreaItem;
