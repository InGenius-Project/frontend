import {
  usePostAreaMutation,
  usePostImageTextLayoutMutation,
  usePostKeyValueListLayoutMutation,
  usePostListLayoutMutation,
  usePostTextLayoutMutation,
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
import DragHandleIcon from '@mui/icons-material/DragHandle';
import {
  Box,
  Button,
  Drawer,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import AreaDisplayItem from '../AreaDisplayItem';
import AreaEditItem from '../AreaEditItem';
import AreaLayoutItem from '../AreaLayoutItem';
import AreaNewItem from '../AreaNewItem';
import { getUserApi } from '@/features/api/user/getUser';
import { getResumeByIdApi } from '@/features/api/resume/getResumeById';
import { getRecruitmentByIdApi } from '@/features/api/recruitment/getRecruitmentById';

export type AreaItemProps = {
  area: IArea;
  focused?: boolean;
  id: string; // for draggable id
  isLoadingSequence?: boolean;
} & Partial<DraggableProvidedDragHandleProps>;

const AreaItem = React.forwardRef<HTMLDivElement, PropsWithChildren<AreaItemProps>>(
  ({ area, children, focused, isLoadingSequence, ...props }, forwardRef) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
    const dispatch = useAppDispatch();
    const confirm = useConfirm();
    const ref = useRef<HTMLInputElement>(null);

    useImperativeHandle(forwardRef, () => ref.current as HTMLDivElement);

    const [isHover, setIsHover] = useState(false);
    const [focusedState, setFocusState] = useState(false);

    const [activeStep, setActiveStep] = useState(AreaStep.New);
    const [warning, setWarning] = useState('');
    const [hisSteps, setHisSteps] = useState(new Set<AreaStep>());

    const layoutState = useAppSelector((state) => state.layoutState);
    const layoutType = useAppSelector(selectLayoutType);
    const [openDrawer, setOpenDrawer] = useState(false);

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

    const handleSave = useCallback(async () => {
      const state = store.getState();
      const updateAreaPost = getUpdateAreaPost(state);
      const updateArea = getUpdatedArea(state);

      postArea(updateAreaPost)
        .then(async (res: any) => {
          if (res.data.result) {
            switch (layoutType) {
              case LayoutType.Text:
                await postTextLayout({
                  AreaId: res.data.result.Id,
                  Content: updateArea.TextLayout?.Content || '',
                });
                break;
              case LayoutType.ImageText:
                let blob = await fetch(updateArea.ImageTextLayout?.Image?.Uri || '').then((r) => r.blob());

                await postImageTextLayout({
                  AreaId: res.data.result.Id,
                  Uri: updateArea.ImageTextLayout?.Image?.Uri,
                  Image: blob,
                  AltContent: updateArea.ImageTextLayout?.Image?.AltContent || 'Untitled',
                  TextContent: updateArea.ImageTextLayout?.TextContent || '',
                });

                break;
              case LayoutType.List:
                await postListLayout({
                  AreaId: res.data.result.Id,
                  Items: updateArea.ListLayout?.Items?.map((i) => ({
                    Id: i.Id,
                    Name: i.Name,
                    TagTypeId: i.Type.Id,
                  })),
                });
                break;
              case LayoutType.KeyValueList:
                await postKeyValueListLayout({
                  AreaId: res.data.result.Id,
                  Items: (updateArea.KeyValueListLayout?.Items || []).map((i) => ({
                    Id: i.Id,
                    TagIds: i.Key?.map((k) => k.Id) || [],
                    Value: i.Value,
                  })),
                });
                break;
            }
          }
        })
        .then(() => {
          // TODO: fix this with proper way
          dispatch(getUserApi.util.resetApiState());
          dispatch(getResumeByIdApi.util.resetApiState());
          dispatch(getRecruitmentByIdApi.util.resetApiState());

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
      setOpenDrawer(true);
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
      >
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            justifyContent: 'center',
            cursor: isLoadingSequence ? 'wait' : 'move',
            display: isHover ? 'flex' : 'none',
          }}
          {...props}
        >
          <DragHandleIcon color="primary" />
        </Box>

        {/* Desktop view */}
        {layoutState.areaId === area.Id && !isMobile ? (
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
                <Stack spacing={1}>
                  <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                    {activeStep === AreaStep.New ? '取消' : '上一步'}
                  </Button>
                </Stack>
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

        {/* Mobile view */}

        <Drawer
          anchor="bottom"
          open={isMobile && layoutState.areaId === area.Id && openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box
            sx={{
              p: 2,
              maxHeight: '90vh',
              overflow: 'scroll',
            }}
          >
            {steps[activeStep].item}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Stack spacing={1}>
                <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                  {activeStep === AreaStep.New ? '取消' : '上一步'}
                </Button>
              </Stack>
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
        </Drawer>
      </Paper>
    );
  },
);

export default AreaItem;
