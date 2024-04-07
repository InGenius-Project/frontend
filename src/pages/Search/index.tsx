import { RecruitmentItem } from '@/components/Recruitment';
import RecruitmentEmptyItem from '@/components/Recruitment/RecruitmentEmptyItem';
import { InternRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useLazySearchRecruitmentQuery } from '@/features/api/recruitment/searchRecruitment';
import SearchIcon from '@mui/icons-material/Search';
import { Container, IconButton, Stack, TextField } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

function Search() {
  const [searchRecruitment, { data: searchRecruitmentsData }] = useLazySearchRecruitmentQuery();
  var location = useLocation();
  var { Page, PageSize, SortBy, OrderBy, Query } = location.state;

  const [params] = useSearchParams();

  useLayoutEffect(() => {
    searchRecruitment({
      Query: params.get('Query') || Query,
      Page: params.get('Page') || Page,
      PageSize: params.get('PageSize') || PageSize,
      SortBy: params.get('SortBy') || SortBy,
      OrderBy: params.get('OrderBy') || OrderBy,
    });
  }, [OrderBy, Page, PageSize, Query, SortBy, params, searchRecruitment]);

  const handleSearch = (keyword: string) => {
    searchRecruitment({
      Query: keyword,
      Page: Page,
      PageSize: PageSize,
      SortBy: SortBy,
      OrderBy: OrderBy,
    });
  };

  return (
    <Container sx={{ py: 1 }}>
      <Stack spacing={1}>
        <TextField
          placeholder="Ask AI: 我想要找一個台北大南港區的暑期實習..."
          fullWidth
          InputProps={{
            startAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch((e.currentTarget as any).value);
            }
          }}
        />
        <Stack spacing={1}>
          {searchRecruitmentsData?.result?.result && !!searchRecruitmentsData?.result?.result?.length ? (
            searchRecruitmentsData?.result?.result.map((r) => <InternRecruitmentItem recruitment={r} />)
          ) : (
            <RecruitmentEmptyItem />
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Search;
