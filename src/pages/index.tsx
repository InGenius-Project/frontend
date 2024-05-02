import HappyAnnnouncement from '@/assets/images/svg/happy-announcement.svg?react';
import Questions from '@/assets/images/svg/questions.svg?react';
import Searching from '@/assets/images/svg/searching.svg?react';
import Update from '@/assets/images/svg/update.svg?react';
import WorkInProgress from '@/assets/images/svg/work-in-progress.svg?react';
import Working from '@/assets/images/svg/working.svg?react';
import ActivityItem, { ActivityColumnItem } from '@/components/ActivityItem';
import { InternRecruitmentItem, SkeletonRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useSearchRecruitmentQuery } from '@/features/api/recruitment/searchRecruitment';
import { SearchOrderBy, SearchSortBy } from '@/types/interfaces/IRecruitment';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, Button, IconButton, Link, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Root() {
  const theme = useTheme();
  const upLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const location = useLocation();
  const navigate = useNavigate();
  const [searchInputState, setSearchInputState] = useState('');

  const { data: trendRecruitmentData, isLoading: isSearchingTrendRecruitment } = useSearchRecruitmentQuery({
    Query: '',
    Page: 1,
    PageSize: 3,
    SortBy: SearchSortBy.CreatedTime, // TODO : Change SortBy
    OrderBy: SearchOrderBy.Desc,
  });

  const handleSearch = (keyword: string) => {
    navigate('/search', {
      state: {
        ...location.state,
        Page: 1,
        PageSize: 10,
        SortBy: SearchSortBy.CreatedTime,
        OrderBy: SearchOrderBy.Desc,
        Query: keyword,
      },
    });
  };

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
                <TextField
                  placeholder="Ask AI: 我想要找一個台北大南港區的暑期實習..."
                  fullWidth
                  id="root-search"
                  value={searchInputState}
                  InputProps={{
                    startAdornment: (
                      <IconButton
                        onClick={() => {
                          handleSearch(searchInputState);
                        }}
                      >
                        <AutoAwesomeIcon />
                      </IconButton>
                    ),
                  }}
                  onChange={(e) => {
                    setSearchInputState(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(searchInputState);
                    }
                  }}
                />
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
                {!isSearchingTrendRecruitment && trendRecruitmentData ? (
                  trendRecruitmentData.result?.result.map((r) => (
                    <InternRecruitmentItem
                      recruitment={r}
                      key={r.Id}
                      onClick={() => navigate(`/Search/Recruitment/${r.Id}`)}
                    />
                  ))
                ) : (
                  <>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <SkeletonRecruitmentItem key={`recruitment-skeleton-${index}`} />
                    ))}
                  </>
                )}
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
