import { chatUrl } from '@/assets/utils/urls';
import { RecruitmentItem } from '@/components/Recruitment';
import { SkeletonRecruitmentItem } from '@/components/Recruitment/RecruitmentItem';
import ResumeItem, { SkeletonResumeItem } from '@/components/Resume/ResumeItem';
import { useInviteUserToGroupMutation } from '@/features/api/chat/inviteUserToGroup';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { useSendRecruitmentApplyMutation } from '@/features/api/recruitment/sendRecruitmentApply';
import { useGetResumesQuery } from '@/features/api/resume/getResumes';
import { useGetUserQuery } from '@/features/api/user/getUser';
import ChatReceiveMethod from '@/types/enums/ChatReceiveMethod';
import { IChatGroupInfo } from '@/types/interfaces/IChat';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function InternApply() {
  const { data: userData } = useGetUserQuery();
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId || '', {
    skip: !recruitmentId,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const [sendRecruitmentApply] = useSendRecruitmentApplyMutation();
  const { data: resumesData } = useGetResumesQuery(null);
  const [checkedResumeId, setCheckedResumeId] = useState<string>('');
  const [messageState, setMessageState] = useState<string>();
  const [inviteUserToGroup] = useInviteUserToGroupMutation();

  const handleNavigateSearchRecruitment = () =>
    navigate(`/Search/Recruitment/${recruitmentData?.result?.Id}`, {
      state: {
        from: location,
      },
    });

  const handleSubmit = async () => {
    if (recruitmentId && checkedResumeId) {
      sendRecruitmentApply({
        RecruitmentId: recruitmentId,
        ResumeId: checkedResumeId,
      })
        .unwrap()
        .then(async () => {
          const c = new HubConnectionBuilder()
            .withUrl(chatUrl, {
              skipNegotiation: true,
              transport: HttpTransportType.WebSockets,
              accessTokenFactory: () => localStorage.getItem('accessToken') || '',
            })
            .configureLogging(LogLevel.Information)
            .build();

          c.on(ChatReceiveMethod.NewGroup, (msg: IChatGroupInfo) => {
            recruitmentData?.result?.PublisherId &&
              inviteUserToGroup({
                groupId: msg.Id,
                userId: recruitmentData?.result?.PublisherId,
              })
                .unwrap()
                .then(() => {
                  c.invoke('SendMessageToGroup', messageState, msg.Id);
                });
          });

          await c.start();
          await c.invoke('AddGroup', userData?.result?.Username + '-' + recruitmentData?.result?.Name, true); //TODO: GroupName unique

          navigate('/Account/User/Intern/Recruitment');
          toast.success('應徵成功');
        });
    }
  };

  return (recruitmentData?.result?.Resumes || []).length === 0 ? (
    <Navigate to="/Account/User/Intern/Recruitment" replace={true} state={{ from: location }} />
  ) : (
    <Stack spacing={1}>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography variant="subtitle1">Step 1: 確認職缺</Typography>
        {recruitmentData?.result ? (
          <RecruitmentItem
            recruitment={recruitmentData?.result}
            control={
              isMobile ? (
                <MenuItem onClick={handleNavigateSearchRecruitment}>前往職缺頁面</MenuItem>
              ) : (
                <IconButton onClick={handleNavigateSearchRecruitment}>
                  <OpenInNewIcon />
                </IconButton>
              )
            }
          />
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
