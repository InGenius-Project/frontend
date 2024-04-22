import { RecruitmentItem } from '@/components/Recruitment';
import { SkeletonRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import ResumeItem, { SkeletonResumeItem } from '@/components/Resume/ResumeItem';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { useSendRecruitmentApplyMutation } from '@/features/api/recruitment/sendRecruitmentApply';
import { useGetResumesQuery } from '@/features/api/resume/getResumes';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Box, Button, Checkbox, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function InternApply() {
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId || '', {
    skip: !recruitmentId,
  });
  const [sendRecruitmentApply] = useSendRecruitmentApplyMutation();
  const { data: resumesData } = useGetResumesQuery(null);
  const [checkedResumeId, setCheckedResumeId] = useState<string>('');
  const [messageState, setMessageState] = useState<string>();

  const handleSubmit = async () => {
    if (recruitmentId && checkedResumeId) {
      sendRecruitmentApply({
        RecruitmentId: recruitmentId,
        ResumeId: checkedResumeId,
      })
        .unwrap()
        .then(async () => {
          const c = new HubConnectionBuilder()
            .withUrl('http://localhost:5230/Chat', {
              skipNegotiation: true,
              transport: HttpTransportType.WebSockets,
              accessTokenFactory: () => localStorage.getItem('accessToken') || '',
            })
            .configureLogging(LogLevel.Information)
            .build();

          c.on('ReceiveMessage', (msg) => {
            console.log(msg);
          });

          await c.start();
          await c.invoke('AddGroup', messageState || '', recruitmentId); //TODO: GroupName unique
        });
    }
  };

  return (
    <Stack spacing={1}>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography variant="subtitle1">Step 1: 確認職缺</Typography>
        {recruitmentData?.result ? (
          <RecruitmentItem recruitment={recruitmentData?.result} />
        ) : (
          <SkeletonRecruitmentItem />
        )}
      </Paper>

      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography variant="subtitle1">
          Step 2: 選擇履歷
          <Typography color={'red'} component={'span'} variant="subtitle1">
            *
          </Typography>
        </Typography>
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
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography variant="subtitle1">Step 3: 填寫訊息</Typography>
        <TextField
          multiline
          fullWidth
          label="訊息"
          value={messageState}
          onChange={(e) => setMessageState(e.target.value)}
          minRows={8}
          sx={{
            mt: 1,
          }}
        />
      </Paper>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography variant="subtitle1">Step 4: 送出</Typography>
        <Box>
          <Button onClick={handleSubmit}>送出</Button>
        </Box>
      </Paper>
    </Stack>
  );
}

export default InternApply;
