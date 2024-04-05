import AreaEditor from '@/components/Area/AreaEditor';
import { RecruitmentItem } from '@/components/Recruitment';
import { useDeleteRecruitmentMutation } from '@/features/api/recruitment/deleteRecruitment';
import { useGetRecruitmentByIdQuery } from '@/features/api/recruitment/getRecruitmentById';
import { usePostRecruitmentMutation } from '@/features/api/recruitment/postRecruitment';
import { AreasType, setAreas } from '@/features/areas/areasSlice';
import { useAppDispatch } from '@/features/store';
import { IArea } from '@/types/interfaces/IArea';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { IconButton, Stack } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecruitmentEdit() {
  const { recruitmentId = '' } = useParams();
  const dispatch = useAppDispatch();
  const [postRecruitment] = usePostRecruitmentMutation();
  const [deleteRecruitment] = useDeleteRecruitmentMutation();
  const { data: recruitmentData } = useGetRecruitmentByIdQuery(recruitmentId, {
    skip: recruitmentId === '',
  });

  const handlePostAreas = async (areas: Array<IArea>) => {
    if (recruitmentData && recruitmentData.result)
      await postRecruitment({
        Id: recruitmentId,
        Name: recruitmentData.result.Name,
        Enable: recruitmentData.result.Enable,
      });
  };

  useEffect(() => {
    // set areas state after query subscription success
    if (recruitmentData?.result) {
      dispatch(
        setAreas({
          id: recruitmentData.result.Id,
          type: AreasType.RECRUITMENT,
          areas: recruitmentData.result.Areas,
        }),
      );
    }
  }, [recruitmentData, dispatch]);

  const handleClickDelete = () => {
    deleteRecruitment(recruitmentId);
  };

  const { run: handleChangeTitle } = useDebounceFn((title: string) => {
    if (recruitmentData && recruitmentData.result)
      postRecruitment({
        Id: recruitmentData.result.Id,
        Name: title,
        Enable: recruitmentData.result.Enable,
      });
  });
  return (
    <>
      {recruitmentData && recruitmentData.result && (
        <Stack spacing={1}>
          <RecruitmentItem
            id={recruitmentId}
            editable
            title={recruitmentData.result.Name}
            onChangeTitle={handleChangeTitle}
            control={
              <Stack spacing={1} direction={'row'}>
                <IconButton>
                  <AnalyticsOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleClickDelete}>
                  <DeleteOutlinedIcon />
                </IconButton>
              </Stack>
            }
          />
          <AreaEditor onPost={handlePostAreas} />
        </Stack>
      )}
    </>
  );
}

export default RecruitmentEdit;
