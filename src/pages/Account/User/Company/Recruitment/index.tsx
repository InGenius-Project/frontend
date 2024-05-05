import { RecruitmentItem } from '@/components/Recruitment';
import RecruitmentEmpty from '@/components/Recruitment/RecruitmentEmpty';
import { useDeleteRecruitmentMutation } from '@/features/api/recruitment/deleteRecruitment';
import { useGetRecruitmentsQuery } from '@/features/api/recruitment/getRecruitmentsByUser';
import { usePostRecruitmentMutation } from '@/features/api/recruitment/postRecruitment';
import { useAppSelector } from '@/features/store';
import { IRecruitmentPost } from '@/types/interfaces/IRecruitment';
import Add from '@mui/icons-material/Add';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Badge, Button, IconButton, MenuItem, Stack, Switch, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NIL } from 'uuid';

export default function CompanyRecruitment() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const { data: recruitmentData } = useGetRecruitmentsQuery(null);
  const [postRecruitment] = usePostRecruitmentMutation();
  const [deleteRecruitment] = useDeleteRecruitmentMutation();
  const navigate = useNavigate();
  const userState = useAppSelector((state) => state.userState);

  const handlePostRecruitmentArea = (recruitment: IRecruitmentPost) => {
    postRecruitment(recruitment);
  };

  const handlePostEmptyRecruitment = () => {
    postRecruitment({
      Id: NIL,
      Name: `${userState.User?.Username}的職缺`,
      Enable: false,
    })
      .unwrap()
      .then((r) => {
        if (r.result) navigate(`Edit/${r?.result?.Id}`);
      });
  };

  const handleClickDelete = (id: string) => {
    deleteRecruitment(id);
  };

  return (
    <Stack spacing={1}>
      <Stack direction={'row'} spacing={1}>
        <Button onClick={() => navigate('Generate')} startIcon={<Add />} endIcon={<AutoAwesome />}>
          新增職缺
        </Button>
        <Button onClick={handlePostEmptyRecruitment} startIcon={<Add />} variant="outlined">
          新增空白職缺
        </Button>
      </Stack>

      {recruitmentData &&
        recruitmentData.result &&
        recruitmentData.result.map((r) => (
          <RecruitmentItem
            key={r.Id}
            recruitment={r}
            control={
              isMobile ? (
                <Stack>
                  <MenuItem
                    onClick={() => {
                      handlePostRecruitmentArea({
                        ...r,
                        Enable: !r.Enable,
                      });
                    }}
                  >
                    {r.Enable ? '停用' : '啟用'}
                  </MenuItem>
                  <MenuItem onClick={() => navigate(`Edit/${r.Id}`)}>編輯</MenuItem>
                  <MenuItem onClick={() => navigate(`Apply/${r.Id}`)}>應徵</MenuItem>
                  <MenuItem onClick={() => handleClickDelete(r.Id)}>刪除</MenuItem>
                </Stack>
              ) : (
                <Stack spacing={1} direction={'row'}>
                  <Switch
                    checked={r.Enable}
                    onChange={(e) =>
                      handlePostRecruitmentArea({
                        ...r,
                        Enable: e.target.checked,
                      })
                    }
                  />
                  <IconButton onClick={() => navigate(`Edit/${r.Id}`)}>
                    <EditIcon />
                  </IconButton>
                  <Badge badgeContent={(r.Resumes || [])?.length} color="primary">
                    <IconButton>
                      <AnalyticsOutlinedIcon onClick={() => navigate(`Apply/${r.Id}`)} />
                    </IconButton>
                  </Badge>
                  <IconButton onClick={() => handleClickDelete(r.Id)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Stack>
              )
            }
          />
        ))}

      {(!recruitmentData || !recruitmentData.result || recruitmentData.result.length === 0) && <RecruitmentEmpty />}
    </Stack>
  );
}
