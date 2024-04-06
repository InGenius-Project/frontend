import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import WorkInProgress from '@/assets/images/svg/work-in-progress.svg?react';
import Update from '@/assets/images/svg/update.svg?react';
import HappyAnnnouncement from '@/assets/images/svg/happy-announcement.svg?react';
import Searching from '@/assets/images/svg/searching.svg?react';
import Working from '@/assets/images/svg/working.svg?react';
import Questions from '@/assets/images/svg/questions.svg?react';
import { v4 as uuid } from 'uuid';
import Typography from '@mui/material/Typography';
import { Box, Button, Link, Stack, useTheme, TextField, useMediaQuery } from '@mui/material';
import { RecruitmentItem } from '@/components/Recruitment';
import ActivityItem, { ActivityColumnItem } from '@/components/ActivityItem';
import React from 'react';

export default function Root() {
  const theme = useTheme();
  const upLaptop = useMediaQuery(theme.breakpoints.up('laptop'));

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(6),
      }}
    >
      {/* Hero */}
      <Container
        sx={{
          height: {
            laptop: 'calc(100vh - var(--ing-height-navbar))',
          },
          maxHeight: {
            desktop: '450px',
          },
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            height: '100%',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <Grid
            tablet={6}
            laptop={4}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <WorkInProgress style={{ width: '90%', height: 'fit-content' }} />
          </Grid>
          <Grid
            tablet={6}
            laptop={8}
            sx={{
              alignSelf: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(1),
              }}
            >
              <Typography variant="h1" sx={{ flexGrow: 1 }}>
                <Box sx={{ color: theme.palette.primary.main }} component="span">
                  優
                </Box>
                創
              </Typography>
              <Typography variant="h2">Innovative Genius</Typography>
              <Typography variant="body1">幫助所有人，成為想成為的人</Typography>
              <Box sx={{ flexGrow: 2 }}>
                <Button>開始探索</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Trending */}
      <Container>
        <Grid
          container
          sx={{
            height: '100%',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <Grid tablet={7} mobile={12}>
            <Stack spacing={2}>
              <Typography variant="h3">熱門活動</Typography>
              <Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
                {/* <RecruitmentItem id={uuid()} />
                <RecruitmentItem id={uuid()} />
                <RecruitmentItem id={uuid()} /> */}
              </Stack>
              <Link>查看更多</Link>
            </Stack>
          </Grid>
          <Grid
            tablet={5}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <Update style={{ width: '90%', height: 'fit-content' }} />
          </Grid>
        </Grid>
      </Container>

      {/* Recommend */}
      <Container
        sx={{
          display: 'flex',
          gap: theme.spacing(1),
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Stack direction={'row'} justifyContent={'flex-end'} spacing={2}>
          <Typography variant="h3">推薦實習</Typography>
          <Button>開始探索</Button>
        </Stack>
        <Typography variant="body1" color="inherit" textAlign={'end'}>
          根據您的興趣、專業、學科推薦適合的實習
        </Typography>
        <Grid container alignItems={'center'}>
          <Grid mobile={3} alignSelf={'flex-end'}>
            <HappyAnnnouncement width="100%" />
            <Typography variant="body1" textAlign={'center'}>
              {' '}
              填寫線上問卷
            </Typography>
          </Grid>

          <Grid mobile={1} sx={{ textAlign: 'center' }}>
            <PlayCircleIcon color="primary" />
          </Grid>

          <Grid mobile={4} alignSelf={'flex-end'}>
            <Searching width="100%" />
            <Typography variant="body1" textAlign={'center'} sx={{ whiteSpace: 'nowrap' }}>
              透過演算法推薦適合你的實習
            </Typography>
          </Grid>

          <Grid mobile={1} sx={{ textAlign: 'center' }}>
            <PlayCircleIcon color="primary" />
          </Grid>

          <Grid mobile={3} alignSelf={'flex-end'}>
            <Working width="100%" />
            <Typography variant="body1" textAlign={'center'} sx={{ whiteSpace: 'nowrap' }}>
              在實習中得到滿滿的經驗!
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Information */}
      <Container>
        <Stack spacing={2}>
          <Typography variant="h3">活動資訊</Typography>
          <Stack direction={'row'} spacing={2}>
            <Link>所有</Link>
            <Link>講座</Link>
            <Link>活動</Link>
          </Stack>
          <Grid container spacing={2}>
            <Grid mobile={12} laptop={6}>
              <Stack spacing={1.5}>
                <ActivityItem />
                <ActivityItem />
                <ActivityItem />
              </Stack>
            </Grid>
            {upLaptop && (
              <Grid laptop={6}>
                <ActivityColumnItem />
              </Grid>
            )}
          </Grid>
        </Stack>
      </Container>

      {/* Contact */}
      <Container>
        <Typography variant="h3" mb={2}>
          聯絡資訊
        </Typography>
        <Grid container>
          <Grid mobile={12} laptop={5}>
            <Stack spacing={2}>
              <TextField label="名稱" />
              <TextField label="信箱" />
              <TextField label="內容" multiline rows={5} />
            </Stack>
          </Grid>
          {upLaptop && (
            <Grid
              laptop={7}
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <Questions width={'70%'} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
