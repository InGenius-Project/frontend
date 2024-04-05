import { useAppSelector } from '@/features/store';
import { IRecruitmentPost } from '@/types/interfaces/IRecruitment';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Box, ButtonBase, styled } from '@mui/material';
import React from 'react';
import { NIL } from 'uuid';

const RecruitmentNewButtonBase = styled(ButtonBase)(({ theme }) => ({
  backgroundColor: theme.palette.primary.lighter,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightBold,
  borderRadius: theme.shape.borderRadius,
}));

type RecruitmentNewButtonProps = {
  onPost?: (recruitment: IRecruitmentPost) => void;
};

const RecruitmentNewButton = ({ onPost }: RecruitmentNewButtonProps) => {
  const userState = useAppSelector((state) => state.userState);

  const handleButtonClick = () => {
    onPost &&
      onPost({
        Id: NIL,
        Name: `${userState.User?.Username}的職缺`,
        Enable: false,
      });
  };

  return (
    <RecruitmentNewButtonBase onClick={handleButtonClick}>
      <Box
        sx={{
          borderRadius: '50%',
          backgroundColor: 'white',
          padding: 1,
        }}
      >
        <CreateOutlinedIcon />
      </Box>
      新增職缺
    </RecruitmentNewButtonBase>
  );
};

export default RecruitmentNewButton;
