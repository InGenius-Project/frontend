import BackButton from '@/components/Button/BackButton';
import RecruitmentEmpty from '@/components/Recruitment/RecruitmentEmpty';
import { InternRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useGetResumeByIdQuery } from '@/features/api/resume/getResumeById';
import { useSearchRelativeRecruitmentQuery } from '@/features/api/resume/searchRelativeRecruitment';
import { SearchOrderBy, SearchSortBy } from '@/types/interfaces/IRecruitment';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import { Box, Chip, Container, Divider, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NIL } from 'uuid';

function SearchRecruitmentRelative() {
  const { resumeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchInputState, setSearchInputState] = useState('');
  const { data: resumeData } = useGetResumeByIdQuery(resumeId || NIL, {
    skip: !resumeId,
  });
  const theme = useTheme();

  const { data: relativeRecruitmentData } = useSearchRelativeRecruitmentQuery(
    {
      resumeId: resumeId || NIL,
    },
    {
      skip: !resumeId,
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

  return (
    <Container>
      <Stack spacing={1}>
        <Box>
          <BackButton />
        </Box>
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
        <Stack spacing={1}>
          {relativeRecruitmentData?.result && relativeRecruitmentData.result.length > 0 ? (
            <>{relativeRecruitmentData?.result.map((r) => <InternRecruitmentItem key={r.Id} recruitment={r} />)}</>
          ) : (
            <RecruitmentEmpty />
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

export default SearchRecruitmentRelative;
