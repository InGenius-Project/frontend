import RecruitmentEmptyItem from '@/components/Recruitment/RecruitmentEmptyItem';
import { InternRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import { useLazySearchRecruitmentQuery } from '@/features/api/recruitment/searchRecruitment';
import { IRecruitmentSearchPost, SearchOrderBy, SearchSortBy } from '@/types/interfaces/IRecruitment';
import SearchIcon from '@mui/icons-material/Search';
import { Container, IconButton, Stack, TextField } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function Search() {
  const [searchRecruitment, { data: searchRecruitmentsData }] = useLazySearchRecruitmentQuery();
  var location = useLocation();
  var {
    Page = 1,
    PageSize = 10,
    SortBy = SearchSortBy.CreatedTime,
    OrderBy = SearchOrderBy.Desc,
    Query,
  } = (location.state as IRecruitmentSearchPost | undefined) || {};
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const [queryState, setQueryState] = useState<string | undefined>(params.get('Query') || Query);

  useLayoutEffect(() => {
    searchRecruitment({
      Query: params.get('Query') || Query,
      Page: parseInt(params.get('Page') || String(Page)),
      PageSize: parseInt(params.get('PageSize') || String(PageSize)),
      SortBy: (params.get('SortBy') as SearchSortBy) || SortBy,
      OrderBy: (params.get('OrderBy') as SearchOrderBy) || OrderBy,
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
          placeholder="Ask AI: 我想要找一個台北南港區的暑期實習..."
          fullWidth
          value={queryState}
          onChange={(e) => {
            setQueryState(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <IconButton>
                <AutoAwesomeIcon />
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
            searchRecruitmentsData?.result?.result.map((r) => (
              <InternRecruitmentItem
                recruitment={r}
                onClick={() =>
                  navigate(`/Search/Recruitment/${r.Id}`, {
                    state: {
                      from: location,
                    },
                  })
                }
              />
            ))
          ) : (
            <RecruitmentEmptyItem />
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Search;
