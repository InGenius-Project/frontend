import AreaListItem from '@/components/Area/AreaListItem';
import DragDropContainer from '@/components/DragDropContainer';
import { usePostAreaMutation, usePostListLayoutMutation } from '@/features/api/area';
import { useGenerateAreaMutation } from '@/features/api/area/generateArea';
import { useGenerateAreaByTitleMutation } from '@/features/api/area/generateAreaByTitle';
import { usePostResumeMutation } from '@/features/api/resume/postResume';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { LayoutType } from '@/types/enums/LayoutType';
import { GenerateAreaType } from '@/types/interfaces/IArea';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, MenuItem, Paper, Select, Stack, TextField, Typography, styled, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { usePostTextLayoutMutation } from './../../../../../../features/api/area/postTextLayout';
import {
  postImageTextLayoutApi,
  usePostImageTextLayoutMutation,
} from './../../../../../../features/api/area/postImageLayout';

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

type Title = {
  id: string;
  title: string;
};

function ResumeGenerate() {
  const [promptState, setPromptState] = useState<string>('');
  const [areaCountState, setAreaCountState] = useState<number>(8);
  const [generateArea, { data: generateAreaTitles, isLoading: isGeneratingAreaTitle }] = useGenerateAreaMutation();
  const [generateAreaByTitle, { isLoading: isGeneratingArea }] = useGenerateAreaByTitleMutation();
  const [titlestate, setTitlesState] = useState<Title[]>([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const { User } = useAppSelector((state) => state.userState);
  const handleClickPromptButton = (label: string | undefined) => {
    setPromptState(label || '');
  };
  const dispatch = useAppDispatch();
  const [postResume] = usePostResumeMutation();

  const [postTextLayout] = usePostTextLayoutMutation();
  const [postListLayout] = usePostListLayoutMutation();
  const [postImageTextLayout] = usePostImageTextLayoutMutation();
  const [postArea] = usePostAreaMutation();

  useEffect(() => {
    if (generateAreaTitles?.result) {
      setTitlesState(
        generateAreaTitles.result.map((a) => ({
          id: uuid(),
          title: a.Title,
        })),
      );
    }
  }, [generateAreaTitles]);

  const handleClickGenerateTitle = () => {
    generateArea({
      TitleOnly: true,
      AreaNum: areaCountState,
      Title: promptState,
      Type: GenerateAreaType.Resume,
    });
  };

  const handleDragEnd = (items: string[]) => {
    const reorderedTitles = items
      .map((itemId) => {
        return titlestate.find((title) => title.id === itemId);
      })
      .filter((title) => title !== undefined);

    setTitlesState(reorderedTitles as Title[]);
  };

  const handleClickDeleteItem = (id: string) => {
    const updatedTitles = titlestate.filter((title) => title.id !== id);
    setTitlesState(updatedTitles);
  };

  const handleClickAddItem = () => {
    setTitlesState([...titlestate, { id: uuid(), title: '' }]);
  };

  const handleClickGenerateResume = () => {
    generateAreaByTitle({
      ResumeTitle: promptState,
      AreaTitles: titlestate.map((t) => t.title),
    })
      .unwrap()
      .then((genRes) => {
        postResume({
          Title: `${User?.Username}的履歷`,
          Visibility: false,
        })
          .unwrap()
          .then((res) => {
            genRes.result?.forEach((a) => {
              postArea({
                ...a,
                ResumeId: res.result?.Id,
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
                          ...a.ListLayout,
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
        <Typography variant="h3">建立履歷</Typography>
        <Typography variant="body1">你想要建立什麼樣的履歷?</Typography>
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
            value={areaCountState}
            onChange={(e) => setAreaCountState(e.target.value as number)}
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
              placeholder="簡略描述你的履歷內容"
              value={promptState}
              required
              variant="standard"
              fullWidth
              onChange={(e) => setPromptState(e.target.value)}
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
      {titlestate && titlestate.length > 0 && (
        <Paper
          sx={{
            padding: 2,
          }}
        >
          <Stack spacing={2}>
            <DragDropContainer
              droppableId={uuid()}
              items={titlestate.map((title) => title.id)}
              onDragEnd={handleDragEnd}
            >
              {titlestate.map((t, index) => (
                <AreaListItem
                  id={t.id}
                  key={t.id}
                  index={index + 1}
                  editable
                  renderInput={<TextField variant="standard" defaultValue={t.title} />}
                  onClickDelete={handleClickDeleteItem}
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
              onClick={handleClickGenerateResume}
            >
              生成履歷
            </LoadingButton>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}

export default ResumeGenerate;
