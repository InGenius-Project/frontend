import AreaListItem from '@/components/Area/AreaListItem';
import DragDropContainer from '@/components/DragDropContainer';
import {
  usePostAreaMutation,
  usePostImageTextLayoutMutation,
  usePostListLayoutMutation,
  usePostTextLayoutMutation,
} from '@/features/api/area';
import { useGenerateAreaMutation } from '@/features/api/area/generateArea';
import { useGenerateAreaByTitleMutation } from '@/features/api/area/generateAreaByTitle';
import { usePushEmptyAreasContainerMutation } from '@/features/api/area/postGenerateAreasRes';
import { usePostKeyValueListLayoutMutation } from '@/features/api/area/postKeyValueListLayout';
import { usePostResumeMutation } from '@/features/api/resume/postResume';
import {
  Title,
  selectGenerateArea,
  selectGenerateAreaByTitlePost,
  selectGenerateTypeLabel,
  setAreaCount,
  setPrompt,
  setTitleOnly,
  setTitles,
} from '@/features/generate/generateSlice';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { LayoutType } from '@/types/enums/LayoutType';
import { AreaGenType } from '@/types/interfaces/IArea';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, MenuItem, Paper, Select, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { resolve } from 'node:path/win32';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NIL, v4 as uuid } from 'uuid';

const PromptButtonBase = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 100,
  alignItems: 'start',
  justifyContent: 'start',
  padding: theme.spacing(2),
  borderRadius: '0.5em',
}));

type PromptButtonProps = {
  label?: string;
  onClick?: (label?: string) => void;
};
const PromptButton = ({ label, onClick }: PromptButtonProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <PromptButtonBase
        color="white"
        onClick={() => {
          onClick?.(label);
        }}
      >
        <Typography paddingRight={3} textAlign={'start'}>
          {label}
        </Typography>
      </PromptButtonBase>
      <AddIcon
        sx={{
          position: 'absolute',
          right: theme.spacing(2),
          top: theme.spacing(2),
        }}
      />
    </Box>
  );
};

function AreaGenerateaModal() {
  const [generateArea, { data: generateAreaTitles, isLoading: isGeneratingAreaTitle }] = useGenerateAreaMutation();
  const [generateAreaByTitle, { isLoading: isGeneratingArea }] = useGenerateAreaByTitleMutation();
  const { prompt, areaCount, titles, type } = useAppSelector((state) => state.generateState);
  const typeLabel = useAppSelector(selectGenerateTypeLabel);
  const generateAreaPost = useAppSelector(selectGenerateArea);
  const generateAreaByTitlePost = useAppSelector(selectGenerateAreaByTitlePost);

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { User } = useAppSelector((state) => state.userState);
  const handleClickPromptButton = (label: string | undefined) => {
    dispatch(setPrompt(label || ''));
  };
  const [error, setError] = useState<string | undefined>(undefined);

  const [postResume] = usePostResumeMutation();
  const [postTextLayout] = usePostTextLayoutMutation();
  const [postImageTextLayout] = usePostImageTextLayoutMutation();
  const [postListLayout] = usePostListLayoutMutation();
  const [postKeyValueListLayout] = usePostKeyValueListLayoutMutation();
  const [pushEmptyAreasContianer] = usePushEmptyAreasContainerMutation();
  const [postArea] = usePostAreaMutation();

  const handleDragEnd = (items: string[]) => {
    const reorderedTitles = items
      .map((itemId) => {
        return titles.find((title) => title.id === itemId);
      })
      .filter((title) => title !== undefined);

    dispatch(setTitles(reorderedTitles as Title[]));
  };

  const handleClickDeleteItem = (id: string) => {
    const updatedTitles = titles.filter((title) => title.id !== id);
    dispatch(setTitles(updatedTitles));
  };

  const handleClickAddItem = () => {
    dispatch(setTitles([...titles, { id: uuid(), title: '' }]));
  };

  const handleClickGenerateTitle = () => {
    if (!prompt || prompt.trim() === '') {
      setError('請輸入履歷描述');
      return;
    }

    dispatch(setTitleOnly(true));
    generateArea(generateAreaPost)
      .unwrap()
      .then((res) => {
        dispatch(
          setTitles(
            res.result?.map((a) => ({
              id: uuid(),
              title: a.Title,
            })),
          ),
        );
      });
  };

  const handleClickGenerate = () => {
    if (!prompt || prompt.trim() === '') {
      setError('請輸入履歷描述');
      return;
    }

    generateAreaByTitle(generateAreaByTitlePost)
      .unwrap()
      .then((genRes) => {
        pushEmptyAreasContianer(type)
          .unwrap()
          .then((res) => {
            genRes.result?.forEach((a) => {
              postArea({
                ...a,
                Id: NIL,
                RecruitmentId: type === AreaGenType.Recruitment ? res.result?.Id : undefined,
                ResumeId: type === AreaGenType.Resume ? res.result?.Id : undefined,
              })
                .unwrap()
                .then(async (areaRes) => {
                  switch (a.LayoutType) {
                    case LayoutType.Text:
                      a.TextLayout &&
                        areaRes.result?.Id &&
                        postTextLayout({
                          ...a.TextLayout,
                          AreaId: areaRes.result?.Id,
                        });
                      break;
                    case LayoutType.List:
                      a.ListLayout &&
                        areaRes.result?.Id &&
                        postListLayout({
                          ...a.ListLayout?.Items?.map((i) => ({
                            Id: i.Id,
                            Name: i.Name,
                            TaTypeId: i.Type.Id,
                          })),
                          AreaId: areaRes.result?.Id,
                        });
                      break;
                    case LayoutType.ImageText:
                      let blob = await fetch(a.ImageTextLayout?.Image?.Uri || '').then((r) => r.blob());

                      a.ImageTextLayout &&
                        areaRes.result?.Id &&
                        postImageTextLayout({
                          AltContent: a.ImageTextLayout.Image?.AltContent || 'Untitled',
                          TextContent: a.ImageTextLayout.TextContent,
                          Image: blob,
                          Uri: a.ImageTextLayout.Image?.Uri,
                          AreaId: areaRes.result?.Id,
                        });
                      break;
                    case LayoutType.KeyValueList:
                      a.KeyValueListLayout &&
                        areaRes.result?.Id &&
                        postKeyValueListLayout({
                          AreaId: areaRes.result?.Id,
                          Items: (a.KeyValueListLayout.Items || []).map((i) => ({
                            Id: i.Id,
                            TagIds: i.Key?.map((k) => k.Id) || [],
                            Value: i.Value,
                          })),
                        });
                      break;
                    default:
                      break;
                  }
                });
            });

            navigate('../Edit/' + res.result?.Id);
          });
      });
  };

  return (
    <Stack spacing={2}>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h3">建立{typeLabel}</Typography>
        <Typography variant="body1">你想要建立什麼樣的{typeLabel}?</Typography>
      </Paper>
      <Stack spacing={1} direction={'row'} justifyContent={'space-between'}>
        <Typography variant="subtitle1">簡述</Typography>
        <Box
          width={'10em'}
          sx={{
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Select
            size="small"
            fullWidth
            value={areaCount}
            onChange={(e) => dispatch(setAreaCount(e.target.value as number))}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1} 個區塊
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Stack>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Grid container spacing={2} alignItems={'center'}>
          <Grid mobile={10}>
            <TextField
              placeholder={`簡略描述你的${typeLabel}內容`}
              value={prompt}
              required
              variant="standard"
              fullWidth
              onChange={(e) => {
                dispatch(setPrompt(e.target.value));
                setError(undefined);
              }}
              helperText={error}
              error={!!error}
            />
          </Grid>
          <Grid mobile>
            <LoadingButton
              loading={isGeneratingAreaTitle}
              fullWidth
              variant="contained"
              startIcon={<AutoAwesomeOutlinedIcon />}
              onClick={handleClickGenerateTitle}
            >
              生成大綱
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
      {titles && titles.length > 0 && (
        <Paper
          sx={{
            padding: 2,
          }}
        >
          <Stack spacing={2}>
            <DragDropContainer droppableId={uuid()} items={titles.map((title) => title.id)} onDragEnd={handleDragEnd}>
              {titles.map((t, index) => (
                <AreaListItem
                  id={t.id}
                  key={t.id}
                  index={index + 1}
                  editable
                  renderInput={<TextField variant="standard" defaultValue={t.title} />}
                  onClickDelete={handleClickDeleteItem}
                  displayIndex
                />
              ))}
            </DragDropContainer>
            <Button
              color="info"
              variant="text"
              sx={{
                width: '100%',
                borderRadius: '4px',
                padding: 0.2,
              }}
              onClick={handleClickAddItem}
            >
              +
            </Button>
            <LoadingButton
              loading={isGeneratingArea}
              fullWidth
              variant="contained"
              startIcon={<AutoAwesomeOutlinedIcon />}
              onClick={handleClickGenerate}
            >
              生成{typeLabel}
            </LoadingButton>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}

export default AreaGenerateaModal;
