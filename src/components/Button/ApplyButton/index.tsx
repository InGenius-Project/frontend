import { Button, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type ApplyButtonProps = {
  recruitmentId: string;
};

function ApplyButton({ recruitmentId }: ApplyButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const handleClickApply = () => {
    navigate(`/Account/User/Intern/Recruitment/Apply/${recruitmentId}`, {
      state: {
        from: location,
      },
    });
  };
  return isMobile ? (
    <MenuItem onClick={handleClickApply}>應徵</MenuItem>
  ) : (
    <Button onClick={handleClickApply}>應徵</Button>
  );
}

export default ApplyButton;
