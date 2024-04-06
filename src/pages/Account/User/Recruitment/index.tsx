import { RecruitmentItem, RecruitmentNewButton } from '@/components/Recruitment';
import { useDeleteRecruitmentMutation } from '@/features/api/recruitment/deleteRecruitment';
import { useGetRecruitmentsByUserQuery } from '@/features/api/recruitment/getRecruitmentsByUser';
import { usePostRecruitmentMutation } from '@/features/api/recruitment/postRecruitment';
import { IRecruitmentPost } from '@/types/interfaces/IRecruitment';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Recruitment() {
  const { data: recruitmentData } = useGetRecruitmentsByUserQuery(null);
  const [postRecruitment] = usePostRecruitmentMutation();
  const [deleteRecruitment] = useDeleteRecruitmentMutation();
  const navigate = useNavigate();

  const handlePostProfileArea = (recruitment: IRecruitmentPost) => {
    postRecruitment(recruitment);
  };

  const handleClickDelete = (id: string) => {
    deleteRecruitment(id);
  };

  return (
    <Stack spacing={1}>
      <RecruitmentNewButton onPost={handlePostProfileArea} />

      {recruitmentData &&
        recruitmentData.result &&
        recruitmentData.result.map((r) => (
          <RecruitmentItem
            key={r.Id}
            recruitment={r}
            control={
              <Stack spacing={1} direction={'row'}>
                <IconButton onClick={() => navigate(`Edit/${r.Id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <AnalyticsOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => handleClickDelete(r.Id)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Stack>
            }
          />
        ))}
    </Stack>
  );
}
