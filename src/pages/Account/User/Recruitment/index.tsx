import { RecruitmentItem, RecruitmentNewButton } from '@/components/Recruitment';
import { IconButton, Stack } from '@mui/material';

import { useGetRecruitmentsQuery } from '@/features/api/recruitment/getRecruitments';
import { usePostRecruitmentMutation } from '@/features/api/recruitment/postRecruitment';
import { IRecruitmentPost } from '@/types/interfaces/IRecruitment';
import EditIcon from '@mui/icons-material/Edit';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDeleteRecruitmentMutation } from '@/features/api/recruitment/deleteRecruitment';
import { useNavigate } from 'react-router-dom';
export default function Recruitment() {
  const { data: recruitmentData } = useGetRecruitmentsQuery(null);
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
            id={r.Id}
            key={r.Id}
            title={r.Name}
            onPost={handlePostProfileArea}
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
