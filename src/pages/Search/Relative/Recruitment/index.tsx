import BackButton from '@/components/Button/BackButton';
import RecruitmentEmpty from '@/components/Recruitment/RecruitmentEmpty';
import { InternRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useLazyAnalyzeResumeQuery } from '@/features/api/resume/analyzeResume';
import { useGetResumeByIdQuery } from '@/features/api/resume/getResumeById';
import { useSearchRelativeRecruitmentQuery } from '@/features/api/resume/searchRelativeRecruitment';
import { SearchOrderBy, SearchSortBy } from '@/types/interfaces/IRecruitment';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NIL } from 'uuid';

enum RecruitmentTab {
  Applied = 0,
  Other = 1,
}

function SearchRecruitmentRelative() {
  const { resumeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const confirm = useConfirm();

  const [anaylzeResume, { isLoading: isAnalyzingResume }] = useLazyAnalyzeResumeQuery();
  const [searchInputState, setSearchInputState] = useState('');
  const { data: resumeData } = useGetResumeByIdQuery(resumeId || NIL, {
    skip: !resumeId,
  });
  const theme = useTheme();

  const handleAnalyze = () => {
    confirm({
      title: '確定要曝光此履歷嗎?',
      confirmationText: '確定曝光',
      cancellationText: '取消',
      cancellationButtonProps: {
        variant: 'outlined',
      },
    }).then(() => {
      if (resumeId) anaylzeResume({ resumeId: resumeId });
    });
  };

  const { data: relativeRecruitmentData } = useSearchRelativeRecruitmentQuery(
    {
      resumeId: resumeId || NIL,
    },
    {
      skip: !resumeId,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: false,
    },
  );

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

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (location.state.from.pathname === '/Account/User/Intern/Resume') {
      setValue(RecruitmentTab.Other);
    }
  }, [location.state.from.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: RecruitmentTab) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Stack spacing={1}>
        <Box>
          <BackButton />
        </Box>
        <Stack direction="row" spacing={1}>
          <Typography variant="h5">
            與{' '}
            <Chip
              label={resumeData?.result?.Title}
              sx={{
                fontSize: theme.typography.h5.fontSize,
              }}
            />{' '}
            相關的職缺
          </Typography>

          <LoadingButton
            variant="contained"
            loading={isAnalyzingResume}
            onClick={handleAnalyze}
            startIcon={<AutoAwesome />}
          >
            履歷曝光
          </LoadingButton>
        </Stack>

        <Typography variant="h6">或者尋找其他職缺</Typography>
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
                <AutoAwesome />
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
        <Divider />

        {/* TODO: rename value */}
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab
            label="已應徵的職缺"
            value={RecruitmentTab.Applied}
            icon={<Chip label={(resumeData?.result?.Recruitments || []).length} />}
            iconPosition="start"
          ></Tab>
          <Tab label="相關職缺分析" value={RecruitmentTab.Other} iconPosition="start" icon={<AutoAwesome />}></Tab>
        </Tabs>

        {value === 0 && (
          <Stack spacing={1}>
            {(resumeData?.result?.Recruitments || []).length > 0 &&
              resumeData?.result?.Recruitments?.map((r) => <InternRecruitmentItem key={r.Id} recruitment={r} />)}
          </Stack>
        )}

        {value === 1 && (
          <Stack spacing={1}>
            {relativeRecruitmentData?.result && relativeRecruitmentData.result.length > 0 ? (
              <>{relativeRecruitmentData?.result.map((r) => <InternRecruitmentItem key={r.Id} recruitment={r} />)}</>
            ) : (
              <RecruitmentEmpty />
            )}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

export default SearchRecruitmentRelative;
