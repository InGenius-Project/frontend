import RecruitmentDetailTableRow, {
  RecruitmentDetailRelativeTableEmptyRow,
  RecruitmentDetailRelativeTableRow,
  RecruitmentDetailTableEmptyRow,
} from '@/components/Recruitment/RecruitmentDetailTableRow';
import { useLazyAnalyzeApplyedResumeQuery } from '@/features/api/recruitment/analyzeApplyedResume';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { useSearchRelativeResumesQuery } from '@/features/api/recruitment/searchRelativeResume';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { NIL } from 'uuid';

enum RelativeResumeTab {
  All,
  Applied,
  Relative,
}

function CompanyRecruitmentDetail() {
  const { recruitmentId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

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

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === RelativeResumeTab.All.toString()) {
      setTab(RelativeResumeTab.All);
    } else if (tab === RelativeResumeTab.Relative.toString()) {
      setTab(RelativeResumeTab.Relative);
    } else {
      setTab(RelativeResumeTab.Applied);
    }
  }, [searchParams]);

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
            setSearchParams({ tab: value.toString() });
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
          <TableContainer
            component={Paper}
            sx={{
              width: '100%',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>使用者</TableCell>
                  <TableCell>應徵履歷</TableCell>
                  <TableCell align="right">應徵時間</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resumes.length > 0 ? (
                  resumes.map((r) => {
                    return <RecruitmentDetailTableRow key={r.Id} resume={r} />;
                  })
                ) : (
                  <RecruitmentDetailTableEmptyRow />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tab === RelativeResumeTab.Applied && (
          <TableContainer
            component={Paper}
            sx={{
              width: '100%',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>使用者</TableCell>
                  <TableCell>應徵履歷</TableCell>
                  <TableCell>相關標籤</TableCell>
                  <TableCell align="right">應徵時間</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {relativeResumesData?.result && relativeResumesData.result.length > 0 ? (
                  <>
                    {relativeResumesData?.result.map((r) => (
                      <RecruitmentDetailRelativeTableRow key={r.Id} resume={r} />
                    ))}
                  </>
                ) : (
                  <RecruitmentDetailRelativeTableEmptyRow />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tab === RelativeResumeTab.Relative && (
          <TableContainer
            component={Paper}
            sx={{
              width: '100%',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>使用者</TableCell>
                  <TableCell>應徵履歷</TableCell>
                  <TableCell>相關標籤</TableCell>
                  <TableCell align="right">應徵時間</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRelativeResumesData?.result && allRelativeResumesData.result.length > 0 ? (
                  <>
                    {allRelativeResumesData?.result.map((r) => (
                      <RecruitmentDetailRelativeTableRow key={r.Id} resume={r} />
                    ))}
                  </>
                ) : (
                  <RecruitmentDetailRelativeTableEmptyRow />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Container>
  );
}
export default CompanyRecruitmentDetail;
