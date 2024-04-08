import { RecruitmentItem } from '@/components/Recruitment';
import { SkeletonRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import ResumeItem, { SkeletonResumeItem } from '@/components/Resume/ResumeItem';
import RichTextEditor from '@/components/RichTextEditor';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { useGetResumesQuery } from '@/features/api/resume/getResumes';
import { Box, Button, Checkbox, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function InternApply() {
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId || '', {
    skip: !recruitmentId,
  });
  const { data: resumesData } = useGetResumesQuery(null);
  const [checkedResumeId, setCheckedResumeId] = useState<string>('');

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <Stack spacing={1}>
      <Typography variant="body1">Step 1: 確認職缺</Typography>
      {recruitmentData?.result ? (
        <RecruitmentItem recruitment={recruitmentData?.result} />
      ) : (
        <SkeletonRecruitmentItem />
      )}

      <Typography variant="body1">Step 2: 選擇履歷</Typography>
      <Paper sx={{ p: 1 }}>
        <Stack
          spacing={1}
          sx={{
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {resumesData && resumesData.result && resumesData.result.length > 0 ? (
            resumesData.result.map((resume) => (
              <ResumeItem
                resume={resume}
                key={resume.Id}
                control={<Checkbox checked={checkedResumeId === resume.Id} />}
                onClick={() => setCheckedResumeId(resume.Id)}
              ></ResumeItem>
            ))
          ) : (
            <SkeletonResumeItem />
          )}
        </Stack>
      </Paper>
      <Typography variant="body1">Step 3: 填寫訊息</Typography>
      <Paper>
        <RichTextEditor />
      </Paper>
      <Typography variant="body1">Step 4: 送出</Typography>
      <Box>
        <Button onClick={handleSubmit}>送出</Button>
      </Box>
    </Stack>
  );
}

export default InternApply;
