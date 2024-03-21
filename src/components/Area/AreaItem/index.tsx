import RichTextEditor from '@/components/RichTextEditor';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { Area } from '@/types/classes/Area';
import { LayoutType } from '@/types/enums/LayoutType';
import { IArea } from '@/types/interfaces/IArea';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Box, Button, Paper, Stack, Step, StepLabel, Stepper, Typography, useTheme } from '@mui/material';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import AreaEditItem from '../AreaEditItem';
import AreaKeyValueListItem from '../AreaKeyValueListItem';
import AreaListItem from '../AreaListItem';
import { selectLayoutType, setLayoutByArea } from '@/features/layout/layoutSlice';
import AreaNewItem from '../AreaNewItem';
import AreaDisplayItem from '../AreaDisplayItem';
import AreaLayoutItem from '../AreaLayoutItem';

export type AreaItemProps = {
  onClick?: (element: HTMLElement) => void;
  id: string;
  area: IArea;
  focused?: boolean;
} & Partial<DraggableProvidedDragHandleProps>;

const AreaItem = ({ onClick, area, children, focused, ...props }: PropsWithChildren<AreaItemProps>) => {
  const [isHover, setIsHover] = React.useState(false);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);
  const [focusedState, setFocusState] = useState(false);
  const layoutState = useAppSelector((state) => state.layoutState);
  const layoutType = useAppSelector(selectLayoutType);
  const [activeStep, setActiveStep] = React.useState(0);

  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 0;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    onClick && onClick(ref.current as HTMLElement);
  };

  const steps = useMemo(
    () => [
      {
        label: '選擇預設類型',
        item: <AreaNewItem onClickNext={handleNext} />,
      },
      {
        label: '選擇版面',
        item: <AreaLayoutItem />,
      },
      {
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
      onClick={() => handleClick()}
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
              if (isStepSkipped(index)) {
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
                <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
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
