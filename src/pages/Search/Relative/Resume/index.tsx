import BackButton from '@/components/Button/BackButton';
import RecruitmentEmpty from '@/components/Recruitment/RecruitmentEmpty';
import { ResumeItem } from '@/components/Resume';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { useSearchRelativeResumesQuery } from '@/features/api/recruitment/searchRelativeResume';
import { Box, Chip, Container, Divider, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { NIL } from 'uuid';
import { useEffect, useMemo, useState } from 'react';
import ManageProfileItem from '@/components/ProfileItem/ManageProfileItem';
import ManageProfileEmptyItem from '@/components/ProfileItem/ManageProfileEmptyItem';
import LoadingButton from '@mui/lab/LoadingButton';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import { useConfirm } from 'material-ui-confirm';
import { useLazyAnalyzeApplyedResumeQuery } from '@/features/api/recruitment/analyzeApplyedResume';

enum RelativeResumeTab {
  All,
  Applied,
  Relative,
}

function SearchResumeRelative() {
  const { recruitmentId } = useParams();

  const [analyzeApplyedResume] = useLazyAnalyzeApplyedResumeQuery();

  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId || NIL, {
    skip: !recruitmentId,
  });
  const [tab, setTab] = useState<RelativeResumeTab>(RelativeResumeTab.Applied);
  const theme = useTheme();

  const resumes = useMemo(() => {
    return recruitmentData?.result?.Resumes || [];
  }, [recruitmentData]);

  const { data: relativeResumesData } = useSearchRelativeResumesQuery(
    {
      recruitmentId: recruitmentId || NIL,
      searchAll: false,
    },
    {
      skip: !recruitmentId,
    },
  );

  const { data: allRelativeResumesData } = useSearchRelativeResumesQuery(
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
        });
    });
  };

  return (
    <Container>
      <Stack spacing={1}>
        <Stack direction={'row'} spacing={1}>
          <Typography variant="h5">
            與{' '}
            <Chip
              label={recruitmentData?.result?.Name}
              sx={{
                fontSize: theme.typography.h5.fontSize,
              }}
            />{' '}
            相關的履歷
          </Typography>
          <LoadingButton variant="contained" onClick={handleAnalyze} startIcon={<AutoAwesome />}>
            一鍵分析履歷
          </LoadingButton>
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

        <Divider />

        {tab === RelativeResumeTab.All && (
          <Stack
            spacing={1}
            sx={{
              width: '100%',
            }}
          >
            {resumes.length > 0 ? (
              resumes.map((r) => {
                return <ManageProfileItem resume={r} />;
              })
            ) : (
              <ManageProfileEmptyItem />
            )}
          </Stack>
        )}

        {tab === RelativeResumeTab.Applied && (
          <Stack spacing={1}>
            {relativeResumesData?.result && relativeResumesData.result.length > 0 ? (
              <>{relativeResumesData?.result.map((r) => <ResumeItem key={r.Id} resume={r} />)}</>
            ) : (
              <RecruitmentEmpty />
            )}
          </Stack>
        )}

        {tab === RelativeResumeTab.Relative && (
          <>
            <Stack direction="row" spacing={1}></Stack>
            {allRelativeResumesData?.result && allRelativeResumesData.result.length > 0 ? (
              <>{allRelativeResumesData?.result.map((r) => <ResumeItem key={r.Id} resume={r} />)}</>
            ) : (
              <RecruitmentEmpty />
            )}
          </>
        )}
      </Stack>
    </Container>
  );
}

export default SearchResumeRelative;
