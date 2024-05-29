import ManageProfileEmptyItem from '@/components/ProfileItem/ManageProfileEmptyItem';
import ManageProfileItem from '@/components/ProfileItem/ManageProfileItem';
import { ResumeItem } from '@/components/Resume';
import { useLazyAnalyzeApplyedResumeQuery } from '@/features/api/recruitment/analyzeApplyedResume';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { useSearchRelativeResumesQuery } from '@/features/api/recruitment/searchRelativeResume';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Chip, Container, IconButton, Stack, Tab, Tabs, Tooltip, Typography, useTheme } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { NIL } from 'uuid';
import ArticleIcon from '@mui/icons-material/Article';

enum RelativeResumeTab {
  All,
  Applied,
  Relative,
}

function CompanyRecruitmentDetail() {
  const { recruitmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [analyzeApplyedResume] = useLazyAnalyzeApplyedResumeQuery();

  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId || NIL, {
    skip: !recruitmentId,
  });
  const [tab, setTab] = useState<RelativeResumeTab>(RelativeResumeTab.Applied);
  const theme = useTheme();

  const resumes = useMemo(() => {
    return recruitmentData?.result?.Resumes || [];
  }, [recruitmentData]);

  const { data: relativeResumesData, refetch: refetchRelativeResume } = useSearchRelativeResumesQuery(
    {
      recruitmentId: recruitmentId || NIL,
      searchAll: false,
    },
    {
      skip: !recruitmentId,
    },
  );

  const { data: allRelativeResumesData, refetch: refetchRelativeResumeAll } = useSearchRelativeResumesQuery(
    {
      recruitmentId: recruitmentId || NIL,
      searchAll: true,
    },
    {
      skip: !recruitmentId,
    },
  );
  const confirm = useConfirm();

  const relativeResumes = useMemo(() => {
    return relativeResumesData?.result || [];
  }, [relativeResumesData?.result]);

  const handleAnalyze = () => {
    confirm({ description: '確定要一鍵分析履歷嗎？' }).then(() => {
      if (recruitmentId && relativeResumes.length === 0)
        analyzeApplyedResume({
          recruitmentId: recruitmentId || NIL,
        })
          .unwrap()
          .then(() => {
            refetchRelativeResume();
            refetchRelativeResumeAll();
          });
    });
  };

  return (
    <Container>
      <Stack spacing={1}>
        <Stack direction={'row'} spacing={1} flexWrap={'wrap'} gap={1}>
          <Typography variant="h5">
            與
            <Tooltip title={recruitmentData?.result?.Name}>
              <Chip
                label={recruitmentData?.result?.Name}
                sx={{
                  fontSize: theme.typography.h5.fontSize,
                  maxWidth: '15em',
                }}
              />
            </Tooltip>
            相關的履歷
          </Typography>
          <Box>
            <LoadingButton variant="contained" onClick={handleAnalyze} startIcon={<AutoAwesome />}>
              一鍵分析履歷
            </LoadingButton>
          </Box>
        </Stack>
        <Tabs
          value={tab}
          onChange={(event, value) => {
            setTab(value);
          }}
        >
          <Tab label="應徵紀錄" value={RelativeResumeTab.All} />
          <Tab label="應徵履歷分析" value={RelativeResumeTab.Applied} />
          <Tab
            label="相關履歷分析"
            value={RelativeResumeTab.Relative}
            icon={<Chip label="Pro" avatar={<StarIcon />} />}
            iconPosition="end"
          />
        </Tabs>

        {tab === RelativeResumeTab.All && (
          <Stack
            spacing={1}
            sx={{
              width: '100%',
            }}
          >
            {resumes.length > 0 ? (
              resumes.map((r) => {
                return <ManageProfileItem key={r.Id} resume={r} />;
              })
            ) : (
              <ManageProfileEmptyItem />
            )}
          </Stack>
        )}

        {tab === RelativeResumeTab.Applied && (
          <Stack spacing={1}>
            {relativeResumesData?.result && relativeResumesData.result.length > 0 ? (
              <>
                {relativeResumesData?.result.map((r) => (
                  <ResumeItem
                    key={r.Id}
                    resume={r}
                    control={
                      <IconButton>
                        <ArticleIcon
                          onClick={() =>
                            navigate(`Resume/${r.Id}`, {
                              state: {
                                from: location,
                              },
                            })
                          }
                        />
                      </IconButton>
                    }
                  />
                ))}
              </>
            ) : (
              <ManageProfileEmptyItem />
            )}
          </Stack>
        )}

        {tab === RelativeResumeTab.Relative && (
          <>
            <Stack direction="row" spacing={1}></Stack>
            {allRelativeResumesData?.result && allRelativeResumesData.result.length > 0 ? (
              <>
                {allRelativeResumesData?.result.map((r) => (
                  <ResumeItem
                    key={r.Id}
                    resume={r}
                    control={
                      <IconButton>
                        <ArticleIcon
                          onClick={() =>
                            navigate(`Resume/${r.Id}`, {
                              state: {
                                from: location,
                              },
                            })
                          }
                        />
                      </IconButton>
                    }
                  />
                ))}
              </>
            ) : (
              <ManageProfileEmptyItem />
            )}
          </>
        )}
      </Stack>
    </Container>
  );
}
export default CompanyRecruitmentDetail;
